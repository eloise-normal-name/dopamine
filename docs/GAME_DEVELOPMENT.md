# Game Development Guide

This guide provides detailed information on developing auto-playing games for Dopamine.

## Game Lifecycle

Every game follows a standard lifecycle:

1. **Initialization** - Set up game state, DOM elements, event listeners
2. **Start** - Begin auto-play loop
3. **Update** - Game logic executes each frame/tick
4. **Render** - Visual updates to the screen
5. **Stop** - Pause auto-play
6. **Reset** - Return to initial state

## Core Concepts

### Auto-Play Loop

Games should run automatically without user interaction. Use `requestAnimationFrame` for smooth animations:

```javascript
class Game {
  constructor() {
    this.running = false;
    this.lastTime = 0;
  }
  
  start() {
    this.running = true;
    this.lastTime = performance.now();
    this.loop();
  }
  
  loop() {
    if (!this.running) return;
    
    const currentTime = performance.now();
    const deltaTime = currentTime - this.lastTime;
    this.lastTime = currentTime;
    
    this.update(deltaTime);
    this.render();
    
    requestAnimationFrame(() => this.loop());
  }
  
  update(dt) {
    // Game logic here
  }
  
  render() {
    // Visual updates here
  }
  
  stop() {
    this.running = false;
  }
}
```

### State Management

Keep game state simple and predictable:

```javascript
class SlotMachine {
  constructor() {
    this.state = {
      spinning: false,
      reels: [0, 0, 0],
      credits: 100,
      lastWin: 0
    };
  }
}
```

### Animation

Use CSS animations for simple effects, JavaScript for complex animations:

```javascript
// CSS approach (preferred for simple animations)
element.classList.add('spinning');

// JavaScript approach (for complex animations)
// NOTE: The animate utility below is PLANNED - not yet implemented
// For now, use setTimeout/requestAnimationFrame directly (see slot-machine/game.js)

/* FUTURE API:
import { animate } from '../../shared/utils/animation.js';

animate({
  duration: 1000,
  easing: 'easeOut',
  onUpdate: (progress) => {
    element.style.transform = `translateY(${progress * 100}px)`;
  }
});
*/
```

### Randomization

Use shared random utilities for consistent behavior:

```javascript
// Note: These utilities are planned for /shared/utils/random.js
// Currently, implement these inline in your game (see slot-machine/game.js for example)

import { randomInt, weightedRandom, shuffle } from '../../shared/utils/random.js';

// Random integer between min and max (inclusive)
const reelPosition = randomInt(0, 9);

// Weighted random selection
const symbol = weightedRandom([
  { value: 'cherry', weight: 40 },
  { value: 'lemon', weight: 30 },
  { value: 'seven', weight: 10 },
  { value: 'jackpot', weight: 1 }
]);

// Shuffle array
const deck = shuffle([1, 2, 3, 4, 5, 6, 7, 8, 9]);
```

## Game Configuration

Separate configuration from logic:

```javascript
// config.js
export const config = {
  // Timing
  spinDuration: 2000,      // ms
  spinInterval: 3000,       // ms between spins
  
  // Probabilities
  symbols: [
    { name: 'cherry', weight: 40, value: 2 },
    { name: 'lemon', weight: 30, value: 3 },
    { name: 'orange', weight: 20, value: 5 },
    { name: 'seven', weight: 9, value: 10 },
    { name: 'jackpot', weight: 1, value: 100 }
  ],
  
  // Visual
  reelCount: 3,
  symbolsPerReel: 10,
  
  // Gameplay
  initialCredits: 100,
  spinCost: 1
};
```

## Visual Design Principles

1. **Clear Feedback** - Player should understand what's happening
2. **Smooth Motion** - 60fps animations
3. **Eye-Catching** - Use colors, effects, and motion strategically
4. **Readable** - Good contrast, legible text
5. **Responsive** - Works on different screen sizes

## Performance Tips

- Use CSS transforms (translateX/Y, scale, rotate) instead of top/left/width/height
- Batch DOM updates
- Use `will-change` CSS property for animated elements
- Debounce/throttle frequent updates
- Cache DOM queries
- Use sprite sheets for images

## Audio Integration

> **Note**: AudioManager is planned but not yet implemented. For now, use the HTML5 Audio API directly.

```javascript
/* FUTURE API:
import { AudioManager } from '../../shared/utils/audio.js';

const audio = new AudioManager();
await audio.loadSound('spin', '/assets/sounds/spin.mp3');
await audio.loadSound('win', '/assets/sounds/win.mp3');

audio.playSound('spin');
*/

// Current approach - use HTML5 Audio directly:
const spinSound = new Audio('/assets/sounds/spin.mp3');
spinSound.play();
```

## Accessibility

- Support keyboard navigation
- Provide ARIA labels
- Respect `prefers-reduced-motion`
- Include text alternatives for visual elements

```javascript
// Check for reduced motion preference
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

if (prefersReducedMotion) {
  // Use instant transitions instead of animations
  this.spinDuration = 0;
}
```

## Examples

See existing game for reference:
- `/games/slot-machine` - Classic slot machine with spinning reels

Planned examples:
- `/games/gacha` - Loot box/capsule toy simulation (coming soon)

## Common Patterns

### Timed Events
```javascript
setTimeout(() => {
  this.checkWin();
}, this.config.spinDuration);
```

### State Transitions
```javascript
setState(newState) {
  this.state = { ...this.state, ...newState };
  this.render();
}
```

### Event Emission
```javascript
this.emit('win', { amount: 50, symbol: 'jackpot' });
```

## Debugging

- Use browser DevTools
- Add visual debug overlays
- Log state changes
- Use `performance.mark()` for profiling

## Next Steps

1. Study existing game implementations
2. Start with a simple game idea
3. Use shared utilities
4. Test across browsers
5. Optimize performance
6. Add polish (sounds, particles, etc.)
