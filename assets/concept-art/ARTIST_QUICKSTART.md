# Artist Quick Start Guide

**Welcome, Concept Artist!** This guide helps you get started creating visual assets for Dopamine games.

## 🎨 Your Mission

Create concept art for the **"Neon Night Market Slots"** game. You'll be designing:
1. A spectacular slot machine jackpot celebration scene
2. A detailed atmospheric night market environment
3. Close-up technical studies of slot machine components

## 📁 Where Everything Lives

### Your Main Documents
- **This guide**: `/assets/concept-art/ARTIST_QUICKSTART.md`
- **Art briefs**: `/assets/concept-art/slot-machine/README.md`
- **Project narrative**: `/docs/design/NARRATIVES.md` (Slot Machine section)
- **Visual references**: `/docs/design/visual/SLOT_MACHINE_ITERATION_01.md` (36 reference sources)

### Where to Save Your Work
```
/assets/concept-art/slot-machine/
├── celebration/     ← Save celebration concepts here
├── environment/     ← Save environment concepts here
└── machine-details/ ← Save detail studies here
```

## 📋 Three Art Briefs Explained

### Brief 01: Jackpot Celebration Scene
**What**: The slot machine at its most exciting moment - winning the jackpot!  
**Mood**: Triumphant but cozy. Like opening the perfect gift.  
**Key elements**:
- Three reels showing JACKPOT symbols
- Warm golden glow (not harsh flash)
- Purple/cyan/magenta particle effects
- Credit counter going up excitedly
- Neon night market visible but blurred in background

**File**: `celebration-jackpot-burst-v01.png` (or your version number)  
**Size**: 1920x1080 or 1200x1600 (mobile mockup)  
**Priority**: Medium (do second, after environment)

### Brief 02: Neon Night Market Environment
**What**: The atmospheric background world where the slot machine exists.  
**Mood**: Cozy urban night warmth. Like a favorite late-night spot.  
**Key elements**:
- Asian-inspired night market with neon signs
- Deep blue-purple night sky
- Warm lanterns and string lights
- Clear midground space (where machine sits)
- Depth layers for parallax (foreground/mid/background)

**File**: `environment-full-scene-v01.png` (or layered PSD)  
**Size**: 2560x1440 or 1920x1080  
**Priority**: HIGH (start here - sets foundation for everything else)

### Brief 03: Machine Component Close-ups
**What**: Technical detail studies of the slot machine's physical parts.  
**Mood**: Precision meets personality. Premium quality.  
**Key elements**:
- Reel window with glass/acrylic material
- Machine cabinet with purple gradient
- Internal reel mechanism
- Credit display panel
- Decorative neon accents
- Material swatches (metal, glass, plastic finishes)

**File**: `detail-reel-window-front-v01.png` (and others)  
**Size**: Individual studies at 1200x1200, or sheet at 2400x3000  
**Priority**: Lower (do third - needed for asset production)

## 🎨 Style Guidelines

### Color Palette
**Primary colors**:
- Purple gradient: `#667eea` → `#764ba2` (the Dopamine brand)
- Deep night blue: `#1a1a2e` to `#16213e` (sky/background)

**Neon accents**:
- Bright cyan: `#06b6d4`
- Magenta: `#ec4899`
- Gold: `#ffd700`

**Symbol colors**:
- Cherry red, lemon yellow, orange, silver-blue (for sevens)

### Visual Principles
✅ **Do**:
- High legibility and clear shapes
- Warm, inviting glow (not harsh)
- Controlled neon aesthetic
- Smooth, polished look
- Think "Vaporwave meets arcade nostalgia"

❌ **Don't**:
- Aggressive flashing or harsh lights
- Photorealistic textures
- Visual chaos or overwhelming detail
- Generic "Vegas casino" look

### Reference Inspiration
From the 36 sources in `SLOT_MACHINE_ITERATION_01.md`, focus on:
- **Behance slot design** (Ref 24) - polished concept art quality
- **City lights casino** (Refs 04, 10, 15) - night atmosphere and neon
- **Synthwave aesthetics** (Refs 02, 08, 13) - retro-future vibe
- **Vintage slot machines** (Ref 30) - mechanical charm and materials

## 🚀 Recommended Workflow

### Week 1: Environment Foundation
1. **Day 1-2**: Sketch 3-4 thumbnail compositions for environment
2. **Day 3-4**: Refine best composition, establish color palette
3. **Day 5**: Separate layers (sky, far background, mid, foreground)
4. **Review**: Show to team, get feedback

### Week 2: Celebration Hero Piece
1. **Day 1**: Quick value study for celebration composition
2. **Day 2-3**: Refine jackpot celebration with effects
3. **Day 4**: Create small/medium win variations
4. **Day 5**: Polish and timing studies
5. **Review**: Show to team, get feedback

### Week 3: Technical Details
1. **Day 1-2**: Reel window and cabinet frame studies
2. **Day 3**: Reel mechanism and internal details
3. **Day 4**: Display panels and decorative elements
4. **Day 5**: Material swatches and multi-angle views
5. **Review**: Final review, prepare for asset production

## 💡 Pro Tips

### Layering is Key
Always save work with layers:
- Separate background, midground, foreground
- Keep effects on their own layers
- Maintain editable text/shapes
- Save as PSD, XCF, or your tool's format

### Think Implementation
Ask yourself:
- Can this be built with web technologies (CSS, Canvas, SVG)?
- Are effects achievable at 60fps in a browser?
- Can it scale down for mobile devices?
- Does it work with reduced motion settings?

### Multiple States
Show variations:
- Different lighting intensities (idle, active, winning)
- Time of day variants (deep night, late evening)
- Detail levels (full quality, mobile-simplified)

### Document Decisions
Add notes to your files:
- Why you chose this composition
- How elements should animate
- What colors/values are important
- Technical considerations

## 📞 Questions?

### About Art Direction
- Review the narrative: `/docs/design/NARRATIVES.md`
- Check visual references: `/docs/design/visual/SLOT_MACHINE_ITERATION_01.md`
- Read full briefs: `/assets/concept-art/slot-machine/README.md`

### About Workflow
- See the complete process: `/docs/design/ASSET_WORKFLOW.md`
- Check parent concept-art README: `/assets/concept-art/README.md`

### About Technical Specs
- Each brief has detailed technical specifications
- File formats: PNG (with transparency), layered PSD/XCF, or SVG
- Color mode: RGB, sRGB color space for web
- Resolution: High (concepts), optimized later for production

## ✅ Deliverables Checklist

When you finish each concept:
- [ ] Saved in correct directory with clear filename
- [ ] Layered source file preserved (PSD, XCF, etc.)
- [ ] Exported as high-res PNG or JPG for review
- [ ] Created 2-3 variations if applicable
- [ ] Updated README with status
- [ ] Ready for team review

## 🎯 Success Criteria

Your concepts are successful if they:
1. ✅ Capture the "cozy anticipation" emotional goal
2. ✅ Work within the "Neon Night Market" theme
3. ✅ Are technically feasible for web implementation
4. ✅ Maintain high readability and legibility
5. ✅ Feel cohesive with the Dopamine purple brand
6. ✅ Inspire the team and guide asset production

## 🎉 Next Steps After Concept Approval

Once your concepts are approved:
1. **Asset enumeration** - Break concepts into individual production assets
2. **Asset production** - Create optimized game-ready files
3. **Implementation** - Developers integrate into the game
4. **Your work guides everything** - Your concepts become the visual standard!

---

**Ready to start?**

1. Read Brief 02 (Environment) in `/assets/concept-art/slot-machine/README.md`
2. Review the 36 visual references in `/docs/design/visual/SLOT_MACHINE_ITERATION_01.md`
3. Start sketching environment compositions
4. Save work to `/assets/concept-art/slot-machine/environment/`
5. Have fun bringing the Neon Night Market to life! 🎨✨

---

**Document**: `/assets/concept-art/ARTIST_QUICKSTART.md`  
**Updated**: 2026-02-15  
**Status**: Ready for concept creation
