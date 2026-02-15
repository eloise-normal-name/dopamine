# Design Documentation

This directory contains design concepts, mockups, and guidelines for Dopamine's visual and audio elements.

## 🎨 Design-First Approach

> **Priority**: Colorful narrative descriptions and design concepts come BEFORE implementation. We establish the experience first, then build it.

### Workflow

1. **Narrative** → Write compelling game description ([NARRATIVES.md](NARRATIVES.md))
2. **References** → Research inspirations and similar games ([REFERENCES.md](REFERENCES.md))
3. **Concept** → Create visual and audio mood boards (in visual/ and audio/ subdirectories)
4. **Design** → Produce detailed mockups and specifications
5. **Iterate** → Refine for coherent experience across all games
6. **Implement** → Only then begin coding

## Structure

- **[NARRATIVES.md](NARRATIVES.md)** - 🌟 **START HERE** - Colorful descriptions of each game's experience and emotional goals
- **[REFERENCES.md](REFERENCES.md)** - Inspirations, similar games, and their relevance to Dopamine
- **[audio/](audio/)** - Audio design, sound effects concepts, and music direction
- **[visual/](visual/)** - Visual design, UI mockups, color palettes, and animation concepts
  - **[Slot Machine Iteration 01](visual/SLOT_MACHINE_ITERATION_01.md)** - Opinionated slot narrative/design decisions + sample art
  - **[Gacha Iteration 01](visual/GACHA_ITERATION_01.md)** - Treasure chest opening loop: narrative, rarity system, and animation pacing

## Purpose

The design documentation helps maintain consistency across all games and provides:
- **Concept exploration** - Early ideas and sketches
- **Design guidelines** - Standards for visual and audio elements
- **Asset specifications** - Requirements for production-ready assets
- **Reference materials** - Inspiration and design patterns

## Design Philosophy

Dopamine's visual and audio design follows core principles of being playful, clear, consistent, smooth, and satisfying.

👉 **See [../../DESIGN_PRINCIPLES.md](../../DESIGN_PRINCIPLES.md) for complete visual design principles, audio design principles, color system, typography, and animation guidelines.**

## Contributing Designs

When adding design documentation:

1. **Organize by game or feature**
   - Create subdirectories for each game or shared component
   - Keep related designs together

2. **Include context**
   - Add README files explaining design decisions
   - Document color codes, font choices, timing values
   - Explain the "why" behind design choices

3. **Multiple formats welcome**
   - Sketches and wireframes
   - High-fidelity mockups
   - Prototypes and animations
   - Audio samples and references

4. **Version your work**
   - Use clear naming (e.g., `slot-machine-v1.png`, `slot-machine-v2.png`)
   - Document iterations and changes

## Tools and Formats

### Visual Design
- **Sketches**: PNG, JPG, or photos
- **Mockups**: Figma, Sketch, Adobe XD exports
- **Animations**: GIF, MP4, or Lottie JSON
- **Icons/Graphics**: SVG preferred, PNG fallback

### Audio Design
- **Concepts**: MP3 or OGG
- **Final assets**: Goes in `/assets/sounds/`
- **Documentation**: Markdown with embedded audio

## Design Process

1. **Concept** - Explore ideas in this directory
2. **Iterate** - Refine based on feedback
3. **Specify** - Document exact requirements
4. **Produce** - Create final assets
5. **Implement** - Move to `/assets/` and integrate

## Examples

See subdirectories for examples:
- `visual/slot-machine/` - Slot machine visual concepts
- `audio/sound-effects/` - Sound effect specifications

## Status

🚧 This is a placeholder structure for future design work. As the project grows, this will be populated with:
- Game-specific design documentation
- Shared component designs
- Audio direction and concepts
- Animation specifications
- Brand guidelines
