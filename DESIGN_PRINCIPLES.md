# 🎨 Design Principles

This document is the **single authoritative source** for Dopamine's design beliefs, philosophy, and principles. All games in the Dopamine collection should align with these core values.

> **Note**: For deeper dives into specific areas, see the detailed documentation linked throughout this document.

---

## 🎯 Project Philosophy

**Dopamine is a collection of auto-playing web games that are fun to watch.**

We create browser-based games that run automatically, creating engaging visual experiences with minimal user interaction. Think of them as **interactive screensavers** or **visual entertainment** — something delightful to have running in the background.

### The Core Idea

- **Entertainment, not exploitation**: We design for joy and visual pleasure, not psychological manipulation or addiction
- **Watching is the game**: Our games should be interesting to observe passively, like watching rain on a window or waves on a shore
- **Auto-play first**: Games execute automatically with minimal user interaction, creating an effortless viewing experience
- **Accessible joy**: Simple enough to understand immediately, interesting enough to hold attention

### Ethical Stance

While our games use variable reinforcement patterns (wins, losses, randomness), we are committed to **entertainment, not addiction exploitation**. We draw inspiration from psychology and game design theory but apply it for positive, calming experiences — not manipulative dark patterns.

**Reference**: See [docs/design/REFERENCES.md](docs/design/REFERENCES.md) for our research into psychology and ethical considerations.

---

## ⚙️ Core Technical Principles

These technical values guide every implementation decision:

### Web-Based & Accessible
- **Pure browser execution**: All games run in modern browsers without plugins, build steps, or installations
- **Direct file access**: Open `index.html` and play — no compilation, no dependencies to install
- **Wide compatibility**: Works on desktop and mobile browsers
- **No barriers**: Anyone with a browser can play immediately

### Minimal Dependencies
- **Vanilla JavaScript preferred**: Use ES6+ features, but avoid frameworks unless absolutely necessary
- **Lightweight and fast**: Small file sizes, quick load times
- **Standard web APIs**: HTML5, CSS3, Canvas API — use what's built into browsers
- **Optional libraries only**: Add external code only when it provides significant value

### Auto-Play Architecture
- **Self-running loops**: Games execute automatically with their own game loops
- **Minimal interaction**: Users can start/stop/reset, but games play themselves
- **Engaging automation**: The auto-play should feel intentional and satisfying to watch
- **Smooth performance**: 60fps target for all animations

### Modular Design
- **Self-contained games**: Each game is independent with its own directory
- **Shared utilities**: Common code (animation helpers, random number generators, audio manager) lives in `/shared`
- **Consistent structure**: All games follow the same file organization pattern
- **Reusable components**: Build once, use across multiple games

**Reference**: See [ARCHITECTURE.md](ARCHITECTURE.md) for technical architecture details.

---

## 🌟 The Dopamine Feel

Every game in the collection must embody these five essential qualities:

### 1. **Watchable**
Games must be interesting to observe passively. Even if you're not interacting, there should be enough movement, color, and visual interest to hold attention. Like a lava lamp or aquarium — something pleasant to have in your peripheral vision.

### 2. **Satisfying**
Moments of resolution and completion should feel good. Whether it's reels settling into place, a capsule opening, or dice coming to rest — every outcome should have a sense of closure and satisfaction.

### 3. **Colorful**
Vibrant but not overwhelming. Each game should have a distinct color personality within Dopamine's overall aesthetic. Colors should be pleasant, harmonious, and emotionally appropriate.

### 4. **Polished**
Smooth animations, good sound design, attention to detail. No janky movements, no harsh transitions. Every element should feel intentional and well-crafted.

### 5. **Simple**
Complex enough to be interesting, simple enough to understand immediately. No tutorials needed — the game's purpose and behavior should be obvious within seconds of watching.

**Reference**: See [docs/design/NARRATIVES.md](docs/design/NARRATIVES.md) for how these qualities apply to each specific game.

---

## 🎨 Visual Design Principles

### Design Philosophy

- **Playful and engaging**: Fun, colorful aesthetics that are enjoyable to watch
- **Clear and readable**: High contrast, legible text, obvious visual feedback — design for watchability
- **Consistent theme**: Purple gradient base (#667eea → #764ba2) with game-specific accent colors
- **Smooth animations**: 60fps target, CSS transforms preferred, physics that feels natural
- **Responsive**: Works on all screen sizes from mobile to desktop

### Color System

#### Primary Theme
- **Purple Gradient**: `#667eea` → `#764ba2` (appears in UI, accents, or backgrounds across all games)
- **Background**: `#f9fafb` (light gray)
- **Text**: `#333333` (dark gray)

#### Status Colors
- **Success/Available**: `#10b981` (green)
- **Warning/Coming Soon**: `#f59e0b` (orange)  
- **Error/Stop**: `#ef4444` (red)
- **Info**: `#3b82f6` (blue)

#### Game-Specific Palettes
Each game can have its own accent colors while maintaining the purple theme connection.

### Typography

- **Primary Font**: System font stack (San Francisco, Segoe UI, Roboto) for performance and native feel
- **Display Size**: 2-3em for headings
- **Body Size**: 16px base, 1.6 line height for readability
- **Code**: Monaco, Courier New (monospace)

### Animation Principles

Inspired by Disney's 12 Principles of Animation and modern web animation best practices:

1. **Smooth**: 60fps target, use CSS transforms (translate, scale, rotate) for performance
2. **Meaningful**: Animations should provide feedback and guide attention
3. **Quick**: Keep under 500ms for UI interactions, longer for game events
4. **Easing**: `ease-out` for entries, `ease-in` for exits, `ease-in-out` for loops
5. **Reduced Motion**: Always respect `prefers-reduced-motion` for accessibility

### Visual Coherence Across Games

- Purple gradient theme appears somewhere in every game (UI shell, accents, or background)
- Consistent animation timing and easing functions
- Similar level of detail (not photo-realistic, not overly minimalist)
- Shared visual language for common elements (buttons, counters, progress indicators)

**Reference**: See [docs/design/visual/](docs/design/visual/) for detailed visual design documentation, mockups, and specifications.

---

## 🔊 Audio Design Principles

### Audio Philosophy

Sound should enhance the experience without being intrusive. Games must work perfectly with sound off, but audio adds an extra layer of satisfaction when enabled.

### Key Principles

1. **Non-intrusive**: Sounds should enhance, not annoy — never harsh, jarring, or repetitive in an irritating way
2. **Satisfying**: Clear feedback for actions and wins — audio should add to the sense of completion
3. **Optional**: Games work perfectly with sound off — audio is enhancement, not requirement
4. **High quality**: Professional, clean recordings with proper mixing
5. **Optimized**: Small file sizes for web delivery (< 100KB per sound effect)

### Sound Design Goals

- **Playful**: Match the fun, casual nature of games — upbeat and positive
- **Rewarding**: Wins should sound exciting — celebratory, not jarring
- **Responsive**: Immediate feedback for user actions — no perceptible delay
- **Cohesive**: Consistent audio aesthetic across games — similar quality and tone

### Technical Specifications

- **File Formats**: MP3 (primary), OGG (alternative)
- **Sample Rate**: 44.1kHz
- **Bit Rate**: 128-192 kbps for effects, 256 kbps for music
- **File Size**: < 100KB per sound effect, < 500KB per music loop
- **Normalization**: -1dBFS peak, -14 LUFS for music, -12 LUFS for effects

### Audio Coherence Across Games

- Similar quality and fidelity
- Non-intrusive volume levels
- Optional and mutable
- Positive, pleasant tones (avoid harsh or alarming sounds)

**Reference**: See [docs/design/audio/](docs/design/audio/) for detailed audio design documentation and specifications.

---

## 🎭 Tonal Coherence

All Dopamine games should maintain a consistent emotional tone across visual, audio, and interaction design:

### Tone Balance

- **Playful but not childish**: Fun and lighthearted, but sophisticated enough for all ages
- **Calming but not boring**: Relaxing to watch, but with enough variety to maintain interest
- **Rewarding but not manipulative**: Wins feel good without exploiting psychological vulnerabilities
- **Fun but not chaotic**: Engaging and dynamic without being overwhelming or stressful

### Emotional Goals

Each game has specific emotional targets (see [docs/design/NARRATIVES.md](docs/design/NARRATIVES.md)), but all should share:

- **Gentle accomplishment**: Satisfaction from completion and patterns
- **Calm curiosity**: Present and engaged but not stressed
- **Childlike wonder**: Joy in simple, beautiful things
- **Relaxed alertness**: Meditative but not boring

---

## 🎬 Design-First Workflow

**Priority**: Narrative descriptions and design concepts come BEFORE implementation. We establish the experience first, then build it.

### The Process

1. **Narrative** → Write compelling game description with emotional goals ([NARRATIVES.md](docs/design/NARRATIVES.md))
2. **References** → Research inspirations and similar games ([REFERENCES.md](docs/design/REFERENCES.md))
3. **Concept** → Create visual and audio mood boards (in `docs/design/visual/` and `docs/design/audio/`)
4. **Design** → Produce detailed mockups and specifications
5. **Iterate** → Refine for coherent experience across all games
6. **Implement** → Only then begin coding

### Why Design-First?

- **Coherence**: Ensures all games feel like they belong to Dopamine
- **Quality**: Time spent on design prevents costly implementation mistakes
- **Clarity**: Developers know exactly what they're building and why
- **Consistency**: Visual and audio elements are planned together, not added piecemeal

**Reference**: See [docs/design/README.md](docs/design/README.md) for detailed design workflow and [docs/design/ASSET_WORKFLOW.md](docs/design/ASSET_WORKFLOW.md) for asset development process.

---

## 📖 Using This Document

### For Contributors

**Before adding a game**:
1. Review this document to understand Dopamine's philosophy
2. Write a narrative following [NARRATIVES.md](docs/design/NARRATIVES.md) template
3. Ensure your concept embodies "The Dopamine Feel"
4. Follow the Design-First Workflow

**During development**:
1. Reference these principles when making design decisions
2. Verify your game meets technical principles (web-based, auto-play, modular)
3. Test against the five essential qualities (watchable, satisfying, colorful, polished, simple)

**Before submitting**:
1. Confirm visual coherence (purple gradient theme, consistent animations)
2. Verify audio coherence (optional, non-intrusive, satisfying)
3. Check tonal coherence (playful, calming, rewarding, fun)

### For Designers

Use this as your creative brief. Every design decision should trace back to these principles. When in doubt, ask: "Does this support the Dopamine Feel?"

### For Developers

These principles should guide implementation choices. Technical decisions aren't just about what works — they're about what aligns with our philosophy of simple, accessible, delightful web experiences.

---

## 🔗 Related Documentation

- **[ARCHITECTURE.md](ARCHITECTURE.md)** - Technical architecture and system design
- **[CONTRIBUTING.md](CONTRIBUTING.md)** - How to contribute new games and improvements
- **[docs/design/NARRATIVES.md](docs/design/NARRATIVES.md)** - Detailed game narratives and emotional goals
- **[docs/design/REFERENCES.md](docs/design/REFERENCES.md)** - Inspirations and research
- **[docs/design/visual/](docs/design/visual/)** - Visual design documentation and mockups
- **[docs/design/audio/](docs/design/audio/)** - Audio design and sound specifications
- **[docs/design/README.md](docs/design/README.md)** - Design process and workflow
- **[docs/GAME_DEVELOPMENT.md](docs/GAME_DEVELOPMENT.md)** - Detailed development guide

---

*This document is a living guide. As Dopamine evolves, these principles may be refined, but the core philosophy remains: create auto-playing web games that are fun to watch.*
