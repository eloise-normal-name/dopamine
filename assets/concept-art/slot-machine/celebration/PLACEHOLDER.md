# Placeholder: Celebration Concept Images

This directory will contain concept art images for slot machine celebration states.

## Expected Images

Based on Art Brief 01, this directory should contain:

### Primary Concepts
- `celebration-jackpot-burst-v01.png` - Main jackpot celebration moment (1920x1080)
- `celebration-jackpot-sustain-v01.png` - Sustained celebration state
- `celebration-jackpot-fade-v01.png` - Celebration fade-out state

### Variations
- `celebration-small-win-v01.png` - Small win celebration (scaled down)
- `celebration-medium-win-v01.png` - Medium win celebration
- `celebration-particles-study-v01.png` - Particle effect reference

### Supporting Elements
- `celebration-glow-progression-v01.png` - Glow intensity progression study
- `celebration-color-study-v01.png` - Color variations for different symbol types

## How to Generate Images

### Option 1: AI Image Generation
Use prompts from `../AI_IMAGE_GENERATION_PROMPTS.md` with tools like:
- DALL-E 3
- Midjourney
- Stable Diffusion

### Option 2: Commission Artist
Provide artist with:
- Art Brief 01 from `../README.md`
- Color palette and style guidelines
- Reference images from `/docs/design/visual/SLOT_MACHINE_ITERATION_01.md`

### Option 3: Create Yourself
If you have digital art skills:
- Follow specifications in Art Brief 01
- Use recommended dimensions (1920x1080)
- Export as PNG with transparency where needed
- Save layered source files (PSD, XCF) separately

## File Naming Convention

```
celebration-[state]-[variant]-v[##].[ext]

Examples:
celebration-jackpot-burst-v01.png
celebration-jackpot-burst-v02.png (iteration)
celebration-small-win-v01.png
celebration-particles-gold-v01.png
```

## Technical Requirements

- **Format**: PNG (with alpha channel for effects) or JPG
- **Resolution**: 1920x1080 minimum for main concepts
- **Color mode**: RGB, sRGB color space
- **File size**: Optimize for web (aim for < 500KB per image)
- **Layers**: Save layered source files separately in `source-files/` subdirectory

## Status

- [ ] Primary celebration concepts created
- [ ] Variation studies completed  
- [ ] Particle effect references done
- [ ] All images reviewed and approved
- [ ] Ready for asset extraction

---

**Current**: Empty - awaiting image generation  
**Next**: Generate or commission concept art using art briefs  
**See**: `../AI_IMAGE_GENERATION_PROMPTS.md` for ready-to-use prompts
