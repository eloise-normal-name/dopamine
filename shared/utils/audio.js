/**
 * Audio Manager — Web Audio API-based sound system with mixing strategies.
 * 
 * Handles sound playback with configurable mixing strategies for when multiple
 * sounds overlap. Critical for maintaining audio clarity during rapid game events
 * (e.g., reel stops + win sounds in slot machine).
 * 
 * ## Mixing Strategy Decision
 * 
 * When multiple sounds could play simultaneously (e.g., 3 reel stops at 300ms intervals
 * followed immediately by a win sound), we need to decide how to handle the overlap.
 * Three approaches were considered:
 * 
 * **A. Priority-based interrupt** — Higher-priority sounds stop lower-priority ones.
 *   ✅ Always hear the most important sound
 *   ❌ Can feel abrupt/jarring
 * 
 * **B. Queue with fade** (SELECTED) — Lower-priority sounds fade out when higher-priority queued.
 *   ✅ Smooth transitions
 *   ✅ Nothing feels "cut off"
 *   ✅ Win sound plays immediately (dopamine requires tight timing)
 *   ❌ Slight delay before win sound reaches full volume
 * 
 * **C. True mixing with volume ducking** — All sounds play, lower-priority reduce volume.
 *   ✅ Richest audio experience
 *   ❌ Most complex to implement
 *   ❌ Could sound muddy if not tuned carefully
 * 
 * **Choice: Option B (queue with fade)** — Provides immediate win feedback while avoiding
 * jarring cutoffs. Reel stops play normally, but if a win is detected, they fade out
 * over 100ms and the win sound starts immediately. Balances immediacy with smoothness.
 * 
 * ## Priority System
 * 
 * Default priorities (higher = more important):
 *   - jackpot: 100
 *   - big_win: 80
 *   - medium_win: 60
 *   - small_win: 40
 *   - reel_stop: 20
 *   - spin_start: 10
 *   - ambient: 5
 * 
 * @example
 * import { AudioManager } from '../../shared/utils/audio.js';
 * 
 * const audio = new AudioManager({
 *   mixingStrategy: 'queue-fade',
 *   fadeOutDuration: 100,
 *   volume: 0.7,
 * });
 * 
 * await audio.loadSound('reel_stop', '/assets/sounds/reel-stop.mp3', { priority: 20 });
 * await audio.loadSound('win', '/assets/sounds/win.mp3', { priority: 60 });
 * 
 * audio.playSound('reel_stop');
 * audio.playSound('win'); // reel_stop fades out over 100ms, win plays immediately
 */

/**
 * @typedef {Object} SoundConfig
 * @property {string} url - path to sound file
 * @property {number} [priority=10] - playback priority (higher interrupts lower)
 * @property {boolean} [loop=false] - whether sound should loop
 * @property {number} [volume=1.0] - sound-specific volume (0.0-1.0)
 */

/**
 * @typedef {Object} PlayingSoundNode
 * @property {string} id - sound identifier
 * @property {AudioBufferSourceNode} source - Web Audio source node
 * @property {GainNode} gainNode - volume control node
 * @property {number} priority - sound priority
 * @property {number} startTime - when playback started (performance.now())
 * @property {boolean} fadingOut - whether sound is currently fading out
 */

class AudioManager {
  /**
   * @param {Object} options
   * @param {'interrupt' | 'queue-fade' | 'duck'} [options.mixingStrategy='queue-fade'] — how to handle overlapping sounds
   * @param {number} [options.fadeOutDuration=100] — fade-out time in ms for queue-fade strategy
   * @param {number} [options.duckVolume=0.3] — reduced volume for duck strategy (0.0-1.0)
   * @param {number} [options.volume=0.7] — global volume (0.0-1.0)
   * @param {boolean} [options.muted=false] — whether audio is muted
   */
  constructor(options = {}) {
    this.mixingStrategy = options.mixingStrategy || 'queue-fade';
    this.fadeOutDuration = options.fadeOutDuration || 100;
    this.duckVolume = options.duckVolume || 0.3;
    this._volume = options.volume !== undefined ? options.volume : 0.7;
    this._muted = options.muted || false;

    /** @type {AudioContext | null} */
    this._context = null;

    /** @type {GainNode | null} */
    this._masterGain = null;

    /** @type {Map<string, { buffer: AudioBuffer, config: SoundConfig }>} */
    this._sounds = new Map();

    /** @type {PlayingSoundNode[]} */
    this._playing = [];
  }

  /**
   * Initialize Web Audio context. Required before loading/playing sounds.
   * Call this after user interaction to comply with browser autoplay policies.
   */
  async init() {
    if (this._context) return; // already initialized

    // Check for Web Audio API support
    const AudioContextClass = window.AudioContext || window.webkitAudioContext;
    if (!AudioContextClass) {
      throw new Error('Web Audio API is not supported in this browser');
    }

    this._context = new AudioContextClass();
    this._masterGain = this._context.createGain();
    this._masterGain.connect(this._context.destination);
    this._updateMasterGain();
  }

  /**
   * Load a sound file into memory.
   * @param {string} id - unique sound identifier
   * @param {string} url - path to audio file (MP3, OGG, WAV)
   * @param {Partial<SoundConfig>} [config={}] - sound configuration
   */
  async loadSound(id, url, config = {}) {
    if (!this._context) {
      throw new Error('AudioManager not initialized. Call init() first.');
    }

    try {
      const response = await fetch(url);
      
      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }
      
      const arrayBuffer = await response.arrayBuffer();
      const audioBuffer = await this._context.decodeAudioData(arrayBuffer);

      this._sounds.set(id, {
        buffer: audioBuffer,
        config: {
          url,
          priority: config.priority || 10,
          loop: config.loop || false,
          volume: config.volume !== undefined ? config.volume : 1.0,
        },
      });
    } catch (error) {
      console.error(`Failed to load sound "${id}" from ${url}:`, error);
      throw error;
    }
  }

  /**
   * Play a loaded sound.
   * @param {string} id - sound identifier
   * @param {Object} [options={}]
   * @param {number} [options.volume] - override sound's default volume
   * @param {number} [options.priority] - override sound's default priority
   * @param {boolean} [options.loop] - override sound's default loop setting
   */
  playSound(id, options = {}) {
    if (!this._context || !this._sounds.has(id)) {
      console.warn(`Cannot play sound "${id}": not loaded`);
      return;
    }

    const { buffer, config } = this._sounds.get(id);
    const priority = options.priority !== undefined ? options.priority : config.priority;
    const volume = options.volume !== undefined ? options.volume : config.volume;
    const loop = options.loop !== undefined ? options.loop : config.loop;

    // Apply mixing strategy
    this._applyMixingStrategy(priority);

    // Create audio graph: source → gainNode → masterGain → destination
    const source = this._context.createBufferSource();
    source.buffer = buffer;
    source.loop = loop;

    const gainNode = this._context.createGain();
    gainNode.gain.value = volume;

    source.connect(gainNode);
    gainNode.connect(this._masterGain);

    // Track playing sound
    const playingNode = {
      id,
      source,
      gainNode,
      priority,
      startTime: performance.now(),
      fadingOut: false,
    };
    this._playing.push(playingNode);

    // Remove from playing list when done
    source.onended = () => {
      this._playing = this._playing.filter((node) => node !== playingNode);
    };

    source.start(0);
  }

  /**
   * Stop a specific sound.
   * @param {string} id - sound identifier
   */
  stopSound(id) {
    const toStop = this._playing.filter((node) => node.id === id);
    for (const node of toStop) {
      node.source.stop();
      this._playing = this._playing.filter((n) => n !== node);
    }
  }

  /**
   * Stop all currently playing sounds.
   */
  stopAll() {
    for (const node of this._playing) {
      node.source.stop();
    }
    this._playing = [];
  }

  /**
   * Set global volume.
   * @param {number} volume - 0.0 (silent) to 1.0 (full)
   */
  setVolume(volume) {
    this._volume = Math.max(0, Math.min(1, volume));
    this._updateMasterGain();
  }

  /**
   * Get current global volume.
   * @returns {number}
   */
  getVolume() {
    return this._volume;
  }

  /**
   * Mute or unmute all audio.
   * @param {boolean} muted
   */
  setMuted(muted) {
    this._muted = muted;
    this._updateMasterGain();
  }

  /**
   * Check if audio is muted.
   * @returns {boolean}
   */
  isMuted() {
    return this._muted;
  }

  /**
   * Apply mixing strategy when a new sound is about to play.
   * @private
   * @param {number} newSoundPriority
   */
  _applyMixingStrategy(newSoundPriority) {
    if (this._playing.length === 0) return;

    switch (this.mixingStrategy) {
      case 'interrupt':
        this._applyInterrupt(newSoundPriority);
        break;
      case 'queue-fade':
        this._applyQueueFade(newSoundPriority);
        break;
      case 'duck':
        this._applyDuck(newSoundPriority);
        break;
      default:
        console.warn(`Unknown mixing strategy: ${this.mixingStrategy}`);
    }
  }

  /**
   * Interrupt strategy: stop all lower-priority sounds immediately.
   * @private
   * @param {number} newSoundPriority
   */
  _applyInterrupt(newSoundPriority) {
    const toStop = this._playing.filter((node) => node.priority < newSoundPriority);
    for (const node of toStop) {
      node.source.stop();
      this._playing = this._playing.filter((n) => n !== node);
    }
  }

  /**
   * Queue-fade strategy: fade out lower-priority sounds over fadeOutDuration ms.
   * @private
   * @param {number} newSoundPriority
   */
  _applyQueueFade(newSoundPriority) {
    const currentTime = this._context.currentTime;
    const fadeSeconds = this.fadeOutDuration / 1000;

    for (const node of this._playing) {
      if (node.priority < newSoundPriority && !node.fadingOut) {
        node.fadingOut = true;
        const currentVolume = node.gainNode.gain.value;

        // Schedule fade-out
        node.gainNode.gain.cancelScheduledValues(currentTime);
        node.gainNode.gain.setValueAtTime(currentVolume, currentTime);
        node.gainNode.gain.linearRampToValueAtTime(0, currentTime + fadeSeconds);

        // Stop after fade completes
        node.source.stop(currentTime + fadeSeconds);
      }
    }
  }

  /**
   * Duck strategy: reduce volume of lower-priority sounds without stopping them.
   * @private
   * @param {number} newSoundPriority
   */
  _applyDuck(newSoundPriority) {
    const currentTime = this._context.currentTime;
    const duckSeconds = 0.05; // quick duck transition

    for (const node of this._playing) {
      if (node.priority < newSoundPriority) {
        const currentVolume = node.gainNode.gain.value;
        const targetVolume = currentVolume * this.duckVolume;

        node.gainNode.gain.cancelScheduledValues(currentTime);
        node.gainNode.gain.setValueAtTime(currentVolume, currentTime);
        node.gainNode.gain.linearRampToValueAtTime(targetVolume, currentTime + duckSeconds);
      }
    }
  }

  /**
   * Update master gain based on volume and muted state.
   * @private
   */
  _updateMasterGain() {
    if (this._masterGain) {
      this._masterGain.gain.value = this._muted ? 0 : this._volume;
    }
  }

  /**
   * Check if a sound is currently playing.
   * @param {string} id - sound identifier
   * @returns {boolean}
   */
  isPlaying(id) {
    return this._playing.some((node) => node.id === id);
  }

  /**
   * Get count of currently playing sounds.
   * @returns {number}
   */
  getPlayingCount() {
    return this._playing.length;
  }

  /**
   * Clean up resources. Call before destroying the audio manager.
   */
  destroy() {
    this.stopAll();
    if (this._context) {
      this._context.close();
      this._context = null;
    }
    this._sounds.clear();
  }
}

export { AudioManager };
