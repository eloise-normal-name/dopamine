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

The easiest way to deploy Dopamine is using GitHub Pages since it's a static site with no build step.

#### Automatic Deployment with GitHub Actions

This repository includes a GitHub Actions workflow (`.github/workflows/static.yml`) that automatically deploys to GitHub Pages:

1. **Enable GitHub Pages**:
   - Go to your repository settings
   - Navigate to "Pages" section
   - Under "Source", select "GitHub Actions"
   - The workflow will automatically deploy when you push to `main`

2. **Access your site**:
   - Your site will be available at: `https://[username].github.io/dopamine/`
   - Games will work immediately with no additional configuration
   - Deployments happen automatically on every push to `main`

3. **Manual Deployment**:
   - You can also trigger deployments manually from the Actions tab
   - Click "Run workflow" on the "Deploy static content to Pages" workflow

#### Alternative: Manual GitHub Pages Setup

If you prefer not to use GitHub Actions:

1. Go to repository settings → Pages
2. Under "Source", select the branch you want to deploy (e.g., `main`)
3. Click "Save"

#### Custom Domain (Optional)

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
│   ├── API.md              # API reference
│   └── design/             # Design documentation
│       ├── NARRATIVES.md   # Game narratives and descriptions
│       ├── REFERENCES.md   # Inspirations and similar games
│       ├── visual/         # Visual design and mockups
│       └── audio/          # Audio design and concepts
├── ARCHITECTURE.md         # Architecture overview
└── CONTRIBUTING.md         # Contributing guidelines
```

## 📚 Documentation

- **[Architecture Overview](ARCHITECTURE.md)** - System design and principles
- **[Contributing Guide](CONTRIBUTING.md)** - How to add new games
- **[Game Development](docs/GAME_DEVELOPMENT.md)** - Detailed development guide
- **[API Reference](docs/API.md)** - Shared utilities documentation
- **[Design Documentation](docs/design/)** - Visual and audio design concepts
  - **[Game Narratives](docs/design/NARRATIVES.md)** - 🌟 Colorful descriptions and emotional goals for each game
  - **[References & Inspirations](docs/design/REFERENCES.md)** - Similar games, design patterns, and their relevance
  - **[Visual Design](docs/design/visual/)** - UI mockups, color palettes, animations
    - **[Slot Machine Iteration 01](docs/design/visual/SLOT_MACHINE_ITERATION_01.md)** - Initial slot narrative/design decisions and sample art
  - **[Audio Design](docs/design/audio/)** - Sound effects, music direction

## 🛠️ Technology Stack

- **HTML5** - Structure and Canvas API
- **CSS3** - Styling and animations
- **Vanilla JavaScript (ES6+)** - Game logic
- **No build tools** - Direct browser execution
- **No frameworks** - Lightweight and simple

## 🎰 Custom GitHub Copilot Agent

This repository includes a custom GitHub Copilot agent: **Boomer Casino Critic** 🎲

A design critic with a boomer personality who's absolutely addicted to casinos and slot machines. Perfect for getting critical design opinions with a gambling twist! They find the slot machine game particularly relaxing and enticing.

**How to use:**
1. Open GitHub Copilot Chat in your IDE or on GitHub
2. Select "Boomer Casino Critic" from the agent picker
3. Ask for design reviews, feedback, or opinions on game features
4. **Request PR reviews:** Mention `@copilot` in a PR comment and request the "Boomer Casino Critic" agent

See [.github/agents/README.md](.github/agents/README.md) for more details.

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
