# Contributing Guide

Thank you for your interest in contributing to Dopamine! This guide will help you understand how to add new games or improve existing ones.

## Getting Started

1. Clone the repository
2. Open `index.html` in a modern web browser
3. No build step required - everything runs directly in the browser!

## Project Philosophy

Dopamine is built on principles of simplicity, visual appeal, and accessibility — creating web games that are fun to watch with minimal dependencies.

👉 **See [DESIGN_PRINCIPLES.md](DESIGN_PRINCIPLES.md) for the complete project philosophy and design beliefs.**

## Adding a New Game

### 1. Create Game Directory
```bash
mkdir -p games/your-game-name
cd games/your-game-name
```

### 2. Required Files
Create these files in your game directory:
- `index.html` - Game page
- `game.js` - Game logic
- `styles.css` - Game styles
- `README.md` - Game documentation
- `config.js` - Configuration (optional)

### 3. Game Structure Template
See `/games/slot-machine/README.md` for a complete example.

Your `game.js` should export a Game class with:
```javascript
class YourGame {
  constructor(containerId, options = {}) {
    // Initialize game
  }
  
  start() {
    // Start auto-play loop
  }
  
  stop() {
    // Stop auto-play
  }
  
  reset() {
    // Reset game state
  }
}
```

### 4. Use Shared Utilities
Import utilities from `/shared/utils/`:
```javascript
import { randomInt, weightedRandom } from '../../shared/utils/random.js';
import { easeInOut } from '../../shared/utils/animation.js';
```

## Code Style

- Use ES6+ features (const/let, arrow functions, classes)
- Use 2-space indentation
- Use meaningful variable names
- Add JSDoc comments for public APIs
- Keep functions small and focused

## Testing

- Test in multiple browsers (Chrome, Firefox, Safari, Edge)
- Test on mobile devices
- Verify auto-play works smoothly
- Check performance (60fps target)
- Test with reduced motion preferences

## Documentation

When adding a game:
1. Update `/docs/GAME_DEVELOPMENT.md` if you add new patterns
2. Document any new shared utilities in `/docs/API.md`
3. Add your game to the main `index.html` menu
4. Include screenshots in your game's README

## Pull Request Process

1. Create a feature branch
2. Make your changes
3. Test thoroughly
4. Update documentation
5. Submit PR with clear description

## Questions?

Open an issue for questions or suggestions!
