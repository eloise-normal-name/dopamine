# Architecture Overview

## Project Purpose
Dopamine is a collection of auto-playing web games (slot machines, gacha, etc.) that are fun to watch. Games run automatically in the browser with minimal user interaction required.

## Core Principles
- **Web-based**: All games run in modern browsers without plugins
- **Minimal dependencies**: Prefer vanilla JavaScript, minimal external libraries
- **Auto-play**: Games execute automatically, creating engaging visual experiences
- **Modular**: Each game is self-contained but shares common utilities

## Directory Structure

```
dopamine/
├── games/              # Individual game implementations
│   ├── slot-machine/   # Slot machine game
│   └── gacha/          # Gacha/loot box game
├── shared/             # Shared code across games
│   ├── utils/          # Utility functions (random, animation, etc.)
│   └── components/     # Reusable UI components
├── assets/             # Static assets
│   ├── images/         # Images and sprites
│   ├── sounds/         # Sound effects and music
│   └── styles/         # Global CSS/styling
├── docs/               # Documentation
└── index.html          # Main entry point
```

## Game Structure
Each game in the `/games` directory follows a standard structure:
- `index.html` - Game entry point
- `game.js` - Game logic
- `styles.css` - Game-specific styles
- `README.md` - Game documentation
- `config.js` - Game configuration (speeds, probabilities, etc.)

## Technology Stack
- **HTML5** - Structure and Canvas API for graphics
- **CSS3** - Styling and animations
- **Vanilla JavaScript (ES6+)** - Game logic
- **Optional**: Minimal libraries only when absolutely necessary

## Shared Utilities
The `/shared` directory contains:
- **Animation helpers** - Easing functions, requestAnimationFrame wrappers
- **Random number generators** - Weighted random, shuffle algorithms
- **Game loop** - Standard game loop implementation
- **Event system** - Simple pub/sub for game events
- **Audio manager** - Sound effect and music playback

## Future Considerations
- Progressive Web App (PWA) support
- Local storage for preferences
- Performance optimization for mobile devices
- Accessibility features (reduced motion, screen reader support)
