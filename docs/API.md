# API Reference

> **Note**: This API reference describes the planned shared utilities. Many are not yet implemented. See `/shared/README.md` for current status. The slot machine game currently implements its own utilities inline.

## Shared Utilities (🚧 Planned)

### Random (`/shared/utils/random.js`)

#### `randomInt(min, max)`
Returns a random integer between min and max (inclusive).

**Parameters:**
- `min` (number) - Minimum value
- `max` (number) - Maximum value

**Returns:** number

**Example:**
```javascript
const dice = randomInt(1, 6); // Returns 1-6
```

#### `randomFloat(min, max)`
Returns a random float between min and max.

**Parameters:**
- `min` (number) - Minimum value
- `max` (number) - Maximum value

**Returns:** number

**Example:**
```javascript
const speed = randomFloat(0.5, 1.5);
```

#### `weightedRandom(items)`
Selects a random item based on weights.

**Parameters:**
- `items` (Array) - Array of objects with `value` and `weight` properties

**Returns:** any (the value of selected item)

**Example:**
```javascript
const result = weightedRandom([
  { value: 'common', weight: 70 },
  { value: 'rare', weight: 25 },
  { value: 'legendary', weight: 5 }
]);
```

#### `shuffle(array)`
Randomly shuffles an array using Fisher-Yates algorithm.

**Parameters:**
- `array` (Array) - Array to shuffle

**Returns:** Array (new shuffled array)

**Example:**
```javascript
const deck = shuffle([1, 2, 3, 4, 5]);
```

---

### Animation (`/shared/utils/animation.js`)

#### `animate(options)`
Creates a smooth animation.

**Parameters:**
- `options` (Object)
  - `duration` (number) - Animation duration in ms
  - `easing` (string|function) - Easing function name or custom function
  - `onUpdate` (function) - Called each frame with progress (0-1)
  - `onComplete` (function) - Called when animation completes

**Returns:** Object with `cancel()` method

**Example:**
```javascript
const anim = animate({
  duration: 1000,
  easing: 'easeInOut',
  onUpdate: (progress) => {
    element.style.opacity = progress;
  },
  onComplete: () => {
    console.log('Done!');
  }
});

// Cancel if needed
anim.cancel();
```

#### Easing Functions
- `linear` - Constant speed
- `easeIn` - Slow start, fast end
- `easeOut` - Fast start, slow end
- `easeInOut` - Slow start and end, fast middle
- `easeInQuad`, `easeOutQuad`, `easeInOutQuad` - Quadratic easing
- `easeInCubic`, `easeOutCubic`, `easeInOutCubic` - Cubic easing

---

### Game Loop (`/shared/utils/gameloop.js`)

#### `GameLoop(updateFn, renderFn)`
Creates a standard game loop.

**Parameters:**
- `updateFn` (function) - Update function called with deltaTime
- `renderFn` (function) - Render function called each frame

**Methods:**
- `start()` - Start the loop
- `stop()` - Stop the loop
- `isRunning()` - Check if running

**Example:**
```javascript
const loop = new GameLoop(
  (dt) => game.update(dt),
  () => game.render()
);

loop.start();
```

---

### Audio Manager (`/shared/utils/audio.js`)

#### `AudioManager(options)`
Manages game audio playback.

**Parameters:**
- `options` (Object)
  - `volume` (number) - Master volume (0-1), default: 1
  - `muted` (boolean) - Initial mute state, default: false

**Methods:**

##### `loadSound(name, url)`
Loads a sound file.

**Parameters:**
- `name` (string) - Sound identifier
- `url` (string) - Path to audio file

**Returns:** Promise

##### `playSound(name, options)`
Plays a loaded sound.

**Parameters:**
- `name` (string) - Sound identifier
- `options` (Object) - Optional
  - `volume` (number) - Sound-specific volume (0-1)
  - `loop` (boolean) - Loop the sound

**Returns:** Audio element

##### `stopSound(name)`
Stops a playing sound.

##### `setVolume(volume)`
Sets master volume (0-1).

##### `mute()` / `unmute()`
Mutes/unmutes all audio.

**Example:**
```javascript
const audio = new AudioManager({ volume: 0.7 });

await audio.loadSound('spin', '/assets/sounds/spin.mp3');
await audio.loadSound('win', '/assets/sounds/win.mp3');

audio.playSound('spin');
audio.playSound('win', { volume: 1.0 });
```

---

### Event System (`/shared/utils/events.js`)

#### `EventEmitter()`
Simple pub/sub event system.

**Methods:**

##### `on(event, callback)`
Subscribe to an event.

**Parameters:**
- `event` (string) - Event name
- `callback` (function) - Handler function

**Returns:** function (unsubscribe function)

##### `emit(event, data)`
Emit an event.

**Parameters:**
- `event` (string) - Event name
- `data` (any) - Event data

##### `off(event, callback)`
Unsubscribe from an event.

**Example:**
```javascript
// PLANNED UTILITY - See /shared/README.md for status
// EventEmitter will be available in /shared/utils/events.js

import { EventEmitter } from '../../shared/utils/events.js';

class Game extends EventEmitter {
  win(amount) {
    this.emit('win', { amount });
  }
}

const game = new Game();
const unsubscribe = game.on('win', ({ amount }) => {
  console.log(`Won ${amount}!`);
});

game.win(50); // Logs: "Won 50!"
unsubscribe(); // Stop listening
```

---

## Components (`/shared/components/`)

### Counter Display
Visual counter component with smooth animations.

### Reel
Spinning reel component for slot machines.

### Particle System
Visual effects system for wins, explosions, etc.

### Progress Bar
Animated progress/loading bar.

---

## Game Base Class

All games should extend or follow this pattern:

```javascript
class Game {
  /**
   * @param {string} containerId - DOM element ID
   * @param {Object} options - Game configuration
   */
  constructor(containerId, options = {}) {}
  
  /**
   * Start auto-play
   */
  start() {}
  
  /**
   * Stop auto-play
   */
  stop() {}
  
  /**
   * Reset game state
   */
  reset() {}
  
  /**
   * Clean up resources
   */
  destroy() {}
}
```

---

## Browser Compatibility

Target: Modern browsers with ES6+ support
- Chrome 60+
- Firefox 60+
- Safari 12+
- Edge 79+

Use feature detection for optional features:
```javascript
if ('IntersectionObserver' in window) {
  // Use IntersectionObserver
}
```
