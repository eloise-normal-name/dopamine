/**
 * Audio Manager Basic Tests
 * 
 * Tests the audio manager's core functionality without actual audio files.
 * Run with: node --input-type=module shared/utils/audio.test.js
 */

import assert from 'assert';
import { AudioManager, SoundPriority, createAudioManager } from './audio.js';

// Mock AudioContext for Node.js environment
global.AudioContext = undefined;
global.webkitAudioContext = undefined;

console.log('[AudioTest] Starting audio manager tests...\n');

// Test 1: AudioManager initialization
console.log('Test 1: AudioManager initialization');
const manager = new AudioManager({
  mixingStrategy: 'queue-fade',
  fadeDuration: 100,
});
assert.strictEqual(manager.mixingStrategy, 'queue-fade', 'Mixing strategy should be queue-fade');
assert.strictEqual(manager.fadeDuration, 100, 'Fade duration should be 100ms');
assert.strictEqual(manager.enabled, true, 'Audio should be enabled by default');
console.log('✓ AudioManager initializes correctly\n');

// Test 2: Loading sounds
console.log('Test 2: Loading sounds');
manager.loadSound('test-sound', '/fake/path.mp3', SoundPriority.REEL_STOP);
assert.ok(manager.sounds.has('test-sound'), 'Sound should be registered');
const soundData = manager.sounds.get('test-sound');
assert.strictEqual(soundData.priority, SoundPriority.REEL_STOP, 'Priority should match');
assert.strictEqual(soundData.url, '/fake/path.mp3', 'URL should match');
assert.strictEqual(soundData.loaded, false, 'Sound should not be loaded yet (lazy loading)');
console.log('✓ Sounds load correctly\n');

// Test 3: Priority constants
console.log('Test 3: Priority ordering');
assert.ok(SoundPriority.JACKPOT > SoundPriority.BIG_WIN, 'Jackpot priority > Big win');
assert.ok(SoundPriority.BIG_WIN > SoundPriority.MEDIUM_WIN, 'Big win > Medium win');
assert.ok(SoundPriority.MEDIUM_WIN > SoundPriority.SMALL_WIN, 'Medium win > Small win');
assert.ok(SoundPriority.SMALL_WIN > SoundPriority.REEL_STOP, 'Small win > Reel stop');
assert.ok(SoundPriority.REEL_STOP > SoundPriority.SPIN_START, 'Reel stop > Spin start');
console.log('✓ Priority levels are correctly ordered\n');

// Test 4: Enable/disable functionality
console.log('Test 4: Enable/disable');
manager.setEnabled(false);
assert.strictEqual(manager.enabled, false, 'Audio should be disabled');
manager.setEnabled(true);
assert.strictEqual(manager.enabled, true, 'Audio should be enabled');
console.log('✓ Enable/disable works correctly\n');

// Test 5: Multiple sounds
console.log('Test 5: Multiple sounds');
manager.loadSound('sound1', '/path1.mp3', SoundPriority.SPIN_START);
manager.loadSound('sound2', '/path2.mp3', SoundPriority.JACKPOT);
assert.strictEqual(manager.sounds.size, 3, 'Should have 3 sounds registered'); // including test-sound
console.log('✓ Multiple sounds can be registered\n');

// Test 6: Factory function
console.log('Test 6: Factory function');
const config = {
  audioMixingStrategy: 'interrupt',
  audioFadeDuration: 200,
};
const factoryManager = createAudioManager(config);
assert.strictEqual(factoryManager.mixingStrategy, 'interrupt', 'Factory should set mixing strategy');
assert.strictEqual(factoryManager.fadeDuration, 200, 'Factory should set fade duration');
console.log('✓ Factory function creates manager correctly\n');

// Test 7: Different mixing strategies
console.log('Test 7: Mixing strategies');
const strategies = ['interrupt', 'queue-fade', 'duck'];
strategies.forEach(strategy => {
  const testManager = new AudioManager({ mixingStrategy: strategy });
  assert.strictEqual(testManager.mixingStrategy, strategy, `Strategy ${strategy} should be set`);
});
console.log('✓ All mixing strategies can be configured\n');

console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
console.log('✅ All audio manager tests passed!');
console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
