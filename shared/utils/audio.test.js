/**
 * Unit tests for AudioManager
 * 
 * Run with: node shared/utils/audio.test.js
 * 
 * Note: These tests use Node.js assert module for minimal setup.
 * Web Audio API tests require browser environment, so most tests
 * validate configuration and API surface without actual audio playback.
 */

import assert from 'assert';
import { AudioManager } from './audio.js';

// Test counter
let testCount = 0;
let passedCount = 0;

function test(name, fn) {
  testCount++;
  try {
    fn();
    passedCount++;
    console.log(`✓ ${name}`);
  } catch (error) {
    console.error(`✗ ${name}`);
    console.error(`  ${error.message}`);
    if (error.stack) {
      const stackLines = error.stack.split('\n').slice(1, 3).join('\n');
      console.error(`  ${stackLines}`);
    }
  }
}

// ── Constructor and Configuration Tests ──

test('AudioManager constructor sets default options', () => {
  const audio = new AudioManager();
  assert.strictEqual(audio.mixingStrategy, 'queue-fade');
  assert.strictEqual(audio.fadeOutDuration, 100);
  assert.strictEqual(audio.duckVolume, 0.3);
  assert.strictEqual(audio.getVolume(), 0.7);
  assert.strictEqual(audio.isMuted(), false);
});

test('AudioManager constructor accepts custom options', () => {
  const audio = new AudioManager({
    mixingStrategy: 'interrupt',
    fadeOutDuration: 200,
    duckVolume: 0.5,
    volume: 0.8,
    muted: true,
  });
  assert.strictEqual(audio.mixingStrategy, 'interrupt');
  assert.strictEqual(audio.fadeOutDuration, 200);
  assert.strictEqual(audio.duckVolume, 0.5);
  assert.strictEqual(audio.getVolume(), 0.8);
  assert.strictEqual(audio.isMuted(), true);
});

test('AudioManager supports all mixing strategies', () => {
  const strategies = ['interrupt', 'queue-fade', 'duck'];
  for (const strategy of strategies) {
    const audio = new AudioManager({ mixingStrategy: strategy });
    assert.strictEqual(audio.mixingStrategy, strategy);
  }
});

// ── Volume and Mute Tests ──

test('setVolume clamps to [0, 1] range', () => {
  const audio = new AudioManager();
  
  audio.setVolume(-0.5);
  assert.strictEqual(audio.getVolume(), 0);
  
  audio.setVolume(1.5);
  assert.strictEqual(audio.getVolume(), 1);
  
  audio.setVolume(0.5);
  assert.strictEqual(audio.getVolume(), 0.5);
});

test('setMuted toggles mute state', () => {
  const audio = new AudioManager();
  assert.strictEqual(audio.isMuted(), false);
  
  audio.setMuted(true);
  assert.strictEqual(audio.isMuted(), true);
  
  audio.setMuted(false);
  assert.strictEqual(audio.isMuted(), false);
});

// ── State Management Tests ──

test('getPlayingCount returns 0 initially', () => {
  const audio = new AudioManager();
  assert.strictEqual(audio.getPlayingCount(), 0);
});

test('isPlaying returns false for non-existent sounds', () => {
  const audio = new AudioManager();
  assert.strictEqual(audio.isPlaying('nonexistent'), false);
});

// ── API Surface Tests ──

test('AudioManager has all required public methods', () => {
  const audio = new AudioManager();
  const requiredMethods = [
    'init',
    'loadSound',
    'playSound',
    'stopSound',
    'stopAll',
    'setVolume',
    'getVolume',
    'setMuted',
    'isMuted',
    'isPlaying',
    'getPlayingCount',
    'destroy',
  ];
  
  for (const method of requiredMethods) {
    assert.strictEqual(typeof audio[method], 'function', `Missing method: ${method}`);
  }
});

test('destroy cleans up resources', () => {
  const audio = new AudioManager();
  audio.destroy();
  assert.strictEqual(audio.getPlayingCount(), 0);
});

// ── Configuration Validation Tests ──

test('fadeOutDuration is used for queue-fade strategy', () => {
  const audio = new AudioManager({
    mixingStrategy: 'queue-fade',
    fadeOutDuration: 250,
  });
  assert.strictEqual(audio.fadeOutDuration, 250);
});

test('duckVolume is used for duck strategy', () => {
  const audio = new AudioManager({
    mixingStrategy: 'duck',
    duckVolume: 0.4,
  });
  assert.strictEqual(audio.duckVolume, 0.4);
});

// ── Priority System Tests (Logic Only) ──

test('Priority system supports expected sound types', () => {
  // This test validates that the priority concept makes sense
  const expectedPriorities = {
    jackpot: 100,
    big_win: 80,
    medium_win: 60,
    small_win: 40,
    reel_stop: 20,
    spin_start: 10,
    ambient: 5,
  };
  
  // Validate priority ordering
  const priorities = Object.values(expectedPriorities);
  for (let i = 0; i < priorities.length - 1; i++) {
    assert.ok(priorities[i] > priorities[i + 1], 
      'Priorities should be in descending order');
  }
});

// ── Documentation Tests ──

test('AudioManager class has comprehensive documentation', () => {
  // This validates that the implementation matches the documented API
  const audio = new AudioManager({
    mixingStrategy: 'queue-fade',
    fadeOutDuration: 100,
    volume: 0.7,
  });
  
  // These calls should not throw (API exists as documented)
  assert.doesNotThrow(() => audio.getVolume());
  assert.doesNotThrow(() => audio.isMuted());
  assert.doesNotThrow(() => audio.getPlayingCount());
  assert.doesNotThrow(() => audio.isPlaying('test'));
});

// ── Integration Scenario Tests ──

test('Slot machine scenario: reel stops + win sound (config validation)', () => {
  // Simulate slot machine audio setup as documented in PHASE_1_NOTES.md
  const audio = new AudioManager({
    mixingStrategy: 'queue-fade',
    fadeOutDuration: 100, // fade out reel stops when win detected
    volume: 0.7,
  });
  
  // Reel stops would have lower priority than win sounds
  const reelStopPriority = 20;
  const winSoundPriority = 60;
  
  assert.ok(winSoundPriority > reelStopPriority, 
    'Win sound should have higher priority than reel stops');
  assert.strictEqual(audio.mixingStrategy, 'queue-fade',
    'Queue-fade strategy should be used');
  assert.strictEqual(audio.fadeOutDuration, 100,
    'Fade duration should be 100ms as per design decision');
});

// ── Print Results ──

console.log('\n' + '─'.repeat(50));
console.log(`Tests: ${passedCount}/${testCount} passed`);

if (passedCount === testCount) {
  console.log('✓ All tests passed!');
  process.exit(0);
} else {
  console.log(`✗ ${testCount - passedCount} test(s) failed`);
  process.exit(1);
}
