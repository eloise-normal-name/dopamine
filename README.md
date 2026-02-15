# 🎮 Dopamine

Auto-playing web games that are fun to watch! A collection of browser-based games (slot machines, gacha, etc.) that run automatically, creating engaging visual experiences.

## 🎯 Project Goals

- **Auto-play**: Games run automatically with minimal user interaction
- **Web-based**: Pure HTML/CSS/JavaScript, no build step required
- **Minimal dependencies**: Vanilla JavaScript, lightweight and fast
- **Visual appeal**: Fun animations and effects to watch
- **Modular**: Each game is self-contained with shared utilities

## 🎲 Games

### Available Now
- **🎰 Slot Machine** - Classic 3-reel slot machine with auto-spin ([Play](games/slot-machine/index.html))

### Coming Soon
- **🎁 Gacha** - Capsule toy/loot box simulation
- **🎲 Dice Roll** - Endless dice rolling with probability visualization
- **🃏 Card Flip** - Self-playing memory card game

## 🗺️ Development Milestones

### Phase 1: Foundation ✅
- [x] Project structure and documentation
- [x] Common CSS framework
- [x] Landing page
- [x] Single slot machine game

### Phase 2: Core Games 🚧
- [ ] Gacha/loot box game
- [ ] Dice rolling game
- [ ] Card flip memory game
- [ ] Shared utilities library (random, animation, audio)

### Phase 3: Enhanced Features
- [ ] Sound effects and music
- [ ] Visual particle effects
- [ ] Advanced animations
- [ ] Mobile optimizations

### Phase 4: Dashboard & Analytics
- [ ] Game statistics dashboard
- [ ] Play history tracking
- [ ] Achievement system
- [ ] User preferences

### Phase 5: Polish & Distribution
- [ ] Progressive Web App (PWA) support
- [ ] Offline functionality
- [ ] Performance optimizations
- [ ] Comprehensive testing

## 🚀 Getting Started

1. Clone the repository:
   ```bash
   git clone https://github.com/eloise-normal-name/dopamine.git
   cd dopamine
   ```

2. Open in browser:
   ```bash
   # Just open index.html in your browser!
   open index.html
   # or use a simple HTTP server:
   python -m http.server 8000
   ```

3. Start playing:
   - Visit `http://localhost:8000` (if using server)
   - Or simply open `index.html` directly
   - Click on a game to start

No build step, no dependencies to install!

## 🚀 Deployment

### GitHub Pages (Recommended)

The easiest way to deploy Dopamine is using GitHub Pages since it's a static site with no build step:

1. **Enable GitHub Pages**:
   - Go to your repository settings
   - Navigate to "Pages" section
   - Under "Source", select the branch you want to deploy (e.g., `main`)
   - Click "Save"

2. **Access your site**:
   - Your site will be available at: `https://[username].github.io/dopamine/`
   - Games will work immediately with no additional configuration

3. **Custom domain (optional)**:
   - Add a `CNAME` file to the root with your domain
   - Configure DNS settings with your domain provider
   - Enable "Enforce HTTPS" in GitHub Pages settings

### Alternative Deployment Options

Since Dopamine is a static site with no dependencies, it can be deployed anywhere:

- **Netlify**: Drag and drop the folder or connect your GitHub repo
- **Vercel**: Connect your repository for automatic deployments
- **GitHub Codespaces**: Open and run instantly in the browser
- **Any static host**: Upload files via FTP/SFTP to any web server

### Local Development Server

For local testing, use any static file server:

```bash
# Python (built-in)
python -m http.server 8000

# Node.js (if you have it)
npx serve

# PHP (built-in)
php -S localhost:8000
```

No build, bundling, or transpilation needed! 🎉

## 📁 Project Structure

```
dopamine/
├── index.html              # Main landing page
├── games/                  # Individual game implementations
│   ├── slot-machine/       # Slot machine game
│   └── gacha/              # Gacha game (coming soon)
├── shared/                 # Shared utilities and components
│   ├── utils/              # Utility functions
│   └── components/         # Reusable UI components
├── assets/                 # Static assets
│   ├── images/             # Images and sprites
│   ├── sounds/             # Sound effects
│   └── styles/             # Global CSS
├── docs/                   # Documentation
│   ├── GAME_DEVELOPMENT.md # Game development guide
│   └── API.md              # API reference
├── ARCHITECTURE.md         # Architecture overview
└── CONTRIBUTING.md         # Contributing guidelines
```

## 📚 Documentation

- **[Architecture Overview](ARCHITECTURE.md)** - System design and principles
- **[Contributing Guide](CONTRIBUTING.md)** - How to add new games
- **[Game Development](docs/GAME_DEVELOPMENT.md)** - Detailed development guide
- **[API Reference](docs/API.md)** - Shared utilities documentation

## 🛠️ Technology Stack

- **HTML5** - Structure and Canvas API
- **CSS3** - Styling and animations
- **Vanilla JavaScript (ES6+)** - Game logic
- **No build tools** - Direct browser execution
- **No frameworks** - Lightweight and simple

## 🤝 Contributing

We welcome contributions! Whether you want to:
- Add a new game
- Improve existing games
- Add shared utilities
- Improve documentation
- Report bugs

See [CONTRIBUTING.md](CONTRIBUTING.md) for details.

## 📝 License

This project is open source and available under the MIT License.

## 🎨 Game Ideas

Want to contribute? Here are some ideas:
- Plinko board simulation
- Wheel of fortune spinner
- Pachinko machine
- Card shuffling visualizer
- Lottery number generator
- Scratch card simulator

## 🌟 Features

- ✅ Pure browser-based (no plugins)
- ✅ Auto-play capability
- ✅ Responsive design
- ✅ Minimal dependencies
- ✅ Modular architecture
- ✅ Well-documented
- ✅ Accessibility features (reduced motion, focus styles, ARIA)
- ⏳ PWA support (planned)
- ⏳ Sound effects (planned)
- ⏳ Advanced animations (planned)
