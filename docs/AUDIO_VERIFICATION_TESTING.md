# Audio Manager User Verification Testing

**Purpose**: Manual verification guide for testing the AudioManager implementation before Phase 3 integration.

**Status**: Ready for User Testing  
**Last Updated**: 2026-02-17  
**Related Files**: `shared/utils/audio.js`, `shared/utils/audio.test.js`

---

## Prerequisites

- Node.js installed
- Browser with Web Audio API support (Chrome, Firefox, Safari, Edge)
- Test audio files (optional - can use browser beep sounds)

---

## Automated Tests (Quick Verification)

Run the automated test suite first to ensure core functionality works:

```bash
cd /home/runner/work/dopamine/dopamine
node shared/utils/audio.test.js
```

**Expected Output**:
```
[AudioTest] Starting audio manager tests...

Test 1: AudioManager initialization
✓ AudioManager initializes correctly

Test 2: Loading sounds
✓ Sounds load correctly

Test 3: Priority ordering
✓ Priority levels are correctly ordered

Test 4: Enable/disable
✓ Enable/disable works correctly

Test 5: Multiple sounds
✓ Multiple sounds can be registered

Test 6: Factory function
✓ Factory function creates manager correctly

Test 7: Mixing strategies
✓ All mixing strategies can be configured

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
✅ All audio manager tests passed!
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
```

If all tests pass ✅, proceed to manual browser testing.

---

## Manual Browser Testing

### Test Setup

Create a test HTML file to verify AudioManager in a real browser environment:

**File**: `tests/manual/audio-verification.html`

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Audio Manager Manual Test</title>
  <style>
    body { font-family: system-ui; padding: 20px; max-width: 800px; margin: 0 auto; }
    button { padding: 10px 20px; margin: 5px; font-size: 16px; cursor: pointer; }
    .test-section { margin: 20px 0; padding: 20px; border: 1px solid #ccc; border-radius: 5px; }
    .status { margin: 10px 0; padding: 10px; background: #f0f0f0; border-radius: 3px; }
    .pass { background: #d4edda; color: #155724; }
    .fail { background: #f8d7da; color: #721c24; }
    .info { background: #d1ecf1; color: #0c5460; }
  </style>
</head>
<body>
  <h1>🔊 Audio Manager Manual Verification</h1>
  
  <div class="status info">
    <strong>Instructions:</strong> Click each test button in sequence. Verify the expected behavior matches what you hear/see.
  </div>

  <!-- Test 1: Basic Playback -->
  <div class="test-section">
    <h2>Test 1: Basic Sound Playback</h2>
    <p><strong>Expected:</strong> Hear a short beep when clicking "Play Beep"</p>
    <button id="test1-play">Play Beep</button>
    <button id="test1-stop">Stop All</button>
    <div id="test1-status" class="status"></div>
  </div>

  <!-- Test 2: Queue-Fade Strategy -->
  <div class="test-section">
    <h2>Test 2: Queue-Fade Mixing Strategy</h2>
    <p><strong>Expected:</strong> When "Play High Priority" is clicked while low priority is playing, the low priority sound should fade out smoothly over 100ms, then high priority plays.</p>
    <button id="test2-low">Play Low Priority Sound</button>
    <button id="test2-high">Play High Priority Sound (interrupt with fade)</button>
    <div id="test2-status" class="status"></div>
  </div>

  <!-- Test 3: Priority Queueing -->
  <div class="test-section">
    <h2>Test 3: Priority-Based Queueing</h2>
    <p><strong>Expected:</strong> Playing low priority while high priority plays should queue the low priority sound. It plays after high priority finishes.</p>
    <button id="test3-high">Play High Priority (longer)</button>
    <button id="test3-low">Queue Low Priority</button>
    <div id="test3-status" class="status"></div>
  </div>

  <!-- Test 4: Enable/Disable -->
  <div class="test-section">
    <h2>Test 4: Enable/Disable Audio</h2>
    <p><strong>Expected:</strong> When disabled, no sounds play. When re-enabled, sounds play normally.</p>
    <button id="test4-disable">Disable Audio</button>
    <button id="test4-play">Try Play (should be silent)</button>
    <button id="test4-enable">Enable Audio</button>
    <button id="test4-play2">Play (should work)</button>
    <div id="test4-status" class="status"></div>
  </div>

  <!-- Test 5: Multiple Simultaneous (Duck Strategy) -->
  <div class="test-section">
    <h2>Test 5: Volume Ducking Strategy (Optional)</h2>
    <p><strong>Expected:</strong> With duck strategy, high priority sounds reduce volume of lower priority sounds (to 30%) rather than stopping them.</p>
    <button id="test5-change-strategy">Switch to Duck Strategy</button>
    <button id="test5-low">Play Low Priority</button>
    <button id="test5-high">Play High Priority (should duck low priority)</button>
    <div id="test5-status" class="status"></div>
  </div>

  <script type="module">
    import { AudioManager, SoundPriority } from '../../shared/utils/audio.js';

    // Initialize AudioManager
    const audioManager = new AudioManager({
      mixingStrategy: 'queue-fade',
      fadeDuration: 100
    });

    // Create synthetic beep sounds using Web Audio API
    function createBeepBuffer(audioContext, frequency, duration) {
      const sampleRate = audioContext.sampleRate;
      const numSamples = Math.floor(sampleRate * duration);
      const buffer = audioContext.createBuffer(1, numSamples, sampleRate);
      const data = buffer.getChannelData(0);
      
      for (let i = 0; i < numSamples; i++) {
        data[i] = Math.sin(2 * Math.PI * frequency * i / sampleRate) * 0.3;
      }
      
      return buffer;
    }

    // Helper to update status
    function updateStatus(elementId, message, type = 'info') {
      const el = document.getElementById(elementId);
      el.textContent = message;
      el.className = `status ${type}`;
    }

    // Test 1: Basic Playback
    document.getElementById('test1-play').onclick = () => {
      audioManager.play('beep').catch(e => {
        updateStatus('test1-status', `Error: ${e.message}`, 'fail');
      });
      updateStatus('test1-status', '🔊 Playing beep...', 'pass');
    };

    document.getElementById('test1-stop').onclick = () => {
      audioManager.stopAll();
      updateStatus('test1-status', '⏹️ All sounds stopped', 'pass');
    };

    // Load a simple beep sound
    if (audioManager.audioContext) {
      const beepBuffer = createBeepBuffer(audioManager.audioContext, 440, 0.3);
      audioManager.sounds.set('beep', {
        url: null,
        priority: SoundPriority.MEDIUM_WIN,
        audioBuffer: beepBuffer,
        loaded: true
      });
    }

    // Test 2: Queue-Fade
    const lowPriorityBeep = audioManager.audioContext ? 
      createBeepBuffer(audioManager.audioContext, 220, 1.0) : null;
    const highPriorityBeep = audioManager.audioContext ?
      createBeepBuffer(audioManager.audioContext, 880, 0.5) : null;

    if (lowPriorityBeep && highPriorityBeep) {
      audioManager.sounds.set('low-beep', {
        url: null,
        priority: SoundPriority.REEL_STOP,
        audioBuffer: lowPriorityBeep,
        loaded: true
      });
      audioManager.sounds.set('high-beep', {
        url: null,
        priority: SoundPriority.JACKPOT,
        audioBuffer: highPriorityBeep,
        loaded: true
      });
    }

    document.getElementById('test2-low').onclick = () => {
      audioManager.play('low-beep');
      updateStatus('test2-status', '🔊 Playing low priority sound (1 second)', 'info');
    };

    document.getElementById('test2-high').onclick = () => {
      audioManager.play('high-beep');
      updateStatus('test2-status', '⚡ High priority sound playing - low should fade out!', 'pass');
    };

    // Test 3: Queueing
    const longBeep = audioManager.audioContext ?
      createBeepBuffer(audioManager.audioContext, 660, 2.0) : null;
    
    if (longBeep) {
      audioManager.sounds.set('long-beep', {
        url: null,
        priority: SoundPriority.BIG_WIN,
        audioBuffer: longBeep,
        loaded: true
      });
    }

    document.getElementById('test3-high').onclick = () => {
      audioManager.play('long-beep');
      updateStatus('test3-status', '🔊 Playing high priority (2 seconds)', 'info');
    };

    document.getElementById('test3-low').onclick = () => {
      audioManager.play('low-beep');
      updateStatus('test3-status', '📋 Low priority queued - will play after high finishes', 'pass');
    };

    // Test 4: Enable/Disable
    document.getElementById('test4-disable').onclick = () => {
      audioManager.setEnabled(false);
      updateStatus('test4-status', '🔇 Audio disabled', 'info');
    };

    document.getElementById('test4-play').onclick = () => {
      audioManager.play('beep');
      updateStatus('test4-status', '✅ Tried to play - should be silent!', 'pass');
    };

    document.getElementById('test4-enable').onclick = () => {
      audioManager.setEnabled(true);
      updateStatus('test4-status', '🔊 Audio enabled', 'info');
    };

    document.getElementById('test4-play2').onclick = () => {
      audioManager.play('beep');
      updateStatus('test4-status', '✅ Playing - should hear sound!', 'pass');
    };

    // Test 5: Duck Strategy
    document.getElementById('test5-change-strategy').onclick = () => {
      audioManager.mixingStrategy = 'duck';
      updateStatus('test5-status', '🎚️ Switched to "duck" mixing strategy', 'info');
    };

    document.getElementById('test5-low').onclick = () => {
      audioManager.play('low-beep');
      updateStatus('test5-status', '🔊 Playing low priority', 'info');
    };

    document.getElementById('test5-high').onclick = () => {
      audioManager.play('high-beep');
      updateStatus('test5-status', '🎚️ High priority playing - low should reduce to 30% volume', 'pass');
    };
  </script>
</body>
</html>
```

### Running Manual Tests

1. Open the test HTML file in a browser:
   ```bash
   # Option 1: Python SimpleHTTPServer
   cd /home/runner/work/dopamine/dopamine
   python3 -m http.server 8000
   # Visit: http://localhost:8000/tests/manual/audio-verification.html

   # Option 2: Use VS Code Live Server extension
   # Right-click file → "Open with Live Server"
   ```

2. **Test Each Section Sequentially**:

   - **Test 1**: Verify basic sound playback works
   - **Test 2**: Verify fade-out behavior when high priority interrupts
   - **Test 3**: Verify queueing works (low priority waits for high)
   - **Test 4**: Verify enable/disable stops all audio
   - **Test 5**: Verify ducking strategy reduces volume instead of stopping

3. **Record Results**: Note any issues or unexpected behavior

---

## Verification Checklist

### ✅ Functional Requirements

- [ ] **Initialization**: AudioManager creates successfully with config
- [ ] **Sound Loading**: Sounds can be registered with priorities
- [ ] **Basic Playback**: Sounds play when `play()` is called
- [ ] **Priority System**: Higher priority sounds interrupt lower priority
- [ ] **Queue-Fade Strategy**: Lower priority sounds fade out smoothly (100ms)
- [ ] **Queueing**: Lower priority sounds queue and play after current finishes
- [ ] **Enable/Disable**: `setEnabled(false)` stops all playback
- [ ] **Stop All**: `stopAll()` immediately stops all sounds and clears queue

### ✅ Mixing Strategies

- [ ] **Queue-Fade** (default):
  - Higher priority fades out current sound
  - Lower priority gets queued
  - Fade duration is 100ms (configurable)

- [ ] **Interrupt**:
  - Higher priority immediately stops current sound
  - Lower priority sounds blocked while high priority plays

- [ ] **Duck**:
  - Higher priority reduces volume of lower priority to 30%
  - Both sounds play simultaneously

### ✅ Edge Cases

- [ ] Playing same sound multiple times in quick succession
- [ ] Calling `stopAll()` while fade is in progress
- [ ] Disabling audio while sounds are playing
- [ ] Rapidly switching between different priority sounds
- [ ] Queue behavior when multiple low-priority sounds queued

### ✅ Browser Compatibility

Test in the following browsers:

- [ ] Chrome/Edge (Chromium)
- [ ] Firefox
- [ ] Safari (macOS/iOS)

### ✅ Performance

- [ ] No memory leaks after playing 100+ sounds
- [ ] CPU usage reasonable during simultaneous playback
- [ ] No audio glitches or crackling

---

## Common Issues & Troubleshooting

### Issue: No Sound Plays

**Symptoms**: Buttons clicked but no audio heard

**Possible Causes**:
1. Browser autoplay policy blocking audio
2. User needs to interact with page first
3. AudioContext not initialized
4. No audio output device

**Resolution**:
```javascript
// Add user interaction requirement
document.body.addEventListener('click', () => {
  if (audioManager.audioContext?.state === 'suspended') {
    audioManager.audioContext.resume();
  }
}, { once: true });
```

### Issue: Fade Not Smooth

**Symptoms**: Abrupt cutoff instead of smooth fade

**Possible Causes**:
1. Fade duration too short
2. Using HTMLAudioElement instead of Web Audio API
3. Browser throttling requestAnimationFrame

**Resolution**:
- Increase `fadeDuration` in config
- Verify Web Audio API is available
- Test in different browser tab state (active vs background)

### Issue: Queue Not Working

**Symptoms**: Queued sounds never play

**Possible Causes**:
1. `onended` callback not firing
2. BufferSourceNode issue

**Resolution**:
- Check browser console for errors
- Verify `_onSoundEnded()` is called
- Try with HTMLAudioElement fallback

---

## Expected Timeline

- **Automated Tests**: 30 seconds
- **Manual Browser Tests**: 10-15 minutes
- **Cross-Browser Testing**: 30 minutes
- **Total Verification Time**: ~45 minutes

---

## Reporting Issues

When reporting issues, please include:

1. **Browser & Version**: (e.g., Chrome 122, Firefox 124)
2. **Test Section**: Which test failed?
3. **Expected Behavior**: What should happen?
4. **Actual Behavior**: What actually happened?
5. **Console Errors**: Any JavaScript errors?
6. **Steps to Reproduce**: Exact button clicks to trigger issue

**Example Report**:
```
Browser: Chrome 122.0.6261.94
Test: Test 2 - Queue-Fade Strategy
Expected: Low priority sound fades out over 100ms
Actual: Sound cuts off immediately (no fade)
Console: No errors
Steps: 
1. Click "Play Low Priority Sound"
2. Wait 0.5 seconds
3. Click "Play High Priority Sound"
Result: Abrupt cutoff, not smooth fade
```

---

## Sign-Off

After completing all tests, sign off below:

**Tester Name**: ___________________________  
**Date**: ___________________________  
**All Tests Pass**: ☐ Yes  ☐ No (see issues)  
**Issues Found**: ___________________________  
**Approved for Phase 3 Integration**: ☐ Yes  ☐ No  

---

## Next Steps

Once verification is complete:

1. ✅ **All Tests Pass**: Mark Issue #24 as complete, ready for Phase 3
2. ⚠️ **Issues Found**: Create bug reports, assign back to developer
3. 📝 **Documentation**: Update this guide with any new findings
4. 🚀 **Integration**: Begin Phase 3 audio implementation with real audio files

---

**Related Documentation**:
- `shared/utils/audio.js` - Implementation source
- `shared/utils/audio.test.js` - Automated tests
- `games/slot-machine/audio.example.js` - Integration guide
- `docs/PHASE_1_NOTES.md` - Design decisions
