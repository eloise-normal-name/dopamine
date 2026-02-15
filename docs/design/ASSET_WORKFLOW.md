# Visual Asset Development Workflow

This document describes the complete workflow from concept to implementation for visual assets in Dopamine games.

## Design-First Philosophy

Dopamine follows a **design-before-code** approach:

```
Narrative → References → Concept Art → Production Assets → Implementation
```

No coding begins until visual direction is established through concept art.

## Complete Workflow

### Phase 1: Narrative & Vision
**Documents**: `/docs/design/NARRATIVES.md`

1. Define game's emotional goal and personality
2. Establish visual mood and atmosphere
3. Describe key visual moments
4. Set audio personality direction

**Deliverables**:
- Written narrative description
- Emotional target definition
- Key moment identification

### Phase 2: Reference Collection
**Documents**: `/docs/design/visual/SLOT_MACHINE_ITERATION_01.md` (example)

1. Search for visual references using defined queries
2. Log references using standardized template
3. Categorize by source type and relevance
4. Identify specific inspiration points (palette, layout, mood, etc.)
5. Prioritize agent-usable sources for mockup workflows

**Deliverables**:
- Reference batch logs (minimum 24-36 sources)
- Source categorization
- Usage note documentation
- Query templates for future reference gathering

### Phase 3: Concept Art Brief Creation
**Documents**: `/assets/concept-art/[game]/README.md`

1. Review narrative and references
2. Identify key visual pieces needed
3. Write detailed art briefs for each concept
4. Specify technical requirements
5. Define mood and implementation goals

**Deliverables**:
- Detailed art briefs (celebration, environment, details)
- Technical specifications
- Asset enumeration preparation
- Priority ordering

**Current location**: `/assets/concept-art/slot-machine/README.md`

### Phase 4: Concept Creation
**Deliverables**: `/assets/concept-art/[game]/[category]/`

1. **Sketch Phase**
   - Quick thumbnail explorations
   - Multiple composition options
   - Rough value and color studies
   
2. **Refinement Phase**
   - Develop selected directions
   - Add detail and polish
   - Create variation studies
   - Document layer structure

3. **Approval Phase**
   - Team review and feedback
   - Iterate based on comments
   - Final concept approval
   - Technical feasibility check

**Deliverables**:
- Sketch thumbnails (2-4 options per brief)
- Refined concept art (high resolution)
- Variation studies (states, lighting, detail levels)
- Layered source files (PSD, XCF, etc.)

### Phase 5: Asset Enumeration
**Documents**: To be created during this phase

1. Analyze approved concept art
2. Break down into individual production assets
3. Create comprehensive asset list
4. Specify formats, sizes, states
5. Document dependencies and relationships
6. Estimate file sizes and performance impact

**Deliverables**:
- Complete asset list with specifications
- Asset dependency map
- Performance budget allocation
- Implementation priority order

**Example asset list structure**:
```markdown
## Slot Machine Assets

### Celebration Effects
- [ ] celebration-glow-soft.png (512x512, RGBA)
- [ ] celebration-glow-intense.png (512x512, RGBA)
- [ ] celebration-particles-gold.png (sprite sheet 8x8)
- [ ] celebration-particles-cyan.png (sprite sheet 8x8)
- [ ] celebration-lightray-01.svg
- [ ] celebration-lightray-02.svg

### Environment Layers
- [ ] bg-sky-night.jpg (2560x1440, optimized)
- [ ] bg-market-far.png (2560x1440, RGBA)
- [ ] bg-market-mid.png (2560x1440, RGBA)
- [ ] fg-lights-bokeh.png (2560x1440, RGBA)
...
```

### Phase 6: Asset Production
**Location**: `/assets/images/[game]/`

1. **Create Production Files**
   - Export from concept art at specified sizes
   - Optimize for web (compress, resize, format conversion)
   - Create sprite sheets where appropriate
   - Generate multiple resolutions (1x, 2x, 3x for retina)

2. **Quality Control**
   - Verify file sizes meet budget
   - Test on target devices
   - Check visual quality at runtime
   - Validate transparency and layering

3. **Documentation**
   - Document each asset's purpose
   - Note any special usage requirements
   - Provide integration examples
   - Update asset README

**Deliverables**:
- Optimized image files (PNG, WebP, SVG, JPG)
- Sprite sheets with coordinate maps
- Multiple resolution variants
- Asset usage documentation

### Phase 7: Implementation
**Location**: `/games/[game]/`

1. **Integration**
   - Import assets into game code
   - Set up animation systems
   - Configure particle effects
   - Implement state transitions

2. **Animation & Timing**
   - Follow concept art timing studies
   - Tune easing and duration
   - Sync with audio triggers
   - Optimize for 60fps performance

3. **Responsive Behavior**
   - Test at different viewport sizes
   - Implement mobile optimizations
   - Handle device pixel ratios
   - Support reduced motion preferences

4. **Polish & Iteration**
   - Fine-tune based on actual gameplay
   - Adjust colors, sizes, timings
   - Fix visual bugs
   - Performance profiling

**Deliverables**:
- Functional game implementation
- Smooth animations at 60fps
- Responsive design across devices
- Polished visual experience

## Current Project Status

### Slot Machine: "Neon Night Market"

- [x] **Phase 1: Narrative** - Complete
  - See `/docs/design/NARRATIVES.md` - Slot Machine section
  
- [x] **Phase 2: References** - Complete
  - See `/docs/design/visual/SLOT_MACHINE_ITERATION_01.md`
  - 36 visual references logged (Steam, App Store, casino sites, etc.)
  
- [x] **Phase 3: Concept Briefs** - Complete
  - Art Brief 01: Jackpot Celebration Scene
  - Art Brief 02: Neon Night Market Environment
  - Art Brief 03: Machine Component Close-ups
  - Location: `/assets/concept-art/slot-machine/README.md`
  
- [ ] **Phase 4: Concept Creation** - Next Step
  - Priority: Start with Environment concept (sets foundation)
  - Then: Celebration concept (hero piece)
  - Finally: Machine details (technical reference)
  
- [ ] **Phase 5: Asset Enumeration** - Pending concept approval
- [ ] **Phase 6: Asset Production** - Pending enumeration
- [ ] **Phase 7: Implementation** - Pending assets

## Quality Gates

Each phase has approval requirements before proceeding:

### Phase 2 → 3: Reference to Briefs
- ✅ Minimum 24 reference sources logged
- ✅ Multiple source categories represented
- ✅ References align with narrative direction
- ✅ Agent-usable sources identified

### Phase 3 → 4: Briefs to Concepts
- ✅ All key visual moments have briefs
- ✅ Technical specs defined
- ✅ Mood and goals clearly stated
- ✅ Team understands requirements

### Phase 4 → 5: Concepts to Enumeration
- ⏳ Concepts reviewed and approved
- ⏳ Visual style established and consistent
- ⏳ Technical feasibility confirmed
- ⏳ Variations explored sufficiently

### Phase 5 → 6: Enumeration to Production
- ⏳ Complete asset list created
- ⏳ Specifications are clear and actionable
- ⏳ Performance budget allocated
- ⏳ Dependencies mapped

### Phase 6 → 7: Production to Implementation
- ⏳ All assets optimized for web
- ⏳ File sizes within budget
- ⏳ Multiple formats/resolutions provided
- ⏳ Documentation complete

## Tools & Resources

### For Concept Artists
- **Digital painting**: Photoshop, Procreate, Krita, Clip Studio Paint
- **Vector graphics**: Illustrator, Figma, Affinity Designer
- **3D reference**: Blender (for perspective and lighting studies)
- **Pixel art**: Aseprite (if using pixel art style)

### For Asset Production
- **Optimization**: TinyPNG, ImageOptim, Squoosh
- **Sprite sheets**: TexturePacker, Shoebox
- **SVG editing**: Figma, Illustrator, Inkscape
- **Format conversion**: ImageMagick, Sharp (Node.js)

### For Implementation
- **CSS animations**: Keyframes, transforms, filters
- **JavaScript**: Canvas API, WebGL (if needed)
- **Libraries**: GSAP, Anime.js, Three.js (3D), PixiJS (sprites)
- **Performance**: Chrome DevTools, Lighthouse

## Best Practices

### Concept Art
1. **Start loose, refine gradually** - Don't polish too early
2. **Explore multiple options** - Present 2-3 variations initially
3. **Layer everything** - Maintain editable layers for iterations
4. **Think in implementation** - Consider how it will be built
5. **Document decisions** - Note why choices were made

### Asset Production
1. **Optimize aggressively** - Web performance is critical
2. **Maintain quality** - Don't over-compress to unusability
3. **Provide variants** - Different detail levels, sizes, states
4. **Use appropriate formats** - SVG for icons, PNG for effects, WebP for photos
5. **Test on devices** - Check actual rendering, not just desktop

### Implementation
1. **Match concept intent** - Honor the artistic vision
2. **Performance first** - 60fps is non-negotiable
3. **Responsive always** - Works on mobile, tablet, desktop
4. **Accessibility** - Reduced motion, high contrast, screen readers
5. **Iterate based on use** - Real gameplay reveals needed adjustments

## Common Pitfalls to Avoid

❌ **Starting implementation before concepts are approved**
- Results in wasted development time and mismatched expectations

❌ **Creating assets without clear specifications**
- Leads to re-work and inconsistent quality

❌ **Skipping optimization phase**
- Poor performance, slow loading, bad user experience

❌ **Ignoring responsive and accessibility needs**
- Excludes users, fails accessibility standards

❌ **Not documenting decisions and rationale**
- Future changes are confusing, context is lost

## Reference Documents

- `/docs/design/README.md` - Overall design philosophy
- `/docs/design/NARRATIVES.md` - Game narratives and emotional goals
- `/docs/design/REFERENCES.md` - Design inspirations catalog
- `/docs/design/visual/README.md` - Visual design overview
- `/docs/design/visual/SLOT_MACHINE_ITERATION_01.md` - Slot machine design iteration
- `/assets/concept-art/README.md` - Concept art process and guidelines
- `/assets/concept-art/slot-machine/README.md` - Slot machine art briefs

## Questions or Contributions

For questions about the workflow:
- Review the reference documents above
- Check existing examples (Slot Machine iteration)
- See `/CONTRIBUTING.md` for general contribution guidelines

When adding new games:
1. Start with narrative in `/docs/design/NARRATIVES.md`
2. Create design iteration doc in `/docs/design/visual/`
3. Follow this workflow step-by-step
4. Don't skip phases!

---

**Maintained by**: Design team  
**Last updated**: 2026-02-15  
**Status**: ✅ Workflow established, slot machine in progress (Phase 3 complete)
