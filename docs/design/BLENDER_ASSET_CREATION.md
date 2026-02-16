# Blender Asset Creation Guide

Step-by-step workflows for creating Dopamine game assets using Blender 3.x+.

## Overview

This guide provides detailed instructions for using Blender to create the visual assets required for Dopamine games. Blender is ideal for:

- **3D-rendered 2D sprites** — Create 3D models and render them to 2D images with perfect lighting and consistent style
- **Background environment layers** — Build parallax scenes with depth, lighting, and atmosphere
- **Machine frame and UI elements** — Design and render hardware with realistic materials (metal, glass, neon)
- **Particle textures** — Generate soft, organic shapes with proper alpha transparency

All workflows assume **Blender 3.6 LTS or newer** (free download at [blender.org](https://www.blender.org/)).

---

## Getting Started

### 1. [Project Setup](blender/SETUP.md)

Initial Blender configuration for web-optimized rendering, workspace organization, and startup file setup.

**Start here** if you're new to creating game assets in Blender.

---

## Asset Workflows

Each guide provides complete step-by-step instructions for creating a specific category of assets:

### 2. [Background Environment Layers](blender/BACKGROUNDS.md)

Create parallax background layers for the "Neon Night Market" slot machine scene.

**Outputs**: 4 layers at 2560×1440 px (skyline, market stalls, neon signs, foreground particles)

**Topics covered**:
- Skyline geometry and window lights
- Market stall modeling with hanging lanterns
- Neon sign creation using curves
- Particle distribution and depth of field effects

---

### 3. [Machine Frame & UI Chrome](blender/FRAMES.md)

Design and render the slot machine cabinet and UI elements with realistic materials.

**Outputs**: 5 images (cabinet frames, reel overlay, marquee border)

**Topics covered**:
- Frame modeling with beveled edges
- Neon edge materials and emission shaders
- Glass reflection overlays
- Orthographic camera setup for UI elements

---

### 4. [Symbol Sprites (3D-to-2D Workflow)](blender/SYMBOLS.md)

Create consistent, high-quality symbol sprites by rendering 3D models.

**Outputs**: 15 images (5 symbols × 3 states: idle/blur/glow)

**Topics covered**:
- Fruit modeling (cherry, lemon, orange)
- Metallic/gem materials (seven, jackpot diamond)
- 3-point lighting rigs
- Motion blur and glow effects
- Outline generation

---

### 5. [Particle Textures](blender/PARTICLES.md)

Create soft, blendable particle textures for the particle system.

**Outputs**: 4 images (sparkle, circle, confetti, star)

**Topics covered**:
- Soft-edge alpha textures
- Gradient falloff from center
- Emission materials for particles

---

### 6. [Export Settings & Optimization](blender/EXPORT.md)

File export, format conversion, and troubleshooting guide.

**Topics covered**:
- Render output settings
- PNG to WebP conversion
- File size optimization
- Common issues and solutions
- Batch rendering tips

---

## Quick Reference

### Asset Specifications

| Asset Category | Dimensions | Format | File Size | Key Requirements |
|---------------|-----------|--------|-----------|-----------------|
| Symbol sprites | 128×128 px | WebP/PNG | ≤15 KB | 3 states (idle/blur/glow), dark outline, vibrant colors |
| Backgrounds | 2560×1440 px | WebP/PNG | ≤200 KB | Transparent regions, tile-able (some layers), parallax-ready |
| Frame (cabinet) | 600×800 px | WebP/PNG | ≤80 KB | Transparent reel window, neon edges, 3 states |
| Reel overlay | 400×150 px | WebP/PNG | ≤30 KB | Glass reflection, subtle highlight |
| Marquee | 600×60 px | WebP/PNG | ≤30 KB | Neon strip, segmented lights |
| Particles | 32×32 px (max) | PNG | ≤2 KB | White color (tinted at runtime), soft edges, alpha transparency |

---

## Workflow Tips

### Save Time with Templates

1. **Save lighting rig**: Create collection with 3-point lights → Save as Asset
2. **Save camera setup**: Store orthographic camera as preset
3. **Material library**: Build reusable materials (neon, chrome, glass, etc.)
4. **Export presets**: Save render settings per asset type

### Batch Rendering

Render multiple states/variants:
1. Set up all materials as separate slots
2. Use Python script to iterate and render:
   ```python
   import bpy
   
   states = ['idle', 'blur', 'glow']
   for state in states:
       bpy.context.object.active_material = bpy.data.materials[state]
       bpy.context.scene.render.filepath = f"//symbol-{state}.png"
       bpy.ops.render.render(write_still=True)
   ```

### Version Control

- Save Blender files with descriptive names: `slot-symbol-cherry-v01.blend`
- Export source files to `/assets/sources/blender/`
- Document major changes in commit messages
- Use Git LFS for `.blend` files (they're binary and large)

---

## Related Documentation

| Document | What It Covers |
|----------|---------------|
| [ART_ASSET_REQUIREMENTS.md](ART_ASSET_REQUIREMENTS.md) | Technical specs and file budgets |
| [ASSET_WORKFLOW.md](ASSET_WORKFLOW.md) | Overall 7-phase design pipeline |
| [ARTIST_QUICKSTART.md](concept-art/ARTIST_QUICKSTART.md) | Concept art generation |
| [Blender Manual](https://docs.blender.org/) | Official Blender documentation |

---

**Last updated**: 2026-02-16  
**Blender version**: 3.6 LTS or newer  
**Questions?** See [CONTRIBUTING.md](../../CONTRIBUTING.md) for how to ask
