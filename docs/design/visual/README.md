# Visual Design & Concepts

This directory contains visual design documentation, mockups, and concept art for Gobbo Games.

## Start Here

- **[Slot Machine Iteration 01](SLOT_MACHINE_ITERATION_01.md)** - Narrative refinement, opinionated design decisions, sample art, and inspiration mapping for slots development kickoff.
- **[Gacha Iteration 01](GACHA_ITERATION_01.md)** - Treasure chest opening loop: narrative, rarity system, animation pacing, and reference collection for gacha development kickoff.

## Contents

### Design Guidelines
- Color palettes and themes
- Typography standards
- Icon and sprite specifications
- Animation timing and easing

### Game Mockups
Visual designs for individual games:
- Slot machine concepts
- Gacha game designs
- UI layouts and flows
- Animation storyboards

### Shared Components
Reusable visual elements:
- Buttons and controls
- Progress bars and counters
- Particle effects
- Transition animations

## Color Palette

### Primary Colors
- **Purple Gradient**: `#667eea` → `#764ba2` (main theme)
- **Background**: `#f9fafb` (light gray)
- **Text**: `#333333` (dark gray)

### Status Colors
- **Success/Available**: `#10b981` (green)
- **Warning/Coming Soon**: `#f59e0b` (orange)
- **Error/Stop**: `#ef4444` (red)
- **Info**: `#3b82f6` (blue)

### Game-Specific Palettes
Each game can have its own accent colors while maintaining the purple theme:
- **Slot Machine**: Gold `#ffd700`, Red `#dc2626`
- **Gacha**: Pink `#ec4899`, Cyan `#06b6d4`

## Typography

- **Primary Font**: System font stack (San Francisco, Segoe UI, Roboto)
- **Display Size**: 2-3em for headings
- **Body Size**: 16px base, 1.6 line height
- **Code**: Monaco, Courier New (monospace)

## Animation Principles

1. **Smooth**: 60fps target, use CSS transforms
2. **Meaningful**: Animations should provide feedback
3. **Quick**: Keep under 500ms for UI, longer for game events
4. **Easing**: `ease-out` for entries, `ease-in` for exits
5. **Reduced Motion**: Respect `prefers-reduced-motion`

## File Organization

```
visual/
├── README.md           # This file
├── colors.md           # Color palette details
├── typography.md       # Font specifications
├── components/         # Shared component designs
├── games/              # Game-specific designs
│   ├── slot-machine/
│   └── gacha/
└── prototypes/         # Interactive prototypes
```

## Design Tools

Recommended tools for creating visual designs:
- **Figma** - Collaborative design and prototyping
- **Sketch** - Mac-based design tool
- **Adobe XD** - Design and prototyping
- **Affinity Designer** - Vector graphics
- **Aseprite** - Pixel art and sprites

## Mockup Standards

When creating mockups:
1. Use actual game dimensions (responsive breakpoints)
2. Include multiple states (idle, active, winning, etc.)
3. Show animations as sequences or GIFs
4. Document interactive elements
5. Specify exact colors (hex codes)

## Current Status

🚧 **Placeholder for future work**

Future visual design documentation will include:
- [ ] Complete color system with variations
- [ ] Icon library and sprite sheets
- [ ] Animation timing specifications
- [ ] Responsive layout mockups
- [ ] Dark mode considerations
- [ ] Accessibility guidelines (contrast ratios, etc.)

## Key References

See [../REFERENCES.md](../REFERENCES.md) for detailed inspirations. Key visual references:
- **Vaporwave aesthetic** - Purple gradients and neon colors
- **Kurzgesagt** - Clean flat design with smooth animations
- **Disney animation principles** - Natural, weighted movement
- **Candy Crush** - Satisfying visual feedback and particle effects
- **Monument Valley** - Simple mechanics, beautiful execution

## Contributing

To add visual designs:
1. Create a subdirectory for your game/feature
2. Add mockups as PNG/JPG (high resolution)
3. Include a README explaining design decisions
4. Document all colors, fonts, and measurements
5. Show different states and variations
