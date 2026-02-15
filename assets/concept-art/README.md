# Concept Art for Asset Development

This directory contains concept art and visual development work that guides future asset creation for Dopamine games.

## Prompt-Based Concept Art Approach

**Important**: This concept art system is designed around **AI-generated prompts** rather than hand-drawn artwork. The focus is on crafting creative, inspirational prompts for AI image generation tools (DALL-E, Midjourney, Stable Diffusion, Codex, etc.) that:

- **Inspire visual exploration** - Prompts are written to spark creativity and enable diverse interpretations
- **Allow for happy accidents** - Intentional openness lets AI tools surprise us with unexpected creative directions
- **Generate rapid iteration** - Multiple variations can be explored quickly through prompt refinement
- **Communicate vision through language** - Evocative descriptions replace technical specifications as the primary creative tool

This approach recognizes that AI coding/concept agents cannot create images directly, but can craft sophisticated prompts that enable visual concept generation through specialized AI image tools.

## Purpose

Concept art (generated from prompts) serves as visual blueprints for:
- **Future asset development** - What to build and how it should look
- **Art direction** - Establishing consistent visual style through curated prompt outputs
- **Production planning** - Identifying what assets are needed
- **Team alignment** - Shared vision across designers, developers, and artists
- **Creative exploration** - Discovering unexpected visual directions through AI-generated variations

## Directory Structure

```
concept-art/
├── README.md           # This file
├── slot-machine/       # Slot machine concept art
│   ├── README.md       # Slot-specific art briefs
│   ├── celebration/    # Win celebration concepts
│   ├── environment/    # Background and setting concepts
│   └── machine-details/# Close-up component concepts
└── shared/             # Shared UI and component concepts
    └── README.md
```

## Concept Art Categories

### 1. Celebration Scenes
Special moments that deserve unique visual treatment:
- **Win states** - Different tiers of victory (small, medium, jackpot)
- **Achievement moments** - Milestones and special events
- **Transition celebrations** - Level ups, unlocks, special features

### 2. Environment & Setting
The world where the game takes place:
- **Background environments** - Detailed atmospheric settings
- **Lighting and mood** - Time of day, ambient effects
- **Depth layers** - Foreground, midground, background separation
- **Environmental storytelling** - World-building details

### 3. Machine & Component Details
Close-up views of game elements:
- **Machine architecture** - Overall structure and form
- **Component parts** - Reels, buttons, displays, frames
- **Material studies** - Textures, finishes, reflections
- **Technical details** - How parts fit together and function

### 4. Character & Symbol Design
Visual elements that populate the game:
- **Symbol sets** - Icons, numbers, special symbols
- **Character concepts** - If applicable to game type
- **Iconography** - UI elements and indicators
- **Visual hierarchy** - Size, color, emphasis studies

## Art Brief Template

Each concept art piece should include a brief with:

```markdown
# [Art Piece Name]

## Concept Type
[ ] Celebration Scene
[ ] Environment View
[ ] Machine Detail
[ ] Symbol/Character Design
[ ] UI Component

## Purpose
What this concept will be used for and why it's needed.

## Visual Description
Detailed description of what should be depicted.

## Reference Material
Links to visual references from design docs.

## Technical Specs
- **Dimensions**: Recommended size/aspect ratio
- **Format**: PNG, SVG, JPG, etc.
- **Style**: Realistic, stylized, pixel art, etc.
- **Color mode**: RGB, specific palette

## Key Features
- Feature 1: Description
- Feature 2: Description
- Feature 3: Description

## Mood & Atmosphere
The emotional tone and feeling this piece should convey.

## Implementation Notes
How this concept will translate into game assets.
```

## Workflow

### Phase 1: Art Briefs (Current Phase)
1. ✅ Review design documentation and narratives
2. ✅ Identify key visual moments needing concept art
3. ✅ Write detailed art briefs for each piece
4. ⏳ Prioritize art pieces by production need

### Phase 2: Concept Creation
1. ⏳ Create rough sketches/thumbnails
2. ⏳ Review and iterate on direction
3. ⏳ Develop refined concept art
4. ⏳ Create multiple variations where needed

### Phase 3: Asset Planning
1. ⏳ Break concepts into production assets
2. ⏳ Create asset lists and specifications
3. ⏳ Plan implementation approach
4. ⏳ Document technical requirements

### Phase 4: Asset Production
1. ⏳ Create production-ready assets
2. ⏳ Optimize for web performance
3. ⏳ Implement in game code
4. ⏳ Test and iterate

## Design Principles

All concept art should align with Dopamine's visual principles:

### Readability First
- **High legibility** - Clear at small sizes and at a glance
- **Strong silhouettes** - Recognizable shapes
- **Appropriate contrast** - Readable on all backgrounds

### Emotional Resonance
- **Warm and inviting** - Never harsh or aggressive
- **Satisfying feedback** - Visual rewards feel good
- **Cozy anticipation** - Excitement without stress

### Technical Feasibility
- **Web-optimized** - Works in browsers at 60fps
- **Performance-conscious** - Reasonable file sizes
- **Accessible** - Works with reduced motion and color-blind modes

### Style Consistency
- **Cohesive palette** - Purple gradient theme DNA
- **Unified aesthetic** - "Neon Night Market" vibe for slots
- **Consistent detail level** - Not too realistic, not too minimal

## Color Palette Reference

### Slot Machine: "Neon Night Market"
- **Primary**: Purple gradient (#667eea → #764ba2)
- **Neon accents**: Cyan, Magenta, Gold
- **Atmosphere**: Deep blue-purples, warm ambient glow
- **Symbols**: Saturated fruit colors (cherry red, lemon yellow, orange)
- **Metals**: Silver-blue for sevens, gold for jackpot

See `/docs/design/visual/SLOT_MACHINE_ITERATION_01.md` for full design direction.

## Current Status

### Slot Machine Concept Art
- [x] Art briefs created
- [ ] Celebration concepts
- [ ] Environment concepts
- [ ] Machine detail concepts
- [ ] Symbol refinement concepts

### Shared Components
- [ ] UI component library concepts
- [ ] Particle effect concepts
- [ ] Transition animation concepts

## Tools & Resources

### Recommended Software
- **Digital painting**: Photoshop, Procreate, Krita
- **Vector art**: Illustrator, Figma, Affinity Designer
- **3D mockups**: Blender, Cinema 4D (for perspective refs)
- **Pixel art**: Aseprite, Pixaki

### Reference Sources
See `/docs/design/visual/SLOT_MACHINE_ITERATION_01.md` for 36 curated visual references including:
- Steam game screenshots
- Mobile app store examples
- Casino demo sites
- Design portfolio mockups
- Historical slot machine photography

## Licensing & Attribution

All concept art should be:
- **Original work** created for this project, OR
- **Properly licensed** with attribution if using references

Never copy assets directly from references. References inspire original work.

## Contributing

### For Artists
1. Read the relevant game narrative in `/docs/design/NARRATIVES.md`
2. Review design iteration docs in `/docs/design/visual/`
3. Read art briefs in game-specific subdirectories
4. Create concept art following the brief
5. Save work in appropriate directory with descriptive filename
6. Update README with status

### File Naming Convention
```
[game]-[category]-[description]-[version].ext

Examples:
slot-celebration-jackpot-v01.png
slot-environment-neon-market-v02.jpg
slot-detail-reel-mechanism-v01.png
```

### For Reviewers
- Check alignment with narrative and design docs
- Verify technical feasibility (web performance, accessibility)
- Ensure style consistency with Dopamine aesthetic
- Provide constructive, actionable feedback

## Next Steps

1. **Review art briefs** in `/assets/concept-art/slot-machine/README.md`
2. **Prioritize pieces** based on implementation timeline
3. **Create concepts** following the briefs
4. **Iterate and refine** based on team feedback
5. **Plan asset production** from approved concepts

---

**Status**: 🎨 Ready for concept art creation  
**Last Updated**: 2026-02-15  
**Contact**: See project CONTRIBUTING.md for team info
