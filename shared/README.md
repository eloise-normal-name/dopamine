# Shared Utilities

This directory contains utility functions and helpers shared across all games.

## Structure

- `utils/` - Utility functions
  - `random.js` - Random number generation and weighted selection
  - `animation.js` - Animation helpers and easing functions
  - `gameloop.js` - Standard game loop implementation
  - `audio.js` - Audio playback management
  - `events.js` - Event emitter/pub-sub system
  
- `components/` - Reusable UI components
  - `counter.js` - Animated counter display
  - `reel.js` - Spinning reel component
  - `particles.js` - Particle effect system
  - `progressbar.js` - Progress bar component

## Usage

Import utilities using ES6 modules:

```javascript
import { randomInt, weightedRandom } from '../../shared/utils/random.js';
import { animate } from '../../shared/utils/animation.js';
```

## Status

🚧 To be implemented as needed by games

## Guidelines

- Keep utilities pure and side-effect free when possible
- Document all public functions with JSDoc
- Write unit tests for complex logic
- Ensure browser compatibility (ES6+ targets)
- Keep dependencies minimal (prefer vanilla JS)

## Future Additions

As games are developed, common patterns will be extracted into shared utilities to avoid code duplication.
