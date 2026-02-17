# Audio Mixing Strategy — Manual Testing Guide

## Overview

This document provides manual test scenarios for validating the audio mixing strategy implementation during Phase 3 development and integration.

## Testing Prerequisites

- Audio assets must be loaded (sound files in `/assets/sounds/`)
- AudioManager must be initialized and integrated into the game
- Browser with Web Audio API support (Chrome 90+, Firefox 88+, Safari 14+)
- Audio enabled in browser and OS (not muted)

## Test Environment Setup

1. Open browser developer console
2. Enable audio output and set volume to ~50%
3. Load the slot machine game
4. Verify no console errors related to audio

## Test Scenarios

### Scenario 1: Basic Sound Playback

**Objective**: Verify individual sounds play correctly without overlap

**Steps**:
1. Start a spin
2. Let all reels stop completely
3. Wait for cooldown to complete

**Expected Result**:
- Spin start sound plays once
- Three reel stop sounds play in sequence (300ms apart)
- No errors in console
- Sounds are audible and clear

**Pass/Fail**: ☐

---

### Scenario 2: Queue-Fade with Small Win

**Objective**: Test fade-out behavior when win sound interrupts reel stops

**Steps**:
1. Start a spin that will result in a win
2. Observe audio during the final reel stop and win detection

**Expected Result**:
- First two reel stops play normally
- Third reel stop begins playing
- When win is detected, third reel stop fades out over 100ms
- Win sound starts immediately (no gap)
- Transition feels smooth, not jarring

**Pass/Fail**: ☐

**Notes**: _______________________________________

---

### Scenario 3: Queue-Fade with Jackpot (Highest Priority)

**Objective**: Test that jackpot sound (priority 100) interrupts all lower-priority sounds

**Steps**:
1. Trigger a jackpot spin (💎💎💎)
2. Listen for audio during final reel stops

**Expected Result**:
- Reel stop sounds fade out quickly (100ms)
- Jackpot sound plays immediately at full volume
- No audio clipping or distortion
- Jackpot sound is prominent and celebratory

**Pass/Fail**: ☐

**Notes**: _______________________________________

---

### Scenario 4: Multiple Rapid Spins

**Objective**: Test audio stability with rapid succession of spins

**Steps**:
1. Start auto-play mode
2. Let 5-10 spins complete in quick succession
3. Monitor for audio issues

**Expected Result**:
- No audio glitches or popping
- Mixing strategy applies consistently
- Memory usage remains stable (check DevTools Performance)
- No accumulation of playing sounds (check `getPlayingCount()`)

**Pass/Fail**: ☐

**Notes**: _______________________________________

---

### Scenario 5: Interrupt Strategy (Alternative Mode)

**Objective**: Test interrupt strategy as alternative mixing mode

**Steps**:
1. Modify config.js: set `audio.mixingStrategy = 'interrupt'`
2. Trigger a win during reel stops

**Expected Result**:
- Reel stop sounds immediately cut off (no fade)
- Win sound starts immediately
- Transition is instant but may feel abrupt

**Pass/Fail**: ☐

**Notes**: _______________________________________

---

### Scenario 6: Duck Strategy (Alternative Mode)

**Objective**: Test volume ducking strategy

**Steps**:
1. Modify config.js: set `audio.mixingStrategy = 'duck'`
2. Trigger a win during reel stops

**Expected Result**:
- Reel stop sounds continue playing but reduce to 30% volume
- Win sound plays at full volume
- Both sounds audible simultaneously
- No audio muddiness or clipping

**Pass/Fail**: ☐

**Notes**: _______________________________________

---

### Scenario 7: Volume Control

**Objective**: Test global volume adjustments

**Steps**:
1. Set volume to 0.0 (silent)
2. Trigger a spin — should be silent
3. Set volume to 0.5 (half)
4. Trigger a spin — should be quieter
5. Set volume to 1.0 (full)
6. Trigger a spin — should be loud

**Expected Result**:
- Volume changes take effect immediately
- No pops or clicks during volume adjustments
- Relative priorities maintained at all volume levels

**Pass/Fail**: ☐

---

### Scenario 8: Mute Toggle

**Objective**: Test mute/unmute functionality

**Steps**:
1. Mute audio via UI or console (`audioManager.setMuted(true)`)
2. Trigger several spins — should be silent
3. Unmute audio
4. Trigger a spin — should be audible again

**Expected Result**:
- Mute silences all audio instantly
- Unmute restores audio smoothly
- No sound queue backlog when unmuting

**Pass/Fail**: ☐

---

### Scenario 9: Browser Autoplay Policy Compliance

**Objective**: Verify audio respects browser autoplay restrictions

**Steps**:
1. Open game in fresh browser tab (no prior interaction)
2. Attempt to play audio before user interaction
3. Click anywhere on page
4. Attempt to play audio after interaction

**Expected Result**:
- Audio blocked or queued before interaction (per browser policy)
- Audio plays successfully after user interaction
- No uncaught exceptions in console
- Graceful fallback if audio unavailable

**Pass/Fail**: ☐

**Notes**: _______________________________________

---

### Scenario 10: Long Play Session (Memory Leak Check)

**Objective**: Ensure audio manager doesn't leak memory over extended play

**Steps**:
1. Open DevTools → Performance → Memory
2. Take heap snapshot
3. Run auto-play for 50+ spins (5-10 minutes)
4. Take second heap snapshot
5. Compare memory usage

**Expected Result**:
- Memory usage grows initially (loading assets)
- Memory stabilizes after initial load
- No continuous growth over time
- Heap snapshots show consistent object counts

**Pass/Fail**: ☐

**Memory Usage**: Start: _____ MB, End: _____ MB

---

### Scenario 11: Cross-Browser Compatibility

**Objective**: Verify audio works across target browsers

**Browsers to Test**:
- ☐ Chrome 90+ (desktop)
- ☐ Firefox 88+ (desktop)
- ☐ Safari 14+ (desktop)
- ☐ Chrome Android 90+ (mobile)
- ☐ Safari iOS 14+ (mobile)

**Expected Result**:
- Audio plays correctly in all browsers
- Mixing strategy behaves consistently
- No browser-specific errors

**Browser-Specific Notes**:
- Chrome: _______________________________________
- Firefox: _______________________________________
- Safari: _______________________________________
- Mobile: _______________________________________

---

### Scenario 12: Ambient Background Music

**Objective**: Test low-priority ambient sound with game sounds

**Steps**:
1. Load and loop ambient background music
2. Trigger multiple spins with wins
3. Verify ambient music behavior

**Expected Result**:
- Ambient music loops smoothly
- Ambient music ducks or continues during game sounds (per strategy)
- No audio clipping when layering sounds
- Ambient priority (5) correctly lower than all game sounds

**Pass/Fail**: ☐

---

## Edge Cases

### Edge Case 1: Rapid Priority Changes

**Scenario**: Win sound queued while previous win sound still playing

**Steps**:
1. Trigger back-to-back wins (rare, but possible)
2. Observe audio behavior

**Expected**: Second win sound waits or interrupts based on priority

**Pass/Fail**: ☐

---

### Edge Case 2: Missing Audio Files

**Scenario**: Sound file fails to load (404)

**Steps**:
1. Temporarily break a sound file path in config
2. Attempt to play the missing sound

**Expected**: Console warning logged, game continues without crash

**Pass/Fail**: ☐

---

### Edge Case 3: Audio Context Suspension

**Scenario**: Browser suspends audio context to save resources

**Steps**:
1. Play audio in background tab
2. Switch tabs for 30+ seconds
3. Return to game tab

**Expected**: Audio resumes correctly, no stuck sounds

**Pass/Fail**: ☐

---

## Performance Benchmarks

| Metric | Target | Actual | Pass/Fail |
|--------|--------|--------|-----------|
| Audio load time | < 1s per file | ___ ms | ☐ |
| Mixing latency | < 10ms | ___ ms | ☐ |
| CPU usage (playing) | < 5% | ___ % | ☐ |
| Memory usage (50 spins) | < 50MB growth | ___ MB | ☐ |

---

## Accessibility Considerations

- ☐ Visual feedback accompanies all audio cues (don't rely on audio alone)
- ☐ Game playable with audio disabled
- ☐ Volume controls accessible via keyboard
- ☐ Audio doesn't auto-play on page load (respects user preference)

---

## Sign-Off

**Tester**: ___________________  
**Date**: ___________________  
**Overall Result**: Pass ☐  Fail ☐  Needs Work ☐

**Summary**: _______________________________________
_______________________________________
_______________________________________

**Blockers**: _______________________________________
_______________________________________

**Recommendations**: _______________________________________
_______________________________________

---

## Appendix: Console Commands for Testing

```javascript
// Access audio manager (once integrated)
const audio = window.audioManager;

// Check current state
audio.getPlayingCount();
audio.isPlaying('reel_stop');
audio.getVolume();
audio.isMuted();

// Test controls
audio.setVolume(0.5);
audio.setMuted(true);
audio.stopAll();

// Test mixing strategies
config.audio.mixingStrategy = 'interrupt';
config.audio.mixingStrategy = 'queue-fade';
config.audio.mixingStrategy = 'duck';

// Manual sound playback
audio.playSound('reel_stop');
audio.playSound('big_win', { volume: 1.0 });
```

---

## Related Documentation

- **[audio.js](../../shared/utils/audio.js)** — AudioManager implementation
- **[config.js](../../games/slot-machine/config.js)** — Audio configuration
- **[PHASE_1_NOTES.md](PHASE_1_NOTES.md)** — Audio mixing strategy decision (Section 2)
- **[docs/design/audio/README.md](design/audio/README.md)** — Audio design philosophy
