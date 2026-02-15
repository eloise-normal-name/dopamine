# Placeholder: Environment Concept Images

This directory will contain concept art images for the Neon Night Market environment background.

## Expected Images

Based on Art Brief 02, this directory should contain:

### Primary Concept
- `environment-full-scene-v01.png` - Complete environment composition (2560x1440)
- `environment-full-scene-layered.psd` - Layered source file with separated depth layers

### Layer Separations
- `environment-sky-layer-v01.png` - Sky/far background layer
- `environment-background-layer-v01.png` - Distant market/structures layer
- `environment-midground-layer-v01.png` - Main market area layer
- `environment-foreground-layer-v01.png` - Near framing elements layer
- `environment-lighting-overlay-v01.png` - Glow and neon light effects

### Detail Studies
- `environment-neon-signs-study-v01.png` - Individual neon sign designs
- `environment-lanterns-study-v01.png` - Paper lantern and string light patterns
- `environment-lighting-study-v01.png` - Lighting and mood variations

### Variations
- `environment-deep-night-v01.png` - Darkest time variant
- `environment-late-evening-v01.png` - Baseline atmosphere
- `environment-mobile-simplified-v01.png` - Simplified version for mobile

## How to Generate Images

### Option 1: AI Image Generation
Use prompts from `../AI_IMAGE_GENERATION_PROMPTS.md` with tools like:
- DALL-E 3 (landscape aspect ratio)
- Midjourney (--ar 16:9)
- Stable Diffusion XL

**Pro tip**: Generate base composition first, then create layer separations by masking and regenerating specific areas.

### Option 2: Commission Artist
Provide artist with:
- Art Brief 02 from `../README.md`
- Requirement for separated depth layers for parallax
- Asian night market reference images
- Vaporwave color palette specifications

### Option 3: Photo Manipulation
Combine and stylize photos:
- Night market photographs (see Reference 28, 30, 36 in SLOT_MACHINE_ITERATION_01.md)
- Digital painting over photo base
- Heavy color grading to match palette
- Add neon and glow effects in layers

## File Naming Convention

```
environment-[area/type]-[variant]-v[##].[ext]

Examples:
environment-full-scene-v01.png
environment-midground-layer-v01.png
environment-neon-signs-study-v01.png
environment-deep-night-v01.png
```

## Technical Requirements

- **Format**: PNG for layers with transparency, JPG for full scenes
- **Resolution**: 2560x1440 preferred, minimum 1920x1080
- **Layers**: Must provide separated layers for parallax implementation
- **Color mode**: RGB, sRGB color space
- **File size**: Full scene < 800KB, individual layers < 300KB each
- **Source files**: Save layered PSD/XCF in `source-files/` subdirectory

## Layer Stack for Implementation

When creating layered composition, structure should be:

1. **Sky layer** (deepest) - Static background
2. **Far background** - Slow parallax movement
3. **Midground** - Medium parallax movement  
4. **Foreground** - Fast parallax movement
5. **Lighting overlay** - Blend mode: screen or add
6. **Atmospheric effects** - Fog, steam (optional animation)

Export each layer separately with transparency.

## Status

- [ ] Main composition concept created
- [ ] Layer separation completed
- [ ] Detail studies done
- [ ] Variations explored
- [ ] All images reviewed and approved
- [ ] Layers exported for implementation
- [ ] Ready for game integration

---

**Current**: Empty - awaiting image generation  
**Next**: Generate environment composition with depth layers  
**Priority**: HIGH - this sets foundation for all other concepts  
**See**: `../AI_IMAGE_GENERATION_PROMPTS.md` for ready-to-use prompts
