# Shared Concept Art

This directory contains concept art for reusable UI components, visual effects, and elements shared across multiple Dopamine games.

## Purpose
Visual development for common elements that maintain consistency across the entire Dopamine game collection.

## Concept Categories

### UI Components
Reusable interface elements that appear across games:

#### Buttons & Controls
- [ ] Primary action button (Spin, Roll, Play, etc.)
- [ ] Secondary action button (Settings, Info, etc.)
- [ ] Button states (idle, hover, active, disabled)
- [ ] Button size variations (large, medium, small)
- [ ] Button color themes (default purple, success green, warning orange, etc.)

#### Displays & Counters
- [ ] Credit/currency counter design
- [ ] Progress bars (various styles and colors)
- [ ] Timer displays (countdown, elapsed time)
- [ ] Score/win displays
- [ ] Info panels and tooltips

#### Navigation & Layout
- [ ] Header/title bar design
- [ ] Footer controls layout
- [ ] Game switcher interface
- [ ] Settings panel overlay
- [ ] Modal dialog boxes

### Visual Effects Library

#### Particle Systems
- [ ] Celebration particles (confetti, sparkles, stars)
- [ ] Ambient particles (floating lights, gentle drift)
- [ ] Reward particles (coins, gems, energy)
- [ ] Transition particles (page change, state change)
- [ ] Particle behavior studies (fall, rise, burst, drift)

#### Glow & Light Effects
- [ ] Standard glow treatments (soft, medium, intense)
- [ ] Edge lighting (neon outlines, borders)
- [ ] Pulsing glow animation frames
- [ ] Light ray/beam shapes
- [ ] Ambient light overlays

#### Transitions & Animations
- [ ] Screen wipe transitions
- [ ] Fade transitions
- [ ] Element entrance animations
- [ ] Element exit animations
- [ ] State change transitions
- [ ] Loading/thinking indicators

### Typography System

#### Font Applications
- [ ] Display headings (game titles, big wins)
- [ ] Body text (descriptions, info)
- [ ] UI labels (buttons, controls)
- [ ] Numbers/counters (scores, credits)
- [ ] Monospace (codes, technical info)

#### Text Effects
- [ ] Gradient text treatments
- [ ] Glow/shadow variations
- [ ] Outline styles
- [ ] Animation-friendly text states

### Icon Library

#### Action Icons
- [ ] Play/Pause/Stop controls
- [ ] Volume/Mute audio controls
- [ ] Settings/Options gear
- [ ] Info/Help question mark
- [ ] Close/Exit X
- [ ] Fullscreen toggle

#### Status Icons
- [ ] Success checkmark
- [ ] Warning alert
- [ ] Error X
- [ ] Loading spinner
- [ ] Locked/Unlocked
- [ ] New/Updated badge

#### Navigation Icons
- [ ] Home
- [ ] Back/Forward arrows
- [ ] Menu hamburger
- [ ] Search magnifier
- [ ] Filter/Sort

## Style Guidelines

### Color System
All shared components should support the Dopamine color palette:

**Primary Theme:**
- Purple gradient: #667eea → #764ba2
- Use as primary action color and brand accent

**Status Colors:**
- Success/Available: #10b981 (green)
- Warning/Coming Soon: #f59e0b (orange)
- Error/Stop: #ef4444 (red)
- Info: #3b82f6 (blue)

**Neutrals:**
- Background light: #f9fafb (light gray)
- Background dark: #1f2937 (dark gray)
- Text primary: #111827 (near black)
- Text secondary: #6b7280 (medium gray)

### Animation Principles
- **Duration**: 200-300ms for UI, 300-500ms for game events
- **Easing**: ease-out for entrances, ease-in for exits
- **60fps target**: All animations smooth and performant
- **Reduced motion**: Simpler alternatives for accessibility

### Sizing & Spacing
- **Base unit**: 8px grid system
- **Touch targets**: Minimum 44x44px for mobile
- **Spacing scale**: 4px, 8px, 16px, 24px, 32px, 48px, 64px
- **Border radius**: 4px (subtle), 8px (standard), 16px (large), 24px (extra large)

### Accessibility
- **Contrast ratios**: WCAG AA minimum (4.5:1 text, 3:1 UI)
- **Focus indicators**: Visible keyboard focus states
- **Screen reader**: Proper labeling and ARIA
- **Reduced motion**: Respect user preferences

## File Naming Convention

```
[category]-[component]-[variant]-v[##].ext

Examples:
ui-button-primary-idle-v01.png
ui-button-primary-hover-v01.png
ui-counter-credits-v01.png
vfx-particle-sparkle-v01.png
vfx-glow-soft-v01.png
transition-fade-in-v01.png
icon-play-v01.svg
icon-settings-v01.svg
typography-heading-large-v01.png
```

## Component Specification Template

For each component concept, document:

```markdown
## [Component Name]

### Purpose
What this component does and where it's used.

### States
- State 1: Description
- State 2: Description

### Variations
- Variation 1: Description
- Variation 2: Description

### Dimensions
- Desktop: [size]
- Mobile: [size]

### Colors
- Color 1: [hex] - [usage]
- Color 2: [hex] - [usage]

### Behavior
How the component responds to interaction.

### Animation
Timing and motion specifications.

### Accessibility
Special considerations for a11y.
```

## Current Status

### UI Components
- [ ] Button system concepts
- [ ] Display components concepts
- [ ] Navigation concepts

### Visual Effects
- [ ] Particle library concepts
- [ ] Glow effect standards
- [ ] Transition animations

### Typography
- [ ] Font hierarchy defined
- [ ] Text effect treatments

### Icons
- [ ] Core icon set
- [ ] Icon size variations

## Priority Order

1. **High Priority** (Needed immediately):
   - Primary button design
   - Credit counter design
   - Basic particle effects (sparkle, glow)
   - Core icons (play, pause, settings, info)

2. **Medium Priority** (Needed soon):
   - Secondary buttons
   - Progress bars
   - Transition animations
   - Extended icon set

3. **Lower Priority** (Nice to have):
   - Alternative button styles
   - Advanced particle systems
   - Complex transitions
   - Specialized icons

## Implementation Plan

### Phase 1: Core UI
1. Design primary button (all states)
2. Create counter/display components
3. Establish typography scale
4. Define spacing system

### Phase 2: Effects
1. Develop particle sprite sheets
2. Create glow overlay templates
3. Document animation timings
4. Build transition library

### Phase 3: Icons & Extras
1. Design core icon set
2. Create icon sprite sheet or individual SVGs
3. Develop specialized components as needed
4. Iterate based on game-specific needs

## Cross-Game Consistency

These shared components ensure:
- **Visual coherence** - All games feel related
- **Efficient development** - Reusable assets reduce work
- **User familiarity** - Consistent UI patterns
- **Brand identity** - Unified Dopamine aesthetic

## Contributing

When creating shared components:
1. Check if similar component already exists
2. Follow established style guidelines
3. Document all states and variations
4. Consider responsive behavior
5. Test across multiple games
6. Update this README with new components

---

**Status**: 🎨 Structure ready, awaiting concept creation  
**Priority**: Start with core UI (buttons, counters, basic particles)  
**Next**: Design primary button system as foundation

See parent `/assets/concept-art/README.md` for general workflow and guidelines.
