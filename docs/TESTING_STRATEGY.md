# Test Tooling Integration Strategy

**Date**: 2026-02-16  
**Status**: Design Phase  
**Author**: Claudia [c35s]

---

## Executive Summary

This document defines the testing strategy for the Dopamine slot machine game, focusing on automated verification of game state transitions, win logic, credit calculations, and event-driven behavior. The design prioritizes pragmatic, maintainable tests that validate core game logic without excessive mocking or brittle DOM assertions.

### Design Goals

1. **State Verification** — Assert expected game states at each phase of the spin cycle
2. **Event-Driven Testing** — Leverage existing EventBus for test observability
3. **Minimal Mocking** — Test real modules together when possible
4. **Fast Execution** — Unit tests run in <100ms, integration tests in <500ms
5. **CI-Ready** — Headless execution for automated pipelines

---

## Framework Recommendation: Vitest

**Chosen**: [Vitest](https://vitest.dev/)

### Rationale

| Criterion | Vitest | Jest | Web Test Runner |
|-----------|--------|------|-----------------|
| ES Module support | ✅ Native | ⚠️ Requires transform | ✅ Native |
| Browser API mocking | ✅ happy-dom/jsdom | ✅ jsdom | ✅ Real browser |
| Speed | ✅ Fast (Vite) | ⚠️ Slower | ⚠️ Browser overhead |
| Watch mode | ✅ Excellent | ✅ Good | ⚠️ Limited |
| TypeScript support | ✅ Built-in | ✅ Via babel | ⚠️ Manual setup |
| Async/Promise testing | ✅ Native | ✅ Native | ✅ Native |

**Decision**: Vitest provides the best balance of speed, ES module support, and developer experience. `happy-dom` environment is sufficient for our needs (no complex DOM manipulation testing required).

---

## Test Architecture

### Testing Pyramid

```
        ╱╲
       ╱  ╲      E2E (5%)
      ╱────╲     - Full game cycles in Playwright
     ╱      ╲    - Smoke tests only
    ╱────────╲   
   ╱          ╲  Integration (25%)
  ╱────────────╲ - Multi-module interactions
 ╱              ╲- EventBus communication
╱────────────────╲
                  Unit (70%)
                  - State machine logic
                  - Win detection
                  - Utility functions
```

### Test Organization

```
dopamine/
├── tests/
│   ├── unit/
│   │   ├── slot-machine/
│   │   │   ├── game.test.js         # SlotMachine state machine
│   │   │   ├── reel.test.js         # Reel physics/animation
│   │   │   ├── config.test.js       # Configuration validation
│   │   │   └── win-detection.test.js # Win logic edge cases
│   │   └── shared/
│   │       ├── events.test.js       # EventBus behavior
│   │       ├── random.test.js       # RNG utilities
│   │       └── animation.test.js    # Animation helpers
│   ├── integration/
│   │   └── slot-machine/
│   │       ├── spin-cycle.test.js   # Full spin lifecycle
│   │       ├── auto-play.test.js    # Auto-play behavior
│   │       └── credit-management.test.js # Credit logic with state
│   ├── e2e/
│   │   └── slot-machine.spec.js     # Playwright smoke tests
│   ├── fixtures/
│   │   ├── mock-dom.js              # DOM setup helpers
│   │   └── test-config.js           # Fast config for tests
│   └── helpers/
│       ├── game-runner.js           # Test harness for game
│       └── state-assertions.js      # Custom matchers
├── vitest.config.js
└── playwright.config.js
```

---

## Core Testing Patterns

### Pattern 1: State Machine Verification

**Goal**: Assert game transitions through expected states in correct order.

**Approach**: 
1. Instantiate SlotMachine with test config (fast timings)
2. Subscribe to EventBus state:change events
3. Trigger spin cycle
4. Assert event sequence matches expected state flow

**Example**:

```javascript
// tests/unit/slot-machine/game.test.js
import { describe, it, expect, beforeEach, vi } from 'vitest';
import { SlotMachine } from '../../../games/slot-machine/game.js';
import { testConfig } from '../../fixtures/test-config.js';
import { setupMockDOM } from '../../fixtures/mock-dom.js';

describe('SlotMachine State Machine', () => {
  let game;
  let container;
  let stateTransitions;

  beforeEach(() => {
    container = setupMockDOM(); // Creates minimal DOM structure
    stateTransitions = [];
    
    game = new SlotMachine('game-container', {
      ...testConfig,
      spinDuration: 100,      // Fast for tests
      spinInterval: 50,
      cooldownDelay: 50,
    });

    // Capture all state transitions
    game.bus.on('state:change', ({ from, to }) => {
      stateTransitions.push({ from, to });
    });
  });

  it('should transition through states in correct order for winning spin', async () => {
    // Mock RNG to force a win
    vi.spyOn(game, '_selectWinningSymbols').mockReturnValue([
      { name: '🍒', payout: 2 },
      { name: '🍒', payout: 2 },
      { name: '🍒', payout: 2 },
    ]);

    game.start();
    await game.spin();
    await vi.waitFor(() => game.state.phase === 'idle', { timeout: 500 });

    expect(stateTransitions).toEqual([
      { from: 'idle', to: 'spinning' },
      { from: 'spinning', to: 'evaluating' },
      { from: 'evaluating', to: 'celebrating' },
      { from: 'celebrating', to: 'cooldown' },
      { from: 'cooldown', to: 'idle' },
    ]);
  });

  it('should skip celebration state for non-winning spin', async () => {
    vi.spyOn(game, '_selectWinningSymbols').mockReturnValue([
      { name: '🍒', payout: 2 },
      { name: '🍋', payout: 3 },
      { name: '🍊', payout: 5 },
    ]);

    game.start();
    await game.spin();
    await vi.waitFor(() => game.state.phase === 'idle', { timeout: 500 });

    expect(stateTransitions).toEqual([
      { from: 'idle', to: 'spinning' },
      { from: 'spinning', to: 'evaluating' },
      { from: 'evaluating', to: 'cooldown' },
      { from: 'cooldown', to: 'idle' },
    ]);
  });

  it('should expose current state via state property', () => {
    expect(game.state.phase).toBe('idle');
    expect(game.state.credits).toBe(testConfig.initialCredits);
    expect(game.state.running).toBe(false);
  });
});
```

**Key Techniques**:
- Use fast config values to speed up tests
- Spy on RNG methods to control outcomes
- Use `vi.waitFor` to handle async state transitions
- Subscribe to EventBus for observability

---

### Pattern 2: Credit Calculation Testing

**Goal**: Verify credit deduction, payout calculations, and out-of-credits handling.

**Example**:

```javascript
// tests/unit/slot-machine/credit-management.test.js
describe('Credit Management', () => {
  it('should deduct spin cost from credits', async () => {
    const game = new SlotMachine('game-container', {
      ...testConfig,
      initialCredits: 100,
      spinCost: 5,
    });

    const initialCredits = game.state.credits;
    await game.spin();

    expect(game.state.credits).toBe(initialCredits - 5);
  });

  it('should add payout to credits on win', async () => {
    const game = new SlotMachine('game-container', {
      ...testConfig,
      initialCredits: 100,
      spinCost: 1,
    });

    // Force jackpot win (3x 💎 with 100x payout)
    vi.spyOn(game, '_selectWinningSymbols').mockReturnValue([
      { name: '💎', payout: 100 },
      { name: '💎', payout: 100 },
      { name: '💎', payout: 100 },
    ]);

    const initialCredits = game.state.credits;
    await game.spin();

    // Should deduct spin cost, then add payout
    expect(game.state.credits).toBe(initialCredits - 1 + 100);
    expect(game.state.lastWin).toBe(100);
  });

  it('should stop auto-play when out of credits', async () => {
    const game = new SlotMachine('game-container', {
      ...testConfig,
      initialCredits: 2,
      spinCost: 1,
    });

    game.start(); // Start auto-play
    await vi.waitFor(() => !game.state.running, { timeout: 1000 });

    expect(game.state.credits).toBe(0); // Used both spins
    expect(game.state.running).toBe(false);
    expect(game.state.totalSpins).toBe(2);
  });
});
```

---

### Pattern 3: Event-Driven Integration Testing

**Goal**: Verify multi-module interactions through EventBus communication.

**Example**:

```javascript
// tests/integration/slot-machine/spin-cycle.test.js
import { describe, it, expect, beforeEach, vi } from 'vitest';
import { SlotMachine } from '../../../games/slot-machine/game.js';
import { testConfig } from '../../fixtures/test-config.js';

describe('Spin Cycle Integration', () => {
  let game;
  let events;

  beforeEach(() => {
    setupMockDOM();
    game = new SlotMachine('game-container', testConfig);
    events = [];

    // Capture all events for verification
    const eventTypes = [
      'game:start', 'game:stop', 'game:reset',
      'spin:start', 'reel:stopped', 'reels:allStopped',
      'win', 'state:change'
    ];
    
    eventTypes.forEach(type => {
      game.bus.on(type, (data) => {
        events.push({ type, data, timestamp: performance.now() });
      });
    });
  });

  it('should emit events in correct sequence for full spin', async () => {
    game.start();
    await game.spin();
    await vi.waitFor(() => game.state.phase === 'idle');

    const eventSequence = events.map(e => e.type);
    expect(eventSequence).toEqual([
      'game:start',
      'spin:start',
      'state:change',      // idle → spinning
      'reel:stopped',      // reel 0
      'reel:stopped',      // reel 1
      'reel:stopped',      // reel 2
      'reels:allStopped',
      'state:change',      // spinning → evaluating
      'state:change',      // evaluating → cooldown (or celebrating if win)
      'state:change',      // cooldown → idle
    ]);
  });

  it('should stagger reel stops by configured delay', async () => {
    const reelStopDelay = 300;
    game.config.reelStopDelay = reelStopDelay;

    game.start();
    await game.spin();
    await vi.waitFor(() => game.state.phase === 'idle');

    const reelStops = events.filter(e => e.type === 'reel:stopped');
    expect(reelStops).toHaveLength(3);

    // Verify timing between stops (allow ±50ms tolerance)
    const timeBetween1and2 = reelStops[1].timestamp - reelStops[0].timestamp;
    const timeBetween2and3 = reelStops[2].timestamp - reelStops[1].timestamp;

    expect(timeBetween1and2).toBeGreaterThanOrEqual(reelStopDelay - 50);
    expect(timeBetween1and2).toBeLessThanOrEqual(reelStopDelay + 50);
    expect(timeBetween2and3).toBeGreaterThanOrEqual(reelStopDelay - 50);
    expect(timeBetween2and3).toBeLessThanOrEqual(reelStopDelay + 50);
  });

  it('should emit win event with correct payout data', async () => {
    vi.spyOn(game, '_selectWinningSymbols').mockReturnValue([
      { name: '7️⃣', payout: 10 },
      { name: '7️⃣', payout: 10 },
      { name: '7️⃣', payout: 10 },
    ]);

    game.start();
    await game.spin();
    await vi.waitFor(() => game.state.phase === 'idle');

    const winEvent = events.find(e => e.type === 'win');
    expect(winEvent).toBeDefined();
    expect(winEvent.data.amount).toBe(10); // 10x payout * 1 spin cost
    expect(winEvent.data.symbols).toHaveLength(3);
    expect(winEvent.data.symbols[0].name).toBe('7️⃣');
  });
});
```

---

### Pattern 4: Reel Physics Testing

**Goal**: Test reel animation behavior without actual DOM rendering.

**Approach**:
- Mock `requestAnimationFrame` with Vitest's timer mocking
- Verify position updates occur according to physics
- Test stop sequence (spin → decelerate → bounce → settle)

**Example**:

```javascript
// tests/unit/slot-machine/reel.test.js
import { describe, it, expect, beforeEach, vi } from 'vitest';
import { Reel } from '../../../games/slot-machine/reel.js';
import { testConfig } from '../../fixtures/test-config.js';

describe('Reel Physics', () => {
  let container;
  let reel;

  beforeEach(() => {
    // Create minimal container
    container = document.createElement('div');
    container.id = 'reel-0';
    document.body.appendChild(container);

    reel = new Reel(container, 0, testConfig);
  });

  it('should initialize in idle phase', () => {
    expect(reel.phase).toBe('idle');
    expect(reel.position).toBe(0);
    expect(reel.speed).toBe(0);
  });

  it('should transition to spinning phase when spin() called', () => {
    reel.spin();
    expect(reel.phase).toBe('spinning');
  });

  it('should accept a target symbol via stopAt()', async () => {
    const targetSymbol = { name: '🍒', displayName: 'Cherry' };
    let stopped = false;

    reel.spin();
    reel.stopAt(targetSymbol, () => {
      stopped = true;
    });

    await vi.waitFor(() => stopped, { timeout: 1000 });
    expect(reel.phase).toBe('stopped');
    expect(reel._result).toEqual(targetSymbol);
  });

  it('should go through deceleration phases: decelerating → bouncing → stopped', async () => {
    const phases = [];
    const originalSetPhase = reel._setPhase;
    
    vi.spyOn(reel, '_setPhase').mockImplementation((phase) => {
      phases.push(phase);
      originalSetPhase.call(reel, phase);
    });

    reel.spin();
    reel.stopAt({ name: '🍋' }, () => {});

    await vi.waitFor(() => reel.phase === 'stopped', { timeout: 1000 });

    expect(phases).toContainEqual('spinning');
    expect(phases).toContainEqual('decelerating');
    expect(phases).toContainEqual('bouncing');
    expect(phases).toContainEqual('stopped');
  });
});
```

---

## Test Fixtures & Helpers

### Mock DOM Setup

```javascript
// tests/fixtures/mock-dom.js
/**
 * Create minimal DOM structure for game tests.
 * Avoids need for full index.html in unit tests.
 */
export function setupMockDOM() {
  document.body.innerHTML = `
    <div id="game-container">
      <div id="status" role="status" aria-live="polite"></div>
      <div class="reels">
        <div id="reel-0" class="reel"></div>
        <div id="reel-1" class="reel"></div>
        <div id="reel-2" class="reel"></div>
      </div>
      <div class="stats">
        <span id="credits">100</span>
        <span id="last-win">0</span>
      </div>
      <div class="controls">
        <button id="start-btn">Start</button>
        <button id="stop-btn">Stop</button>
        <button id="reset-btn">Reset</button>
      </div>
    </div>
  `;

  return document.getElementById('game-container');
}

/**
 * Clean up DOM after each test.
 */
export function cleanupMockDOM() {
  document.body.innerHTML = '';
}
```

### Fast Test Config

```javascript
// tests/fixtures/test-config.js
import { config } from '../../games/slot-machine/config.js';

/**
 * Test configuration with fast timings.
 * Maintains same behavior as production but runs 10x faster.
 */
export const testConfig = {
  ...config,
  spinAcceleration: 20,    // 200ms → 20ms
  spinDuration: 100,       // 2000ms → 100ms
  reelStopDelay: 30,       // 300ms → 30ms
  decelerationBounce: 15,  // 150ms → 15ms
  symbolSettle: 10,        // 100ms → 10ms
  patternDetection: 20,    // 200ms → 20ms
  cooldownDelay: 50,       // 2000ms → 50ms
  spinInterval: 50,        // 3000ms → 50ms
};
```

### Custom Assertions

```javascript
// tests/helpers/state-assertions.js
import { expect } from 'vitest';

/**
 * Assert game is in expected phase.
 */
export function expectPhase(game, expectedPhase) {
  expect(game.state.phase).toBe(expectedPhase);
}

/**
 * Assert credit balance matches expected value.
 */
export function expectCredits(game, expectedCredits) {
  expect(game.state.credits).toBe(expectedCredits);
}

/**
 * Wait for game to reach specific phase.
 */
export async function waitForPhase(game, phase, timeout = 1000) {
  const start = Date.now();
  while (game.state.phase !== phase) {
    if (Date.now() - start > timeout) {
      throw new Error(`Timeout waiting for phase "${phase}". Current: "${game.state.phase}"`);
    }
    await new Promise(resolve => setTimeout(resolve, 10));
  }
}
```

### Game Test Harness

```javascript
// tests/helpers/game-runner.js
import { SlotMachine } from '../../games/slot-machine/game.js';
import { setupMockDOM, cleanupMockDOM } from '../fixtures/mock-dom.js';
import { testConfig } from '../fixtures/test-config.js';

/**
 * Test harness for SlotMachine with event collection,
 * state snapshots, and controlled RNG.
 */
export class GameTestHarness {
  constructor(customConfig = {}) {
    setupMockDOM();
    
    this.config = { ...testConfig, ...customConfig };
    this.game = new SlotMachine('game-container', this.config);
    
    this.events = [];
    this.stateSnapshots = [];
    
    this._captureAllEvents();
    this._captureStateTransitions();
  }

  _captureAllEvents() {
    const eventTypes = [
      'game:start', 'game:stop', 'game:reset',
      'spin:start', 'reel:stopped', 'reels:allStopped',
      'win', 'state:change'
    ];
    
    eventTypes.forEach(type => {
      this.game.bus.on(type, (data) => {
        this.events.push({ 
          type, 
          data, 
          timestamp: performance.now(),
          gameState: { ...this.game.state }
        });
      });
    });
  }

  _captureStateTransitions() {
    this.game.bus.on('state:change', ({ from, to }) => {
      this.stateSnapshots.push({
        from,
        to,
        credits: this.game.state.credits,
        lastWin: this.game.state.lastWin,
        totalSpins: this.game.state.totalSpins,
        timestamp: performance.now()
      });
    });
  }

  /**
   * Force specific symbols to appear on next spin.
   */
  setNextResult(symbols) {
    vi.spyOn(this.game, '_selectWinningSymbols').mockReturnValueOnce(symbols);
  }

  /**
   * Get all events of a specific type.
   */
  getEvents(type) {
    return this.events.filter(e => e.type === type);
  }

  /**
   * Get the sequence of phase transitions.
   */
  getPhaseSequence() {
    return this.stateSnapshots.map(s => s.to);
  }

  /**
   * Clean up after test.
   */
  destroy() {
    this.game.destroy();
    cleanupMockDOM();
  }
}
```

**Usage Example**:

```javascript
import { GameTestHarness } from '../../helpers/game-runner.js';

describe('Game Test Harness', () => {
  let harness;

  beforeEach(() => {
    harness = new GameTestHarness();
  });

  afterEach(() => {
    harness.destroy();
  });

  it('should provide easy access to events', async () => {
    harness.setNextResult([
      { name: '🍒', payout: 2 },
      { name: '🍒', payout: 2 },
      { name: '🍒', payout: 2 },
    ]);

    harness.game.start();
    await harness.game.spin();

    const winEvents = harness.getEvents('win');
    expect(winEvents).toHaveLength(1);
    expect(winEvents[0].data.amount).toBe(2);
  });

  it('should capture phase sequence', async () => {
    harness.game.start();
    await harness.game.spin();
    await waitForPhase(harness.game, 'idle');

    const phases = harness.getPhaseSequence();
    expect(phases[0]).toBe('spinning');
    expect(phases[phases.length - 1]).toBe('idle');
  });
});
```

---

## Configuration Files

### vitest.config.js

```javascript
import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    // Use happy-dom for browser API simulation
    environment: 'happy-dom',
    
    // Test file patterns
    include: ['tests/**/*.test.js', 'tests/**/*.spec.js'],
    exclude: ['tests/e2e/**'],
    
    // Coverage configuration
    coverage: {
      provider: 'v8',
      reporter: ['text', 'html', 'lcov'],
      include: ['games/**/*.js', 'shared/**/*.js'],
      exclude: [
        '**/*.config.js',
        '**/*.test.js',
        'tests/**',
      ],
      thresholds: {
        lines: 80,
        functions: 80,
        branches: 75,
        statements: 80,
      },
    },
    
    // Globals (optional, prefer explicit imports)
    globals: false,
    
    // Timeout for async tests
    testTimeout: 5000,
    
    // Setup files
    setupFiles: ['./tests/setup.js'],
  },
});
```

### tests/setup.js

```javascript
/**
 * Global test setup.
 * Runs once before all tests.
 */
import { vi } from 'vitest';

// Mock performance.now() for consistent timing tests
vi.spyOn(performance, 'now').mockImplementation(() => Date.now());

// Suppress console logs in tests (unless debugging)
if (!process.env.DEBUG) {
  global.console = {
    ...console,
    log: vi.fn(),
    debug: vi.fn(),
  };
}
```

---

## E2E Testing (Playwright)

For smoke tests that verify the game works in a real browser:

### playwright.config.js

```javascript
import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './tests/e2e',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: 'html',
  
  use: {
    baseURL: 'http://localhost:3000',
    trace: 'on-first-retry',
  },

  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
    {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'] },
    },
    {
      name: 'webkit',
      use: { ...devices['Desktop Safari'] },
    },
  ],

  webServer: {
    command: 'python -m http.server 3000',
    url: 'http://localhost:3000',
    reuseExistingServer: !process.env.CI,
  },
});
```

### tests/e2e/slot-machine.spec.js

```javascript
import { test, expect } from '@playwright/test';

test.describe('Slot Machine E2E', () => {
  test('should load and display game UI', async ({ page }) => {
    await page.goto('/games/slot-machine/');

    await expect(page.locator('#game-container')).toBeVisible();
    await expect(page.locator('#start-btn')).toBeEnabled();
    await expect(page.locator('#credits')).toHaveText('100');
  });

  test('should start game and complete spin cycle', async ({ page }) => {
    await page.goto('/games/slot-machine/');

    // Click start button
    await page.click('#start-btn');
    await expect(page.locator('#status')).toContainText('Auto-playing');

    // Wait for at least one spin to complete
    await page.waitForTimeout(3000);

    // Verify credits changed
    const credits = await page.locator('#credits').textContent();
    expect(parseInt(credits)).toBeLessThan(100);
  });

  test('should respond to keyboard shortcuts', async ({ page }) => {
    await page.goto('/games/slot-machine/');

    // Press spacebar to start
    await page.keyboard.press('Space');
    await expect(page.locator('#status')).toContainText('Auto-playing');

    // Press Escape to stop
    await page.keyboard.press('Escape');
    await expect(page.locator('#status')).toContainText('Stopped');
  });
});
```

---

## CI/CD Integration

### GitHub Actions Workflow

```yaml
# .github/workflows/test.yml
name: Test

on:
  push:
    branches: [main, develop]
  pull_request:
    branches: [main]

jobs:
  unit-tests:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      
      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '18'
          cache: 'npm'
      
      - name: Install dependencies
        run: npm ci
      
      - name: Run unit tests
        run: npm run test:unit
      
      - name: Generate coverage report
        run: npm run test:coverage
      
      - name: Upload coverage to Codecov
        uses: codecov/codecov-action@v3
        with:
          files: ./coverage/lcov.info

  e2e-tests:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      
      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '18'
          cache: 'npm'
      
      - name: Install dependencies
        run: npm ci
      
      - name: Install Playwright Browsers
        run: npx playwright install --with-deps
      
      - name: Run E2E tests
        run: npm run test:e2e
      
      - name: Upload Playwright Report
        uses: actions/upload-artifact@v3
        if: always()
        with:
          name: playwright-report
          path: playwright-report/
          retention-days: 30
```

---

## Implementation Roadmap

### Phase 1: Setup & Unit Tests (Priority 1)

**Effort**: 4-6 hours

- [ ] Install Vitest: `npm install -D vitest happy-dom @vitest/ui`
- [ ] Create vitest.config.js
- [ ] Create test fixtures (mock-dom.js, test-config.js)
- [ ] Write unit tests for:
  - EventBus (events.test.js)
  - Random utilities (random.test.js)
  - Animation helpers (animation.test.js)
- [ ] Write game.test.js (state machine tests)
- [ ] Run and validate: `npm run test`

**Acceptance Criteria**:
- All unit tests pass
- Test execution < 100ms total
- Coverage > 70% for shared utilities

---

### Phase 2: Integration Tests (Priority 2)

**Effort**: 3-4 hours

- [ ] Create GameTestHarness helper
- [ ] Write spin-cycle.test.js (full lifecycle)
- [ ] Write credit-management.test.js
- [ ] Write reel.test.js (physics behavior)
- [ ] Add coverage reporting

**Acceptance Criteria**:
- Integration tests pass
- Event sequencing verified
- Timing tolerances validated (±50ms)
- Coverage > 80% for game.js and reel.js

---

### Phase 3: E2E & CI (Priority 3)

**Effort**: 4-5 hours

- [ ] Install Playwright: `npm install -D @playwright/test`
- [ ] Create playwright.config.js
- [ ] Write smoke tests (slot-machine.spec.js)
- [ ] Create GitHub Actions workflow
- [ ] Configure coverage reporting (Codecov)
- [ ] Add npm scripts to package.json

**Acceptance Criteria**:
- E2E tests pass in Chrome/Firefox/Safari
- CI pipeline runs on pull requests
- Coverage badge visible in README

---

## Development Workflow

### Running Tests Locally

```bash
# Run all unit/integration tests
npm run test

# Run in watch mode (during development)
npm run test:watch

# Run with coverage report
npm run test:coverage

# Run E2E tests
npm run test:e2e

# Run E2E tests in headed mode (see browser)
npm run test:e2e:headed
```

### package.json Scripts

```json
{
  "scripts": {
    "test": "vitest run",
    "test:watch": "vitest",
    "test:ui": "vitest --ui",
    "test:coverage": "vitest run --coverage",
    "test:unit": "vitest run --exclude tests/e2e",
    "test:e2e": "playwright test",
    "test:e2e:headed": "playwright test --headed",
    "test:e2e:debug": "playwright test --debug"
  }
}
```

---

## Edge Cases & Considerations

### 1. Timing-Sensitive Tests

**Issue**: Tests with `setTimeout`/`requestAnimationFrame` may be flaky.

**Solution**:
- Use Vitest's `vi.useFakeTimers()` for deterministic timing
- Use `vi.waitFor()` with generous timeouts (500ms+)
- Test config uses 10x faster timings to reduce test time

### 2. RNG Determinism

**Issue**: Random symbol selection makes outcome unpredictable.

**Solution**:
- Mock `weightedRandom()` return values for specific tests
- Use GameTestHarness `.setNextResult()` helper
- Test RNG utilities separately with seeded values

### 3. DOM Dependencies

**Issue**: Game requires real DOM elements.

**Solution**:
- Use happy-dom (lightweight DOM simulation)
- Create minimal mock DOM (setupMockDOM fixture)
- Avoid testing visual styling; focus on DOM structure

### 4. EventBus Testing

**Issue**: Events may fire before test listener attached.

**Solution**:
- Attach listeners in `beforeEach` before creating game
- Use `.once()` for events that fire during construction
- GameTestHarness captures events automatically

### 5. Async State Verification

**Issue**: State changes happen asynchronously.

**Solution**:
- Use `vi.waitFor()` to poll for expected state
- Use EventBus events as synchronization points
- Provide generous timeouts (500ms+) for CI environments

---

## Success Metrics

| Metric | Target | Current |
|--------|--------|---------|
| Unit test coverage | > 80% | N/A |
| Integration test coverage | > 70% | N/A |
| E2E test count | 5+ smoke tests | N/A |
| Unit test execution time | < 200ms | N/A |
| Integration test execution time | < 500ms | N/A |
| E2E test execution time | < 30s | N/A |
| Flaky test rate | < 1% | N/A |
| CI pipeline duration | < 5 minutes | N/A |

---

## Future Enhancements

### Phase 4: Visual Regression Testing

- Use Playwright screenshots + Percy/Chromatic
- Verify symbol rendering, animations, particle effects
- Catch CSS regression issues

### Phase 5: Performance Testing

- Measure frame rate during spin cycles
- Memory leak detection
- Long-running auto-play stability

### Phase 6: Accessibility Testing

- Axe-core integration
- Keyboard navigation verification
- Screen reader compatibility

---

## References

- [Vitest Documentation](https://vitest.dev/)
- [Playwright Documentation](https://playwright.dev/)
- [TECHNICAL_PLAN_SLOT_MACHINE.md](./TECHNICAL_PLAN_SLOT_MACHINE.md) — Original requirements
- [PHASE_1_NOTES.md](./PHASE_1_NOTES.md) — Quality gates and open questions

---

## Appendix: Complete Test Example

```javascript
// tests/integration/slot-machine/complete-spin.test.js
import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { GameTestHarness } from '../../helpers/game-runner.js';
import { waitForPhase } from '../../helpers/state-assertions.js';

describe('Complete Spin Cycle - Integration', () => {
  let harness;

  beforeEach(() => {
    harness = new GameTestHarness({
      initialCredits: 100,
      spinCost: 5,
    });
  });

  afterEach(() => {
    harness.destroy();
  });

  it('should complete full winning spin with correct state and events', async () => {
    // ARRANGE: Force a win
    const winSymbol = { name: '🍊', payout: 5 };
    harness.setNextResult([winSymbol, winSymbol, winSymbol]);

    const initialCredits = harness.game.state.credits;

    // ACT: Start game and trigger spin
    harness.game.start();
    await harness.game.spin();
    await waitForPhase(harness.game, 'idle');

    // ASSERT: State
    expect(harness.game.state.phase).toBe('idle');
    expect(harness.game.state.credits).toBe(initialCredits - 5 + 25); // -5 spin cost, +25 win
    expect(harness.game.state.lastWin).toBe(25);
    expect(harness.game.state.totalSpins).toBe(1);

    // ASSERT: Events
    const phaseSequence = harness.getPhaseSequence();
    expect(phaseSequence).toEqual([
      'spinning',
      'evaluating',
      'celebrating',
      'cooldown',
      'idle'
    ]);

    const winEvents = harness.getEvents('win');
    expect(winEvents).toHaveLength(1);
    expect(winEvents[0].data.amount).toBe(25);
    expect(winEvents[0].data.symbols).toHaveLength(3);

    const reelStops = harness.getEvents('reel:stopped');
    expect(reelStops).toHaveLength(3);

    // ASSERT: Timing
    const timeBetweenStops1 = reelStops[1].timestamp - reelStops[0].timestamp;
    const timeBetweenStops2 = reelStops[2].timestamp - reelStops[1].timestamp;
    
    const expectedDelay = harness.config.reelStopDelay;
    expect(timeBetweenStops1).toBeGreaterThanOrEqual(expectedDelay - 10);
    expect(timeBetweenStops1).toBeLessThanOrEqual(expectedDelay + 10);
    expect(timeBetweenStops2).toBeGreaterThanOrEqual(expectedDelay - 10);
    expect(timeBetweenStops2).toBeLessThanOrEqual(expectedDelay + 10);
  });

  it('should handle losing spin correctly', async () => {
    // ARRANGE: Force a loss
    harness.setNextResult([
      { name: '🍒', payout: 2 },
      { name: '🍋', payout: 3 },
      { name: '🍊', payout: 5 },
    ]);

    const initialCredits = harness.game.state.credits;

    // ACT
    harness.game.start();
    await harness.game.spin();
    await waitForPhase(harness.game, 'idle');

    // ASSERT: State
    expect(harness.game.state.credits).toBe(initialCredits - 5); // Only spin cost deducted
    expect(harness.game.state.lastWin).toBe(0);

    // ASSERT: No celebration phase
    const phaseSequence = harness.getPhaseSequence();
    expect(phaseSequence).not.toContain('celebrating');
    expect(phaseSequence).toEqual([
      'spinning',
      'evaluating',
      'cooldown',
      'idle'
    ]);

    // ASSERT: No win event
    const winEvents = harness.getEvents('win');
    expect(winEvents).toHaveLength(0);
  });
});
```

---

**End of Document**
