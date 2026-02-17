/**
 * Audio Manager Usage Example
 * 
 * This example demonstrates how to integrate the AudioManager
 * into the slot machine game.
 */

import { createAudioManager, SoundPriority } from '../../shared/utils/audio.js';
import { config } from './config.js';

// Example: Initialize audio manager in game.js
export function setupAudio() {
  // Create audio manager with config
  const audioManager = createAudioManager(config);

  // Load all sound files (lazy-loaded on first play)
  audioManager.loadSound('spin-start', '/assets/audio/spin-start.mp3', SoundPriority.SPIN_START);
  audioManager.loadSound('reel-stop', '/assets/audio/reel-stop.mp3', SoundPriority.REEL_STOP);
  audioManager.loadSound('small-win', '/assets/audio/small-win.mp3', SoundPriority.SMALL_WIN);
  audioManager.loadSound('medium-win', '/assets/audio/medium-win.mp3', SoundPriority.MEDIUM_WIN);
  audioManager.loadSound('big-win', '/assets/audio/big-win.mp3', SoundPriority.BIG_WIN);
  audioManager.loadSound('jackpot', '/assets/audio/jackpot.mp3', SoundPriority.JACKPOT);

  return audioManager;
}

// Example: Usage in game state transitions
export function exampleUsage() {
  const audioManager = setupAudio();

  // When spin starts
  audioManager.play('spin-start');

  // When each reel stops (called 3 times with stagger)
  setTimeout(() => audioManager.play('reel-stop'), 2000);
  setTimeout(() => audioManager.play('reel-stop'), 2300);
  setTimeout(() => audioManager.play('reel-stop'), 2600);

  // When win detected - higher priority will fade out reel stops
  setTimeout(() => {
    const winAmount = 50; // example
    if (winAmount >= 100) {
      audioManager.play('jackpot');
    } else if (winAmount >= 50) {
      audioManager.play('big-win');
    } else if (winAmount >= 10) {
      audioManager.play('medium-win');
    } else {
      audioManager.play('small-win');
    }
  }, 2700);

  // Mute/unmute
  audioManager.setEnabled(false); // Mute
  audioManager.setEnabled(true);  // Unmute
}

/**
 * Integration points in game.js:
 * 
 * 1. In SlotMachine constructor:
 *    this.audioManager = setupAudio();
 * 
 * 2. In _startSpin():
 *    this.audioManager.play('spin-start');
 * 
 * 3. In _handleReelStopped():
 *    this.audioManager.play('reel-stop');
 * 
 * 4. In _celebrate() or checkWin():
 *    const soundId = this._getWinSound(totalWin);
 *    this.audioManager.play(soundId);
 * 
 * 5. Add mute button:
 *    <button onclick="game.audioManager.setEnabled(!game.audioManager.enabled)">🔊/🔇</button>
 */
