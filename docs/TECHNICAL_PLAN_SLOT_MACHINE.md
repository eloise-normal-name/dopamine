# Slot Machine — Technical Plan

**Status:** Ready for Implementation  
**Design Source:** [SLOT_MACHINE_ITERATION_01.md](design/visual/SLOT_MACHINE_ITERATION_01.md)  
**Architecture Reference:** [ARCHITECTURE.md](../ARCHITECTURE.md)  
**Date:** 2026-02-15

---

## 1. Overview

This document translates the slot machine design specification (80+ requirements across FR, VR, TR, AR, AC, PR, TC categories) into an actionable implementation plan. It defines module boundaries, data structures, state management, and a phased build order that delivers playable increments at each phase.

### Guiding Constraints

| Constraint | Source |
|---|---|
| Vanilla JS (ES6+), no frameworks | ARCHITECTURE.md |
| Zero build step — open `index.html` and run | CONTRIBUTING.md |
| 60 fps animation target | DESIGN_PRINCIPLES.md, PR-2.3 |
| Auto-play first, minimal interaction | DESIGN_PRINCIPLES.md |
| ES6 module imports (`type="module"`) | Existing game.js pattern |

---

## 2. File Structure

All new files live under the existing `games/slot-machine/` directory and shared utilities under `shared/`. No new top-level directories are introduced.

```
games/slot-machine/
├── index.html              # Entry point (update existing)
├── game.js                 # SlotMachine orchestrator class (update existing)
├── config.js               # All tunable constants (update existing)
├── styles.css              # Base layout + animation keyframes (update existing)
├── reel.js                 # NEW — single-reel rendering & physics
├── pattern.js              # NEW — pattern detection engine
├── particles.js            # NEW — canvas-based particle system
├── audio.js                # NEW — audio manager (lazy-load, mute, mix)
├── environment.js          # NEW — parallax layers & micro-events
├── README.md               # Game docs (update existing)

shared/
├── utils/
│   ├── random.js           # NEW — weighted random, shuffle
│   ├── animation.js        # NEW — easing functions, rAF helper
│   └── events.js           # NEW — lightweight pub/sub
```

### Module Dependency Graph

```
index.html
  └── game.js (orchestrator)
        ├── config.js          (constants — no deps)
        ├── reel.js            (imports: config, shared/utils/random, shared/utils/animation)
        ├── pattern.js         (imports: config)
        ├── particles.js       (imports: config, shared/utils/animation)
        ├── audio.js           (imports: config)
        ├── environment.js     (imports: config, shared/utils/animation)
        └── shared/utils/events.js (pub/sub — no deps)
```

All modules communicate through the event bus (`shared/utils/events.js`). `game.js` is the only module that directly references the DOM layout; child modules receive container elements via constructor injection.

---

## 3. State Machine

The game operates as a finite state machine. Every UI and animation decision is driven by the current state.

```
                    ┌──────────────┐
         ┌────────►│     IDLE      │◄────────────┐
         │         └──────┬───────┘              │
         │                │ start()              │
         │                ▼                      │
         │         ┌──────────────┐              │
         │    ┌───►│  SPINNING    │              │
         │    │    └──────┬───────┘              │
         │    │           │ all reels stopped     │
         │    │           ▼                      │
         │    │    ┌──────────────┐              │
         │    │    │  EVALUATING  │              │
         │    │    └──┬───────┬──┘              │
         │    │       │ win   │ no win          │
         │    │       ▼       │                  │
         │    │ ┌───────────┐ │                  │
         │    │ │ CELEBRATING│ │                  │
         │    │ └─────┬─────┘ │                  │
         │    │       │       │                  │
         │    │       ▼       ▼                  │
         │    │  ┌────────────────┐              │
         │    └──│  COOLDOWN      │──────────────┘
         │       └────────────────┘   (auto-spin timer)
         │
         │  stop() / out-of-credits
         └───────────────────────────────────────
```

### State Definitions

| State | Entry Condition | Exit Condition | Active Modules |
|---|---|---|---|
| `IDLE` | Initial load, or `stop()` called | `start()` called | Environment ambient loops, symbol idle animations |
| `SPINNING` | Auto-spin timer fires or manual spin | All reels report `stopped` | Reel spin physics, spin audio |
| `EVALUATING` | Last reel stopped | Pattern detection complete | Pattern engine |
| `CELEBRATING` | Win detected | Celebration animation complete | Particles, pattern visualization, audio, frame glow |
| `COOLDOWN` | Evaluation done (win or loss) | Cooldown timer expires | Credit counter animation, pattern history update |

State transitions emit events on the shared event bus so every module can react independently.

---

## 4. Core Data Structures

### 4.1 Symbol

```js
/** @typedef {Object} Symbol
 *  @property {string} id          — 'cherry' | 'lemon' | 'orange' | 'seven' | 'jackpot'
 *  @property {string} emoji       — display character (e.g., '🍒')
 *  @property {string} displayName — human label
 *  @property {number} weight      — probability weight (higher = more common)
 *  @property {number} payout      — multiplier for 3-match
 *  @property {string} color       — hex theme color (VR-1.3)
 */
```

### 4.2 Reel State

```js
/** @typedef {Object} ReelState
 *  @property {number}   index          — reel position (0-5)
 *  @property {Symbol[]} strip          — ordered symbol strip
 *  @property {number}   position       — current scroll offset (px)
 *  @property {number}   targetPosition — final stop position (px)
 *  @property {'idle'|'spinning'|'decelerating'|'bouncing'|'stopped'} phase
 */
```

### 4.3 Pattern Result

```js
/** @typedef {Object} PatternResult
 *  @property {'linear'|'cluster'|'scatter'|'shape'|'transform'} type
 *  @property {Array<{reel:number, row:number}>}                 cells  — matched positions
 *  @property {number}                                            payout — credit multiplier
 *  @property {boolean}                                           isNew  — first time this pattern type seen
 */
```

### 4.4 Game State

```js
/** @typedef {Object} GameState
 *  @property {'idle'|'spinning'|'evaluating'|'celebrating'|'cooldown'} phase
 *  @property {number}          credits
 *  @property {number}          lastWin
 *  @property {number}          totalSpins
 *  @property {number}          reelCount       — current 1-6
 *  @property {Symbol[][]}      reelResults     — per-reel visible symbols
 *  @property {PatternResult[]} activePatterns
 *  @property {Set<string>}     discoveredPatternTypes
 *  @property {PatternResult[]} patternHistory  — last 10 wins
 *  @property {number}          winStreak
 *  @property {number}          lossStreak
 *  @property {number}          lastActivityTimestamp
 */
```

---

## 5. Module API Contracts

### 5.1 `game.js` — SlotMachine (orchestrator)

```js
class SlotMachine {
  constructor(containerId, options = {})
  start()                    // enter auto-play loop
  stop()                     // exit auto-play loop
  reset()                    // restore initial state
  destroy()                  // tear down listeners, timers, child modules
  // — private —
  _spin()                    // single spin cycle
  _onAllReelsStopped()       // transition to EVALUATING
  _onEvaluationComplete(patterns)
  _onCelebrationComplete()
  _scheduleCooldown()
  _adaptLayout(reelCount)    // responsive reel count
  _handleIdleTimeout()       // attention-pulse after 60 s
}
```

### 5.2 `reel.js` — Reel

```js
class Reel {
  constructor(containerEl, index, config)
  spin()                     // start spin animation
  stopAt(symbol, onComplete) // decelerate → bounce → settle
  setSymbols(symbols)        // populate strip
  getVisibleSymbol()         // current center symbol
  resize(symbolSize, gap)    // adapt to reel count changes
  destroy()
}
```

Physics model (per VR-10.5):
1. **Acceleration** — `ease-in` over 200 ms to full speed.
2. **Constant speed** — linear scroll for `spinDuration`.
3. **Deceleration** — cubic-bezier ease-out to target, overshooting by 1-2 symbol heights.
4. **Bounce** — spring-back over 150 ms using `cubic-bezier(0.68, -0.55, 0.265, 1.55)`.
5. **Settle** — ease-out over 100 ms to final position.

Implementation approach: use `requestAnimationFrame` driving a CSS `transform: translateY()` value per frame. No layout thrashing — translate only.

### 5.3 `pattern.js` — PatternEngine

```js
class PatternEngine {
  constructor(config)
  evaluate(grid, reelCount, totalSpins) → PatternResult[]
  getUnlockedTypes(totalSpins) → string[]
  // — private —
  _checkLinear(grid, reelCount)     → PatternResult[]
  _checkScatter(grid, reelCount)    → PatternResult[]
  _checkCluster(grid, reelCount)    → PatternResult[]
  _checkShape(grid, reelCount)      → PatternResult[]
  _checkTransform(grid, reelCount)  → PatternResult[]
}
```

Progressive unlock thresholds (FR-6.1):

| Pattern Type | Unlock Spin | Method |
|---|---|---|
| Linear | 1 | `_checkLinear` |
| Scatter | 11 | `_checkScatter` |
| Cluster | 31 | `_checkCluster` |
| Shape | 61 | `_checkShape` |
| Transform | 100 | `_checkTransform` |

The `evaluate()` method only calls checkers for pattern types currently unlocked, keeping early spins simple.

### 5.4 `particles.js` — ParticleSystem

```js
class ParticleSystem {
  constructor(canvasEl, config)
  burst(tier, originX, originY, color)  // 'small'|'medium'|'big'|'jackpot'
  update(dt)                            // called each rAF frame
  render()                              // draw to canvas
  clear()                               // remove all active particles
  destroy()
}
```

Rendered on a transparent `<canvas>` overlay. Particle counts per tier (VR-8.1):

| Tier | Particles | Duration |
|---|---|---|
| Small | 200 | 1000ms |
| Medium | 400 | 1500ms |
| Big | 800 | 2000ms |
| Jackpot | 2000 | 3500ms |

Each particle stores: `x, y, vx, vy, life, maxLife, color, size`. Physics: gravity (0.15 px/frame²), wind drift (±0.05 px/frame), opacity fade as `life/maxLife`.

Graceful degradation (PR-2.6): if `navigator.hardwareConcurrency < 4` or `deviceMemory < 4`, cap particles at 50% of budget.

### 5.5 `audio.js` — AudioManager

```js
class AudioManager {
  constructor(config)
  play(soundId, options?)    // e.g., play('reel-stop-1', { volume: 0.6 })
  setMuted(muted)
  setVolume(volume)          // 0-1
  destroy()
  // — private —
  _lazyLoad(soundId)         // fetch on first use (TC-3.4)
}
```

Uses `AudioContext` + `AudioBuffer` for low-latency playback. Falls back to `<audio>` elements on Safari if needed. All sound files lazy-loaded on first interaction (browser autoplay policy compliance).

### 5.6 `environment.js` — Environment

```js
class Environment {
  constructor(containerEl, config)
  start()                    // begin ambient animation loops
  stop()
  reactToEvent(eventType)    // 'win' | 'bigWin' | 'jackpot' | 'nearMiss' | 'streak'
  setMood(creditBalance)     // night deepens/lightens per FR-5.1
  destroy()
}
```

Parallax layers implemented as stacked `<div>` elements with CSS `will-change: transform` and `transform: translateX()` driven by a single rAF loop. Micro-events scheduled via `setTimeout` at random 30-90 s intervals (VR-7.2).

### 5.7 `shared/utils/events.js` — EventBus

```js
class EventBus {
  on(event, callback)
  off(event, callback)
  emit(event, data)
}
```

Synchronous dispatch. Game events:

| Event | Payload | Emitter |
|---|---|---|
| `state:change` | `{ from, to }` | game.js |
| `reel:stopped` | `{ index, symbol }` | reel.js |
| `spin:start` | `{ reelCount }` | game.js |
| `spin:complete` | `{ results }` | game.js |
| `win` | `{ patterns, totalPayout }` | game.js |
| `pattern:discovered` | `{ type }` | game.js |
| `credits:update` | `{ credits, delta }` | game.js |
| `idle:timeout` | `{}` | game.js |

### 5.8 `shared/utils/random.js`

```js
function weightedRandom(items, weightKey) → item
function randomInt(min, max) → number
function randomFloat(min, max) → number
function shuffle(array) → array
```

### 5.9 `shared/utils/animation.js`

```js
function easeOut(t) → number
function easeInOut(t) → number
function cubicBezier(x1, y1, x2, y2) → (t) => number
function lerp(a, b, t) → number
function createAnimationLoop(callback) → { start(), stop() }
```

`createAnimationLoop` wraps `requestAnimationFrame` with delta-time calculation and a stop handle.

---

## 6. Phased Implementation

Each phase produces a shippable increment. Phases are ordered to maximize playable value early and defer polish-heavy systems.

### Phase 1 — Core Engine Refactor (target: 1 week)

**Goal:** Replace the current flat `game.js` with the modular architecture. Game remains 3-reel with basic matching but gains proper state machine, physics-based reels, and event-driven flow.

| Task | Files | Requirements Covered |
|---|---|---|
| Create `shared/utils/events.js` | NEW | — |
| Create `shared/utils/random.js` | NEW | — |
| Create `shared/utils/animation.js` | NEW | — |
| Extract `reel.js` with rAF-driven physics | NEW | VR-10.1–10.5, TR-1 (spin/stop/bounce/settle) |
| Refactor `game.js` to state machine | UPDATE | FR-1.1, FR-2.1–2.4, TC-1.1, TC-2.1–2.4 |
| Update `config.js` with TR-1 timing values | UPDATE | TR-1, TR-2.1–2.5 |
| Update `styles.css` — reel layout, keyframes for bounce/settle | UPDATE | VR-4, VR-5 |
| Update `index.html` — add canvas overlay, ARIA landmarks | UPDATE | AC-2.1 |
| Add keyboard controls (Space=spin, Escape=stop) | UPDATE game.js | AC-3.1–3.2 |

**Deliverable:** 3-reel slot with physics-based reels, state machine, keyboard accessibility, and event bus.

**Quality gate:**
- Reels spin and stop with bounce physics matching TR-1 timing (±50 ms)
- State transitions logged to console for verification
- Keyboard navigation functional
- 60 fps on Chrome/Firefox desktop

---

### Phase 2 — Multi-Reel & Pattern Detection (target: 1–2 weeks)

**Goal:** Support 1-6 reels with adaptive layout and the progressive pattern detection system.

| Task | Files | Requirements Covered |
|---|---|---|
| Create `pattern.js` with 5 pattern checkers | NEW | FR-1.4, FR-1.5, FR-6.1–6.7 |
| Add multi-reel support to `game.js` | UPDATE | FR-1.1, VR-11.1–11.5 |
| Add adaptive layout CSS (symbol sizing, spacing, breakpoints) | UPDATE styles.css | VR-11.1–11.4, VR-4.1–4.5 |
| Add pattern visualization overlays (SVG/CSS) | UPDATE styles.css, game.js | VR-12.1–12.6 |
| Add pattern history display | UPDATE index.html, game.js | FR-1.7, FR-3.8, VR-12.4 |
| Add near-miss detection and ghost hints | game.js, pattern.js | FR-3.7, VR-12.5 |
| Add progressive unlock system with discovery celebration | game.js | FR-6.2, FR-6.3, VR-12.6 |
| Update config.js — pattern definitions, unlock thresholds, reel sizing maps | UPDATE | Config checklist items |
| Responsive breakpoints (mobile 4, tablet 5, desktop 6) | UPDATE styles.css | VR-11.4, PR-3.4 |
| ARIA live region for pattern announcements | UPDATE index.html | AC-2.2, AC-2.4 |

**Deliverable:** Multi-reel slot with progressive pattern unlocks, visual pattern feedback, and responsive layout.

**Quality gate:**
- Pattern detection correct for all 5 types (verify with known grids)
- Layout adapts cleanly at 320 px, 768 px, 1024 px widths
- Discovery celebration fires on first new pattern
- Near-miss hints appear at 30% opacity
- Screen reader announces pattern type on win

---

### Phase 3 — Particles, Audio & Environment (target: 1–2 weeks)

**Goal:** Add the visual and audio systems that make the game feel premium.

| Task | Files | Requirements Covered |
|---|---|---|
| Create `particles.js` — canvas particle system | NEW | VR-8.1–8.5 |
| Add particle canvas overlay to index.html | UPDATE | — |
| Create `audio.js` — lazy-load, play, mute | NEW | AR-1.1–1.5, AR-2.1–2.4 |
| Add mute toggle button to UI | UPDATE index.html, styles.css | FR-2.3 |
| Create `environment.js` — parallax, micro-events | NEW | VR-6.1–6.6, VR-7.1–7.5 |
| Add parallax background layers to index.html | UPDATE | VR-6.1–6.6 |
| Symbol idle animations (bob, glow, rotate, reflect, twinkle) | UPDATE styles.css | VR-7.3 |
| Reactive machine frame (win/streak/loss states) | UPDATE styles.css, game.js | VR-9.1–9.3 |
| Attention-pulse system (near-miss, streak, idle) | UPDATE game.js | FR-4.1–4.4 |
| Environmental reactivity (lanterns brighten, vendor notice) | UPDATE environment.js | FR-5.1–5.3 |
| Frame glow color transitions (purple → gold → magenta) | UPDATE styles.css | VR-9.1 |
| Credit counter smooth animation | UPDATE game.js, styles.css | FR-3.3 |
| Graceful degradation for low-end devices | particles.js, environment.js | PR-2.6, PR-3.2 |

**Deliverable:** Full audio-visual experience with particles, environment, and ambient animation.

**Quality gate:**
- Particle counts match spec per tier (±10%)
- Audio plays without overlap artifacts
- Mute persists across page reload (localStorage)
- Environment micro-events fire at 30-90 s intervals
- CPU < 40% on mid-tier device with all systems active
- Particles degrade on `navigator.hardwareConcurrency < 4`

---

### Phase 4 — Polish, Performance & Documentation (target: 1 week)

**Goal:** Cross-browser testing, performance optimization, accessibility audit, documentation.

| Task | Files | Requirements Covered |
|---|---|---|
| 3D reel cylinder illusion (perspective, shadow) | UPDATE styles.css, reel.js | VR-10.1–10.4 |
| Performance profiling & optimization | All | PR-1.1–1.6, PR-2.1–2.5, TR-3.1–3.4 |
| Cross-browser testing (Chrome 90+, FF 88+, Safari 14+, Edge 90+) | — | PR-3.1 |
| Mobile testing (iOS 14+, Android 10+) | — | PR-3.3, PR-3.5 |
| Accessibility audit (axe/WAVE) | — | AC-1, AC-2, AC-3 |
| `will-change` hints for GPU acceleration | UPDATE styles.css | PR-3.6 |
| Adaptive quality (reduce on low battery/high load) | UPDATE game.js | PR-3.7 |
| Update README.md with usage and API | UPDATE | Documentation checklist |
| Add JSDoc comments to all public methods | All modules | Documentation checklist |
| Update main index.html game listing | UPDATE /index.html | — |

**Deliverable:** Production-quality slot machine ready for deployment.

**Quality gate:**
- All PR-* metrics met
- Zero axe violations (critical/serious)
- Game loads < 3 s on simulated 3G
- Memory stable over 100+ spins (no leaks)
- README documents all config options

---

## 7. Configuration Schema

All tunables live in `config.js`. This is the expanded schema covering all phases:

```js
export const config = {
  // ── Reel setup ──
  reelCount: 3,                    // default, range 1-6
  symbolsPerReel: 10,              // strip length
  symbols: [ /* Symbol[] */ ],

  // ── Timing (ms) — sourced from TR-1 ──
  spinAcceleration: 200,
  spinDuration: 2000,
  reelStopDelay: 300,              // stagger between reels
  decelerationBounce: 150,
  symbolSettle: 100,
  patternDetection: 200,
  cooldownDelay: 2000,
  autoSpinBase: 3000,
  autoSpinPerReel: 200,            // added per extra reel

  // ── Easing (CSS cubic-bezier values) ──
  easing: {
    spinStart:    'ease-in',
    reelStop:     'cubic-bezier(0.25, 0.1, 0.25, 1)',
    bounce:       'cubic-bezier(0.68, -0.55, 0.265, 1.55)',
    settle:       'ease-out',
    winPulse:     'ease-in-out',
  },

  // ── Credits ──
  initialCredits: 100,
  spinCost: 1,

  // ── Pattern unlock thresholds ──
  patternUnlocks: {
    linear:    1,
    scatter:   11,
    cluster:   31,
    shape:     61,
    transform: 100,
  },

  // ── Layout (VR-11) ──
  symbolSizeMap: { 1: 128, 2: 96, 3: 80, 4: 64, 5: 56, 6: 48 },
  reelGapMap:    { 1: 16, 2: 16, 3: 16, 4: 8, 5: 8, 6: 8 },
  responsiveMaxReels: { mobile: 4, tablet: 5, desktop: 6 },

  // ── Particles (VR-8) ──
  particles: {
    small:   { count: 200,  duration: 1000 },
    medium:  { count: 400,  duration: 1500 },
    big:     { count: 800,  duration: 2000 },
    jackpot: { count: 2000, duration: 3500 },
    gravity: 0.15,
    windDrift: 0.05,
  },

  // ── Pattern colors (VR-12.2) ──
  patternColors: {
    linear:    '#00D9FF',
    cluster:   '#FFD700',
    scatter:   '#FF6B9D',
    shape:     '#00FFAA',
    transform: 'linear-gradient(90deg, red, orange, yellow, green, blue, violet)',
  },

  // ── Environment ──
  parallaxLayers: 5,
  microEventInterval: { min: 30000, max: 90000 },
  ambientTimings: { symbolBob: 2000, glowPulse: 4000, neonBorder: 4000, lanternSway: 8000 },
  idleTimeoutMs: 60000,

  // ── Audio ──
  audio: {
    defaultVolume: 0.6,
    basePath: '../../assets/sounds/slot-machine/',
    sounds: {
      'spin-start':   { file: 'spin-start.ogg',   fallback: 'spin-start.mp3' },
      'reel-stop-1':  { file: 'reel-stop-1.ogg',  fallback: 'reel-stop-1.mp3' },
      'reel-stop-2':  { file: 'reel-stop-2.ogg',  fallback: 'reel-stop-2.mp3' },
      'reel-stop-3':  { file: 'reel-stop-3.ogg',  fallback: 'reel-stop-3.mp3' },
      'win-small':    { file: 'win-small.ogg',     fallback: 'win-small.mp3' },
      'win-medium':   { file: 'win-medium.ogg',    fallback: 'win-medium.mp3' },
      'win-big':      { file: 'win-big.ogg',       fallback: 'win-big.mp3' },
      'win-jackpot':  { file: 'win-jackpot.ogg',   fallback: 'win-jackpot.mp3' },
    },
  },

  // ── Performance ──
  performance: {
    maxHeapMB: 80,
    lowEndParticleScale: 0.5,
    lowEndConcurrencyThreshold: 4,
  },
};
```

---

## 8. Rendering Strategy

### DOM vs Canvas Split

| System | Renderer | Reason |
|---|---|---|
| Reels & symbols | DOM + CSS transforms | GPU-accelerated transforms, easy accessibility (text nodes for screen readers) |
| Pattern overlays | SVG overlay | Clean lines, resolution-independent, animatable with CSS |
| Particles | `<canvas>` | Thousands of sprites, per-frame updates, no DOM overhead |
| Parallax environment | DOM layers with CSS transforms | Simple implementation, GPU compositing via `will-change` |
| UI (credits, buttons) | DOM | Standard HTML elements, full accessibility |

### Layering (z-index stack)

```
z: 0   — parallax background layers (environment.js)
z: 10  — reel container (reel.js)
z: 20  — pattern visualization SVG overlay
z: 30  — reactive frame border (CSS)
z: 40  — particle canvas (particles.js)
z: 50  — UI controls, credit display (DOM)
```

---

## 9. Performance Strategy

### Frame Budget (16.67 ms at 60 fps)

| System | Budget | Notes |
|---|---|---|
| Reel transforms | 1 ms | Single `translateY` per reel, GPU composited |
| Pattern evaluation | 2 ms | Runs once after reels stop, not per frame |
| Particle update + render | 4 ms | Batch canvas operations, object pooling |
| Environment parallax | 1 ms | CSS transform only, no layout |
| Audio scheduling | 0.5 ms | Web Audio API, pre-decoded buffers |
| DOM updates (credits, status) | 1 ms | Batched, rAF-synchronized |
| **Overhead / headroom** | **7 ms** | |

### Object Pooling

Particles are pre-allocated in a typed pool to avoid GC pressure:

```js
// Pre-allocate max particle count (2000 for jackpot)
const pool = new Float32Array(2000 * 7); // x, y, vx, vy, life, size, colorIndex
```

### Memory Management

- All `setInterval`/`setTimeout` tracked and cleared in `destroy()`.
- Canvas cleared between celebrations.
- Audio buffers released when switching games.
- Pattern history capped at 10 entries (oldest evicted).

### Adaptive Quality

```js
function getQualityTier() {
  const cores = navigator.hardwareConcurrency || 2;
  const memory = navigator.deviceMemory || 2;  // GB
  if (cores >= 8 && memory >= 8) return 'high';
  if (cores >= 4 && memory >= 4) return 'medium';
  return 'low';
}
```

| Tier | Particle Scale | Parallax Layers | Ambient Events | Symbol Animations |
|---|---|---|---|---|
| High | 100% | 5 | All | All |
| Medium | 50% | 3 | Reduced | Simplified |
| Low | 25% | 1 (static) | None | None |

---

## 10. Accessibility Implementation

| Requirement | Implementation |
|---|---|
| AC-1.1 (shapes, not just color) | Symbols use distinct emoji shapes + thick outlines |
| AC-1.2 (4.5:1 contrast) | Verified via computed style checks in Phase 4 audit |
| AC-1.3 (focus indicators) | 3px outline minimum on all focusable elements |
| AC-2.1 (ARIA landmarks) | `role="application"` on game container, `role="status"` on credit/win displays |
| AC-2.2 (live regions) | `aria-live="polite"` on status bar, `aria-live="assertive"` on jackpot win |
| AC-2.3 (button labels) | `aria-label` on Start/Stop/Reset/Mute buttons |
| AC-2.4 (state announcements) | Status text updated on every state change; screen reader reads via live region |
| AC-3.1 (keyboard) | `Space` = spin, `Escape` = stop, `R` = reset, `M` = mute; `tabindex` on controls |
| AC-3.2 (no conflicts) | Keys chosen to avoid browser defaults |
| AC-3.3 (no timing required) | Auto-play handles all timing; manual controls are optional |
| AC-3.4 (pausable auto-play) | Stop button always accessible |

---

## 11. Testing Strategy

The project currently has no test runner. Testing follows the manual approach documented in CONTRIBUTING.md, supplemented with in-browser DevTools verification.

### Manual Test Plan

| Category | Test | Pass Criteria |
|---|---|---|
| **Functional** | Start → spin → stop cycle | State transitions correctly, credits update |
| **Functional** | Run 100+ auto-spins | No JS errors, memory stable (DevTools heap snapshot) |
| **Functional** | Pattern unlock at spin 11/31/61/100 | New pattern type appears, discovery celebration fires |
| **Functional** | Out-of-credits | Auto-play stops, status message shows |
| **Visual** | Reel physics | Bounce + settle visible, timing matches TR-1 ±50 ms |
| **Visual** | Responsive layout | 320 px, 768 px, 1024 px — reel count and symbol size adapt |
| **Visual** | Win celebrations | Particle count approximately correct per tier |
| **Audio** | Mute toggle | Persists across reload, no sound when muted |
| **Audio** | Reel stop sounds | Distinct pitch per reel |
| **Accessibility** | Keyboard only | Full game cycle without mouse |
| **Accessibility** | Screen reader | VoiceOver/NVDA announces state changes |
| **Performance** | 60 fps | Chrome DevTools Performance panel, no jank during spin |
| **Performance** | Load time | Lighthouse throttled 3G < 3 s |
| **Cross-browser** | Chrome, Firefox, Safari, Edge | Spin, win, celebrate cycle works |
| **Mobile** | iOS Safari, Android Chrome | Touch controls, layout adapts |

### Automated Checks (Optional — Future)

If test infrastructure is added later, prioritize:
1. `PatternEngine.evaluate()` unit tests — deterministic grid inputs → expected pattern outputs.
2. `weightedRandom` distribution verification — run 10000 iterations, check symbol frequencies within ±5% of expected weights.
3. State machine transition tests — verify all valid transitions and rejection of invalid ones.

---

## 12. Risk Register

| Risk | Likelihood | Impact | Mitigation |
|---|---|---|---|
| Particle system drops below 60 fps on mobile | Medium | High | Adaptive quality tiers, object pooling, canvas batch rendering |
| Audio autoplay blocked by browser policy | High | Low | Lazy-load on first user gesture; game fully functional without audio |
| Pattern detection has edge-case bugs in complex grids | Medium | Medium | Exhaustive test cases for each pattern type; start with simple patterns |
| Asset bundle exceeds size budget | Medium | Medium | SVG for symbols and UI; progressive loading of environment layers |
| 6-reel layout too cramped on small screens | Low | Medium | Responsive breakpoints cap reels at 4 (mobile), 5 (tablet) |

---

## 13. Open Questions (from design doc)

These decisions from the design doc Appendix should be resolved before implementation begins for the affected phase:

| # | Question | Phase Impact | Proposed Answer |
|---|---|---|---|
| 1 | Audio mixing: interrupt or queue? | Phase 3 | Queue with priority — spin sounds fade out when win sound plays |
| 2 | Credit cap or infinite growth? | Phase 1 | Soft cap at 99999 (display width constraint); overflow resets to initial |
| 3 | Mobile: tap-to-spin or auto-only? | Phase 1 | Auto-only by default; tap anywhere to toggle start/stop |

---

## 14. Relationship to Existing Documentation

| Document | Relationship |
|---|---|
| [SLOT_MACHINE_ITERATION_01.md](design/visual/SLOT_MACHINE_ITERATION_01.md) | Source of all requirements (FR, VR, TR, AR, AC, PR, TC). This plan implements those requirements. |
| [SLOT_MACHINE_DESIGN_COMPLETION_SUMMARY.md](design/visual/SLOT_MACHINE_DESIGN_COMPLETION_SUMMARY.md) | Tracks design review stages. This plan covers Stage 4 (Implementation Review) scope. |
| [ARCHITECTURE.md](../ARCHITECTURE.md) | Defines file structure conventions. This plan follows those conventions. |
| [DESIGN_PRINCIPLES.md](../DESIGN_PRINCIPLES.md) | Provides visual, audio, and interaction philosophy. All implementation decisions align. |
| [CONTRIBUTING.md](../CONTRIBUTING.md) | Defines game template (constructor, start, stop, reset). Preserved in refactored `game.js`. |
| [ASSET_WORKFLOW.md](design/ASSET_WORKFLOW.md) | Asset pipeline for symbols, sounds, backgrounds. Phase 3 depends on asset availability. |

---

**End of Technical Plan**
