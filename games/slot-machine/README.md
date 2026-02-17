# Slot Machine Game

A classic 3-reel slot machine that plays automatically with physics-based animations and modular architecture.

## Features

- **State Machine Architecture**: Five-state FSM (IDLE → SPINNING → EVALUATING → CELEBRATING → COOLDOWN)
- **Physics-Based Reels**: requestAnimationFrame-driven with bounce and settle animations
- **Event-Driven**: Modular components communicate via EventBus
- **Auto-spin**: Configurable auto-play with timing controls
- **Keyboard Accessible**: Space to start, Escape to stop
- **Weighted Random**: Configurable symbol probabilities
- **Console Logging**: State transitions and timing logged for debugging

## Symbols and Payouts

| Symbol | Weight | Payout (3 match) |
|--------|--------|------------------|
| Cherry 🍒 | 40% | 2x |
| Lemon 🍋 | 30% | 3x |
| Orange 🍊 | 20% | 5x |
| Seven 7️⃣ | 9% | 10x |
| Jackpot 💎 | 1% | 100x |

## Configuration

Edit `config.js` to customize:
- **Timing**: Spin duration, acceleration, bounce, settle (sourced from TR-1 spec)
- **Symbols**: Weights, payouts, display names, colors
- **Game Rules**: Initial credits, spin cost
- **Visual**: Symbol size, easing functions
- **State Machine**: State identifiers

## Architecture

### Files

- `index.html` — Game page with ARIA landmarks
- `game.js` — SlotMachine orchestrator class with state machine
- `reel.js` — Reel class with physics-based animation
- `config.js` — All tunable constants
- `styles.css` — Visual styling and animations
- `README.md` — This file

### Module Dependencies

```
game.js (orchestrator)
  ├── config.js (constants)
  ├── reel.js (reel animation)
  ├── ../../shared/utils/events.js (EventBus)
  ├── ../../shared/utils/random.js (weightedRandom)
  └── ../../shared/utils/animation.js (delay)

reel.js
  ├── ../../shared/utils/animation.js (ease, animate)
  └── ../../shared/utils/random.js (weightedRandom)
```

### State Machine

```
    ┌─────────────┐
    │    IDLE     │ ← Initial state, waiting to start
    └──────┬──────┘
           │ start()
           ▼
    ┌─────────────┐
    │  SPINNING   │ ← Reels actively spinning
    └──────┬──────┘
           │ all reels stopped
           ▼
    ┌─────────────┐
    │ EVALUATING  │ ← Check for wins
    └──┬──────┬───┘
       │ win  │ no win
       ▼      │
    ┌──────┐  │
    │ CEL- │  │
    │ EBRA │  │
    │ TING │  │
    └──┬───┘  │
       │      │
       ▼      ▼
    ┌─────────────┐
    │  COOLDOWN   │ ← Brief pause before next spin
    └──────┬──────┘
           │ timer expires
           └──────► (back to IDLE or next spin)
```

## How It Works

1. **Initialization**: Create 3 Reel instances, set up event listeners
2. **Auto-play Loop**: Timer triggers spin every N seconds
3. **Spin Phase**: 
   - State → SPINNING
   - Deduct credits
   - Select winning symbols (weighted random)
   - Start all reels spinning with acceleration
4. **Stop Phase**: 
   - Stagger reel stops by 300ms
   - Each reel: deceleration → bounce → settle (physics-based)
   - Emit 'reel:stopped' events
5. **Evaluation**: 
   - State → EVALUATING
   - Compare symbols for matches
   - Calculate payout if win
6. **Celebration** (if win):
   - State → CELEBRATING
   - Show win message
   - Update credits
7. **Cooldown**:
   - State → COOLDOWN
   - Brief pause
   - State → IDLE
8. **Repeat**: Auto-play timer schedules next spin

## Usage

```javascript
import { SlotMachine } from './game.js';

const game = new SlotMachine('game-container', {
  spinInterval: 3000,
  initialCredits: 100,
  // ... other config overrides
});

game.start(); // Begin auto-play
game.stop();  // Stop auto-play
game.reset(); // Reset to initial state
```

The game auto-initializes when `index.html` is loaded.

## Keyboard Controls

- **Space**: Start auto-play
- **Escape**: Stop auto-play
- **R**: Reset game (planned)

## Console Output

The game logs state transitions and timing for debugging:

```
[SlotMachine] State transition: idle → spinning
[Reel 0] Stop sequence started for Cherry at 12345.67ms
[Reel 0] Stop complete (total: 250.00ms)
[Reel 1] Stop sequence started for Lemon at 12645.67ms
[Reel 1] Stop complete (total: 250.00ms)
[Reel 2] Stop sequence started for Orange at 12945.67ms
[Reel 2] Stop complete (total: 250.00ms)
[SlotMachine] State transition: spinning → evaluating
[SlotMachine] State transition: evaluating → cooldown
[SlotMachine] State transition: cooldown → idle
```

## Performance Baseline (Phase 1)

| Metric | Target | Status |
|--------|--------|--------|
| Frame Rate | 60 fps | ⚠️ Not measured |
| Reel Stop Timing | TR-1 ±50ms | ⚠️ Not measured |
| Load Time (3G) | < 3s | ⚠️ Not measured |
| Memory (100 spins) | Stable | ⚠️ Not measured |

Comprehensive performance testing scheduled for Phase 4.

## Development Status

**Phase 1 Complete** ✅ — Core engine refactor with modular architecture, state machine, physics-based reels, keyboard accessibility.

See `../../docs/TECHNICAL_PLAN_SLOT_MACHINE.md` for the complete 4-phase implementation roadmap.

See `../../docs/PHASE_1_NOTES.md` for open design questions and tasks requiring consideration.

## Future Enhancements (Phase 2–4)

### Phase 2 — Multi-Reel & Pattern Detection
- [ ] Support 1-6 reels with adaptive layout
- [ ] Progressive pattern detection (linear, scatter, cluster, shape, transform)
- [ ] Pattern visualization overlays
- [ ] Responsive breakpoints (mobile 4, tablet 5, desktop 6)
- [ ] Near-miss detection and hints

### Phase 3 — Particles, Audio & Environment
- [ ] Canvas particle system for celebrations
- [ ] Audio manager with lazy-loading
- [ ] Parallax background environment
- [ ] Ambient animations (symbol idle, frame glow)
- [ ] Reactive environment (lanterns, vendors)

### Phase 4 — Polish & Performance
- [ ] 3D reel cylinder illusion
- [ ] Performance optimization and profiling
- [ ] Cross-browser testing (Chrome, Firefox, Safari, Edge)
- [ ] Mobile testing (iOS, Android)
- [ ] Accessibility audit (axe/WAVE)
- [ ] Comprehensive documentation
