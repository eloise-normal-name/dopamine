/**
 * Audio Manager
 * 
 * Manages audio playback with configurable mixing strategies.
 * 
 * **Mixing Strategy Decision (PHASE_1_NOTES.md section 2)**
 * 
 * After evaluating three options (interrupt, queue-fade, duck), we chose
 * **queue-with-fade** for the following reasons:
 * 
 * - Balances immediacy with smoothness
 * - Reel stops play normally but fade out (100ms) when win sound queued
 * - Win sound starts immediately after fade begins
 * - Nothing feels abruptly "cut off"
 * - Slight delay is acceptable for better audio experience
 * 
 * **Implementation Notes**:
 * - Uses Web Audio API for precise volume control and timing
 * - Falls back to HTMLAudioElement if Web Audio unavailable
 * - Supports priority-based queueing (higher priority interrupts lower)
 * - Lazy-loads audio files on first play
 * 
 * **Priority Order**: jackpot > big win > medium win > small win > reel stop > spin start
 */

/**
 * Sound priority levels (higher = more important)
 */
export const SoundPriority = {
  SPIN_START: 1,
  REEL_STOP: 2,
  SMALL_WIN: 3,
  MEDIUM_WIN: 4,
  BIG_WIN: 5,
  JACKPOT: 6,
};

/**
 * Audio Manager class
 * 
 * @example
 * const audioManager = new AudioManager({
 *   mixingStrategy: 'queue-fade',
 *   fadeDuration: 100,
 * });
 * 
 * audioManager.loadSound('reel-stop', '/assets/audio/reel-stop.mp3', SoundPriority.REEL_STOP);
 * audioManager.play('reel-stop');
 */
export class AudioManager {
  constructor(options = {}) {
    this.mixingStrategy = options.mixingStrategy || 'queue-fade';
    this.fadeDuration = options.fadeDuration || 100;
    this.sounds = new Map(); // id -> { audio, priority, url, loaded }
    this.currentlyPlaying = null;
    this.queue = [];
    this.enabled = true;
    
    // Initialize Web Audio API if available
    this.audioContext = null;
    this.gainNode = null;
    
    if (typeof AudioContext !== 'undefined' || typeof webkitAudioContext !== 'undefined') {
      try {
        this.audioContext = new (AudioContext || webkitAudioContext)();
        this.gainNode = this.audioContext.createGain();
        this.gainNode.connect(this.audioContext.destination);
      } catch (e) {
        console.warn('[AudioManager] Web Audio API initialization failed, falling back to HTMLAudioElement');
      }
    }
  }

  /**
   * Load a sound for later playback
   * 
   * @param {string} id - Unique identifier for the sound
   * @param {string} url - URL to audio file
   * @param {number} priority - Priority level (use SoundPriority constants)
   */
  loadSound(id, url, priority = SoundPriority.REEL_STOP) {
    this.sounds.set(id, {
      url,
      priority,
      audio: null,
      loaded: false,
    });
  }

  /**
   * Play a sound
   * 
   * @param {string} id - Sound identifier
   * @param {Object} options - Playback options
   * @param {number} options.volume - Volume (0-1, default 1)
   * @param {boolean} options.loop - Loop playback (default false)
   */
  async play(id, options = {}) {
    if (!this.enabled) return;

    const soundData = this.sounds.get(id);
    if (!soundData) {
      console.warn(`[AudioManager] Sound '${id}' not loaded`);
      return;
    }

    // Lazy-load audio on first play
    if (!soundData.loaded) {
      await this._loadAudio(id);
    }

    // Handle mixing strategy
    const wasQueued = await this._handleMixing(soundData);
    
    // If sound was queued (not played), return early
    if (wasQueued) return;

    // Play the sound
    this._playSound(soundData, options);
  }

  /**
   * Stop all currently playing sounds
   */
  stopAll() {
    if (this.currentlyPlaying) {
      this._stopSound(this.currentlyPlaying);
      this.currentlyPlaying = null;
    }
    this.queue = [];
  }

  /**
   * Enable/disable all audio
   */
  setEnabled(enabled) {
    this.enabled = enabled;
    if (!enabled) {
      this.stopAll();
    }
  }

  /**
   * Handle mixing strategy when new sound wants to play
   * @returns {boolean} True if sound was queued (don't play now), false if should play
   */
  async _handleMixing(newSound) {
    if (!this.currentlyPlaying) return false;

    const currentPriority = this.currentlyPlaying.priority;
    const newPriority = newSound.priority;

    switch (this.mixingStrategy) {
      case 'interrupt':
        // Higher priority interrupts lower priority
        if (newPriority > currentPriority) {
          this._stopSound(this.currentlyPlaying);
          this.currentlyPlaying = null;
        }
        return false; // Sound should play

      case 'queue-fade':
        // Higher priority fades out current sound
        if (newPriority > currentPriority) {
          await this._fadeOut(this.currentlyPlaying);
          this.currentlyPlaying = null;
          return false; // Sound should play now
        } else {
          // Lower priority gets queued - don't play now
          this.queue.push(newSound);
          return true; // Signal that sound was queued, not played
        }

      case 'duck':
        // Reduce volume of lower-priority sounds
        if (newPriority > currentPriority) {
          this._duckVolume(this.currentlyPlaying, 0.3);
        }
        return false; // Sound should play

      default:
        console.warn(`[AudioManager] Unknown mixing strategy: ${this.mixingStrategy}`);
        return false; // Default to playing the sound
    }
  }

  /**
   * Lazy-load audio file
   */
  async _loadAudio(id) {
    const soundData = this.sounds.get(id);
    if (!soundData || soundData.loaded) return;

    try {
      if (this.audioContext) {
        // Load with Web Audio API
        const response = await fetch(soundData.url);
        const arrayBuffer = await response.arrayBuffer();
        soundData.audioBuffer = await this.audioContext.decodeAudioData(arrayBuffer);
      } else {
        // Load with HTMLAudioElement
        soundData.audio = new Audio(soundData.url);
        await new Promise((resolve, reject) => {
          soundData.audio.addEventListener('canplaythrough', resolve, { once: true });
          soundData.audio.addEventListener('error', reject, { once: true });
        });
      }
      soundData.loaded = true;
      console.log(`[AudioManager] Loaded sound: ${id}`);
    } catch (error) {
      console.error(`[AudioManager] Failed to load sound '${id}':`, error);
    }
  }

  /**
   * Play a sound
   */
  _playSound(soundData, options = {}) {
    const { volume = 1, loop = false } = options;

    try {
      if (this.audioContext && soundData.audioBuffer) {
        // Play with Web Audio API
        const source = this.audioContext.createBufferSource();
        source.buffer = soundData.audioBuffer;
        source.loop = loop;

        const gain = this.audioContext.createGain();
        gain.gain.value = volume;

        source.connect(gain);
        gain.connect(this.audioContext.destination);

        source.start(0);
        soundData.source = source;
        soundData.gainNode = gain;

        source.onended = () => {
          this._onSoundEnded(soundData);
        };
      } else if (soundData.audio) {
        // Play with HTMLAudioElement
        soundData.audio.volume = volume;
        soundData.audio.loop = loop;
        soundData.audio.currentTime = 0;
        soundData.audio.play();

        soundData.audio.addEventListener('ended', () => {
          this._onSoundEnded(soundData);
        }, { once: true });
      }

      this.currentlyPlaying = soundData;
    } catch (error) {
      console.error('[AudioManager] Failed to play sound:', error);
    }
  }

  /**
   * Stop a sound
   */
  _stopSound(soundData) {
    if (!soundData) return;

    try {
      if (soundData.source) {
        soundData.source.stop();
        soundData.source.disconnect();
        soundData.source = null;
      } else if (soundData.audio) {
        soundData.audio.pause();
        soundData.audio.currentTime = 0;
      }
    } catch (error) {
      // Ignore errors from stopping already-stopped sounds
    }
  }

  /**
   * Get current volume of a sound
   * @private
   */
  _getCurrentVolume(soundData) {
    if (!soundData) return 1;
    
    if (soundData.gainNode) {
      return soundData.gainNode.gain.value;
    } else if (soundData.audio) {
      return soundData.audio.volume;
    }
    
    return 1;
  }

  /**
   * Set volume of a sound
   * @private
   */
  _setVolume(soundData, volume) {
    if (!soundData) return;
    
    if (soundData.gainNode) {
      soundData.gainNode.gain.value = volume;
    } else if (soundData.audio) {
      soundData.audio.volume = volume;
    }
  }

  /**
   * Fade out a sound
   */
  async _fadeOut(soundData) {
    if (!soundData) return;

    return new Promise((resolve) => {
      const startTime = performance.now();
      const startVolume = this._getCurrentVolume(soundData);

      const fade = () => {
        const elapsed = performance.now() - startTime;
        const progress = Math.min(elapsed / this.fadeDuration, 1);
        const volume = startVolume * (1 - progress);

        this._setVolume(soundData, volume);

        if (progress < 1) {
          requestAnimationFrame(fade);
        } else {
          this._stopSound(soundData);
          resolve();
        }
      };

      fade();
    });
  }

  /**
   * Duck (reduce) volume of a sound
   */
  _duckVolume(soundData, duckLevel = 0.3) {
    this._setVolume(soundData, duckLevel);
  }

  /**
   * Handle sound ended event
   */
  _onSoundEnded(soundData) {
    if (this.currentlyPlaying === soundData) {
      this.currentlyPlaying = null;
    }

    // Play next queued sound
    if (this.queue.length > 0) {
      const nextSound = this.queue.shift();
      this._playSound(nextSound);
    }
  }
}

/**
 * Create a singleton instance
 * 
 * @param {Object} config - Configuration options
 * @returns {AudioManager}
 */
export function createAudioManager(config) {
  return new AudioManager({
    mixingStrategy: config.audioMixingStrategy,
    fadeDuration: config.audioFadeDuration,
  });
}
