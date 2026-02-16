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

## Table of Contents

1. [Project Setup](#project-setup)
2. [Background Environment Layers](#background-environment-layers)
3. [Machine Frame & UI Chrome](#machine-frame--ui-chrome)
4. [Symbol Sprites (3D-to-2D Workflow)](#symbol-sprites-3d-to-2d-workflow)
5. [Particle Textures](#particle-textures)
6. [Export Settings & Optimization](#export-settings--optimization)
7. [Troubleshooting](#troubleshooting)

---

## Project Setup

### Initial Blender Configuration

Before creating assets, set up Blender for web-optimized rendering:

1. **Create a new project**: File → New → General
2. **Set render engine**: Switch to **Cycles** (Render Properties → Render Engine → Cycles)
   - Better for realistic materials and lighting
   - Use GPU if available (Preferences → System → Cycles Render Devices)
3. **Configure color management**: Render Properties → Color Management
   - View Transform: **Filmic** (for cinematic tone) or **Standard** (for saturated colors)
   - Look: **Medium High Contrast** for vibrant neon aesthetics
4. **Set output resolution**: Output Properties
   - Resolution will vary per asset (detailed in each section below)
   - **Film → Transparent**: Enable for assets with alpha channel

### Workspace Organization

Create a dedicated workspace for game asset creation:

1. **Top menu**: Click the `+` next to workspace tabs
2. **Add workspace**: Name it "Game Assets"
3. **Split viewport**: Add a UV Editor and Shader Editor for material work
4. **Save startup file**: File → Defaults → Save Startup File

---

## Background Environment Layers

Create parallax background layers for the "Neon Night Market" slot machine scene.

**Reference**: ART_ASSET_REQUIREMENTS.md § 2 (Background Environment Layers)  
**Required outputs**: 4 layers at 2560×1440 px, WebP format, ≤200 KB each

### Layer 1: Far Background — City Skyline

**Content**: Silhouetted city skyline with animated window lights

#### Step-by-Step

1. **Create skyline geometry**:
   - Add multiple cubes (Shift+A → Mesh → Cube) for building shapes
   - Scale to varied heights (S, Z, drag) — tallest ~20 units, shortest ~5 units
   - Position in a row along X-axis
   - Keep buildings simple — just rectangular blocks
   - Add occasional peaked roofs (Add → Mesh → Cone, scale flat)

2. **Camera setup**:
   - Add camera (Shift+A → Camera)
   - Position: X=0, Y=-50, Z=10 (looking at buildings from distance)
   - Rotate: X=85°, Y=0°, Z=0° (slight upward angle)
   - Set as active camera (Numpad 0)
   - Camera settings: Focal Length 35mm (wider angle to capture skyline)

3. **Create window lights**:
   - On each building face, add **Plane** objects (1×1 unit)
   - Scale small (S, 0.3) for window size
   - Array modifier (Modifiers → Add → Array): 
     - Count: 5 (horizontal)
     - Relative Offset: X=1.5
   - Duplicate array vertically (Shift+D, Z) for multiple floors
   - Material: Emission shader (warm yellow #ffcc66), Strength: 2.0

4. **Skyline material**:
   - Select all building meshes (not windows)
   - New material: "Skyline Silhouette"
   - Shader: Simple Emission with deep blue-purple #2a1a4a, Strength: 0.3
   - This creates the silhouetted look

5. **Background sky**:
   - World settings: Use gradient for twilight sky
   - Shader Editor (World) → Add → Color Ramp
   - Colors: Deep purple #1a1a2e (bottom) → Cyan-blue #16213e (top)

6. **Lighting**:
   - Add Area Light (Shift+A → Light → Area)
   - Position behind and above skyline
   - Color: Warm magenta #ec4899, Power: 500
   - Creates rim lighting on building edges

7. **Render settings**:
   - Output Properties:
     - Resolution: 2560 × 1440 px
     - Frame Rate: Not applicable (static image)
     - Film → Transparent: ✅ Enabled
   - Render Properties:
     - Samples: 128 (sufficient for clean image)
     - Max Bounces: 4 (limited for simple scene)

8. **Render and export**:
   - Render → Render Image (F12)
   - Image → Save As → `bg-skyline.png` (save as PNG first)
   - Use GIMP or ImageMagick to convert to WebP:
     ```bash
     # Using ImageMagick
     magick bg-skyline.png -quality 85 bg-skyline.webp
     ```

**Tips**:
- **Variation**: Randomize window on/off states using drivers or separate materials
- **Tile-ability**: Duplicate buildings at edges and ensure seamless horizontal wrap
- **Atmosphere**: Add volumetric fog (World → Volume → Principled Volume, Density 0.01)

---

### Layer 2: Mid Background — Market Stalls

**Content**: Market stalls with hanging lanterns

#### Step-by-Step

1. **Create market stall base**:
   - Add cube, scale flat (S, Z, 0.1) for table surface
   - Add 4 cylinders for legs (radius 0.1, height 1.5)
   - Position table at Z=0 (ground level)

2. **Canopy structure**:
   - Add plane above table (Z=2.5)
   - Scale rectangular (S, Y, 1.5)
   - Subdivision Surface modifier (Modifiers → Subdivision, 2 levels)
   - Deform slightly for cloth sag (Tab → Edit Mode → Proportional Editing)
   - Material: Diffuse BSDF, warm red #ef4444

3. **Hanging lanterns**:
   - Add UV Sphere (Shift+A → Mesh → UV Sphere)
   - Scale small (S, 0.3)
   - Position below canopy edge
   - Material: Emission shader, Color #f97316 (orange), Strength 8.0
   - Duplicate (Shift+D) along canopy edges

4. **Add details**:
   - Small cube objects as "goods" on table
   - Use Array modifier for repetition
   - Vary colors: Cherry red #ef4444, lemon yellow #eab308, orange #f97316

5. **Duplicate stalls**:
   - Select all stall objects (Box Select: B)
   - Group (Ctrl+G) → Name "Stall_01"
   - Duplicate instances (Alt+D) along X-axis
   - Vary lantern colors per stall for diversity

6. **Camera and composition**:
   - Position camera closer than skyline (Y=-25)
   - Angle shows top view of stalls
   - Frame to show 3-4 stalls across width

7. **Lighting**:
   - Use lantern emission (already set)
   - Add soft Area Light above scene (bluish #06b6d4, Power 300)
   - World: Same gradient as Layer 1 for consistency

8. **Render settings**:
   - Same as Layer 1: 2560×1440, Transparent, Samples 128
   - Render and export as `bg-market-stalls.webp`

**Tips**:
- **Depth of field**: Enable in camera settings (F-stop 2.8) to blur far stalls slightly
- **Transparency**: Ensure spaces between stalls are transparent for layering

---

### Layer 3: Near Background — Neon Signs

**Content**: Neon signs with kanji/symbols and glowing tubes

#### Step-by-Step

1. **Create neon sign board**:
   - Add plane, scale large (S, 5)
   - Position upright (R, Y, 90°)
   - Material: Emission (dark), Strength 0.1 (barely lit)

2. **Neon tube text** (using curves):
   - Add → Curve → Bezier Curve
   - Tab → Edit Mode: Manipulate control points to form letters/symbols
   - Curve Properties:
     - Geometry → Bevel → Depth: 0.05 (tube thickness)
     - Fill Mode: Full
   - Material: Emission shader
     - Color: Magenta #ec4899 or Cyan #06b6d4
     - Strength: 15.0 (bright glow)
   - Add Modifier → Subdivision Surface for smooth curves

3. **Multiple signs**:
   - Create 3-5 different signs with varied text/symbols
   - Use different neon colors per sign
   - Position at different Z-heights and X-positions

4. **Glow effect enhancement**:
   - Compositing nodes for bloom:
     - Compositing Workspace
     - Use Nodes: ✅ Enable
     - Add → Filter → Glare
     - Glare Type: Fog Glow
     - Threshold: 0.8, Mix: 1.0
   - This creates the neon "bleed" effect

5. **Background kanji/symbols** (text objects):
   - Add → Text
   - Edit: Enter Japanese kanji or custom symbols
   - Extrude minimally (0.02) for slight depth
   - Material: Emission with color cycling (animate later if needed)

6. **Camera positioning**:
   - Closer than Layer 2 (Y=-15)
   - Frame signs with variety in composition

7. **Render settings**:
   - 2560×1440, Transparent
   - Samples: 256 (higher for clean glow)
   - Enable Bloom in View Layer Properties → Passes → Bloom (for post)

8. **Export**:
   - Render → Save as `bg-neon-signs.webp`

**Tips**:
- **Color cycling**: Render multiple versions with different hue shifts for animation
- **Flickering effect**: Optional — render frames with emission strength variation

---

### Layer 4: Foreground — Particles

**Content**: Floating lanterns, fireflies, ambient particles

#### Step-by-Step

1. **Floating lanterns**:
   - Add UV Sphere, scale (S, 0.5)
   - Material: Emission, warm orange #f97316, Strength 5.0
   - Duplicate randomly across scene (vary Z-heights)
   - Slight scale variation (S, random 0.4-0.7)

2. **Fireflies** (point particles):
   - Add → Empty → Plain Axes
   - Particle System: Hair type
     - Count: 200
     - Lifetime: 100 frames (static for now)
     - Random distribution
   - Render as: Halo or small spheres
   - Material: Emission, yellow #facc15, Strength 10.0

3. **Soft bokeh particles**:
   - Distribute glowing spheres in foreground
   - Camera depth of field (F-stop 1.4) blurs them into soft circles
   - Material: Emission white, Strength 3.0

4. **Camera setup**:
   - Very close (Y=-5), looking through particles
   - Depth of Field enabled, Focus on mid-distance (10 units)

5. **Motion blur** (optional for drifting feel):
   - Render Properties → Motion Blur: ✅ Enable
   - Shutter: 0.5
   - Animate particles slowly drifting upward

6. **Render**:
   - 2560×1440, Transparent
   - Samples: 256 (for bokeh quality)
   - Export as `bg-foreground.webp`

**Tips**:
- **Layer separation**: Keep particles sparse — CSS will layer this over other backgrounds
- **Animated variation**: Render as image sequence for subtle animation loop

---

## Machine Frame & UI Chrome

Create the slot machine cabinet and UI elements with realistic materials.

**Reference**: ART_ASSET_REQUIREMENTS.md § 3 (Machine Frame & UI Chrome)  
**Required outputs**: 5 images (600×800 frame, 400×150 overlay, 600×60 marquee)

### Machine Frame (Default State)

**Content**: Cabinet frame with neon edge lighting

#### Step-by-Step

1. **Frame outline modeling**:
   - Start with Cube
   - Scale: X=6, Z=8, Y=0.2 (thin panel)
   - Add Loop Cut (Ctrl+R) to create inner border
   - Inset face (I) → Extrude inward (E, S) to create beveled edge

2. **Reel window cutout**:
   - Edit Mode: Select center face
   - Delete face (X → Faces) — creates transparent window
   - Dimensions: 4 units wide × 1.5 units tall
   - Position centered, slightly above middle

3. **Neon edge material**:
   - Add material: "Frame Edge"
   - Shader setup:
     - Principled BSDF: Metallic 0.9, Roughness 0.2 (brushed metal)
     - Mix Shader → Add Emission shader at edges
     - Color Ramp node: Use "Facing" geometry input for edge detection
     - Emission color: Cyan #06b6d4, Strength 3.0
   - This creates glowing edges

4. **Cabinet surface**:
   - Select main panel faces
   - Material: "Cabinet Body"
   - Principled BSDF: Base color #2d1b3d (deep purple)
   - Metallic: 0.1, Roughness: 0.4 (slightly reflective)

5. **Lighting for 3D depth**:
   - Add HDRI environment (World → Surface → Environment Texture)
   - Or use 3-point lighting: Key (above-front), Fill (side), Rim (back)
   - Subtle shadows to show depth

6. **Orthographic camera setup**:
   - Camera → Type: Orthographic (removes perspective distortion)
   - Position: Y=-15, looking straight at frame
   - Orthographic Scale: 9 (fits frame in view)
   - Frame camera to 600×800 aspect ratio

7. **Render settings**:
   - Resolution: 600 × 800 px
   - Film → Transparent: ✅ Enabled
   - Samples: 256
   - Render → Save as `frame-default.webp`

**Win and Jackpot Variants**:
- Duplicate the material
- **Win**: Change emission to gold #ffd700, Strength 5.0
- **Jackpot**: Mix magenta #ec4899 + gold #ffd700, Strength 8.0, add pulsing (animated Strength)
- Render as `frame-win.webp` and `frame-jackpot.webp`

---

### Reel Window Overlay

**Content**: Glass reflection and highlight

#### Step-by-Step

1. **Create glass pane**:
   - Add plane (4×1.5 units, matching window cutout)
   - Position in front of frame (Y=0.1)

2. **Glass material**:
   - Principled BSDF:
     - Transmission: 0.95 (mostly transparent)
     - Roughness: 0.1 (slight blur)
     - IOR: 1.45 (glass)
   - Add subtle reflection by enabling Screen Space Reflections (Render Properties)

3. **Highlight overlay**:
   - Add bezier curve across top edge of pane
   - Curve bevel depth: 0.3
   - Material: Emission white, Strength 1.0 (soft highlight)

4. **Camera and render**:
   - Orthographic camera, 400×150 px resolution
   - Render with transparency
   - Export as `reel-overlay.webp`

---

### Marquee Border

**Content**: Neon strip for top of machine

#### Step-by-Step

1. **Create marquee strip**:
   - Plane (6 units wide, 0.6 units tall)
   - Add loop cuts for segmented lights

2. **Bulb lights**:
   - Array of small spheres along strip
   - Emission material: Warm yellow #facc15, Strength 6.0
   - Alternate colors for variety

3. **Strip material**:
   - Chrome with reflections (Metallic 1.0, Roughness 0.05)

4. **Render**:
   - Orthographic, 600×60 px
   - Export as `marquee.webp`

---

## Symbol Sprites (3D-to-2D Workflow)

Create consistent, high-quality symbol sprites by rendering 3D models.

**Reference**: ART_ASSET_REQUIREMENTS.md § 1 (Symbol Sprites)  
**Required outputs**: 15 images (5 symbols × 3 states), 128×128 px each

### General Workflow for All Symbols

#### 1. Model the Symbol

Use simple geometry with good topology:

- **Cherry**: Two UV spheres + cylinder stem + simple leaf
- **Lemon**: UV sphere → Edit Mode → Sculpt into oval shape
- **Orange**: UV sphere with dimpled surface (Subdivision + Displacement)
- **Seven**: Text object with extrusion and beveled edges
- **Jackpot (Diamond)**: Default → Add Mesh → Brilliant Diamond (Extras add-on)

#### 2. Apply Materials

**Idle State** (default, vibrant):

```
Principled BSDF settings:
- Base Color: Symbol-specific (see color keys)
- Metallic: 0 (for fruit), 0.8 (for seven/diamond)
- Roughness: 0.3 (fruit), 0.1 (metal/gem)
- Specular: 0.5
- Subsurface Scattering (for fruit): 0.1
```

**Color keys** (from ART_ASSET_REQUIREMENTS.md):
- Cherry: #ef4444
- Lemon: #eab308
- Orange: #f97316
- Seven: #3b82f6
- Jackpot: #8b5cf6

#### 3. Setup Lighting

**3-point lighting rig** (save as template):

1. **Key Light**: Sun lamp, Strength 3.0, Angle 45° from front-top
   - Color: Warm white #fffaf0
2. **Fill Light**: Area lamp, Strength 1.0, 45° opposite side
   - Color: Slight blue #e0f2ff
3. **Rim Light**: Spot lamp, Strength 5.0, behind and above
   - Color: Cyan #06b6d4 (neon accent)
   - Creates outline glow

#### 4. Camera Setup

Orthographic camera for consistent framing:

- Position: Y=-10, looking at symbol
- Rotation: X=85° (slightly from above)
- Orthographic Scale: Adjust so symbol fills ~70% of frame
- Resolution: 128 × 128 px
- Render Properties → Film → Transparent: ✅ Enabled

#### 5. Render Idle State

- Samples: 256 (high quality for 128px image)
- Render → Save as `<symbol>-idle.png`

#### 6. Create Blur State

**Method 1: Motion Blur in Blender**
- Add Empty object at symbol location
- Animate Empty: Vertical movement (Z-axis) over 2 frames
- Parent symbol to Empty
- Enable Motion Blur (Render Properties → Motion Blur)
- Shutter: 1.0 (full blur)
- Render → Save as `<symbol>-blur.png`

**Method 2: Post-process in GIMP**
- Open `<symbol>-idle.png` in GIMP
- Filters → Blur → Motion Blur
- Angle: 270° (vertical), Length: 50 pixels
- Save as `<symbol>-blur.png`

#### 7. Create Glow State

In Blender:
1. Duplicate symbol material → Name "Glow"
2. Add Emission shader:
   - Mix Shader: Blend Principled BSDF (0.7) + Emission (0.3)
   - Emission color: Same as base color
   - Emission Strength: 5.0
3. Compositing:
   - Add Glare node (Fog Glow, Threshold 0.5, Mix 0.8)
4. Render → Save as `<symbol>-glow.png`

#### 8. Add Outline

**In GIMP** (post-process all three states):
1. Open image
2. Layer → Transparency → Alpha to Selection
3. Select → Grow → 3 pixels
4. Create new layer below
5. Fill selection with dark color #1a1a2e
6. Flatten image → Export as WebP

**In Blender** (Freestyle outlines):
- Enable Freestyle (Render Properties → Freestyle)
- Line Set: Edge Mark / Silhouette
- Thickness: 3.0 px
- Color: #1a1a2e
- Render with Freestyle enabled

#### 9. Export to WebP

Use ImageMagick:
```bash
for file in *.png; do
  magick "$file" -quality 90 "${file%.png}.webp"
done
```

Target file size: ≤15 KB (check with `ls -lh`)

---

### Symbol-Specific Notes

**Cherry**:
- Two spheres (fruit bodies) with Subsurface Scattering
- Cylinder stem (brown #78350f)
- Simple leaf plane with leaf shader

**Lemon**:
- Oval UV sphere
- Add bump texture (Clouds) for peel texture
- Specular highlight at top

**Orange**:
- UV sphere with Displacement modifier
- Voronoi texture for dimpled surface
- Warm gradient from orange to yellow at top

**Seven**:
- Text object: Font Bfont, Extrude 0.5, Bevel Depth 0.1
- Blue metallic material
- Strong rim light for edge definition

**Jackpot (Diamond)**:
- Brilliant Diamond mesh (Add Mesh → Extras)
- Glass material with Caustics
- Purple tint, high emission in glow state

---

## Particle Textures

Create soft, blendable particle textures for the particle system.

**Reference**: ART_ASSET_REQUIREMENTS.md § 4 (Particle Textures)  
**Required outputs**: 4 images (32×32, 16×16, 16×8, 24×24 px)

### General Setup

1. **Black background scene**:
   - World color: Pure black #000000
   - Ensures clean alpha transparency

2. **Camera**: Orthographic, centered on particle shape

### Sparkle (32×32)

1. **Create 4-point star**:
   - Add → Mesh → Plane
   - Edit Mode: Extrude points (E) outward in 4 cardinal directions
   - Scale to fit frame
2. **Material**: Emission white #ffffff, Strength 10.0
3. **Gradient fade**:
   - UV Map → Use Gradient texture from center
   - ColorRamp: White (center) → Transparent (edges)
4. **Render**: 32×32 px → Save as `particle-sparkle.png`

### Circle (16×16)

1. **UV Sphere**: Reduced to 16 segments
2. **Material**: Emission white, Strength 8.0
3. **Soft edge**: Gradient texture mapped from center
4. **Render**: 16×16 px → Save as `particle-circle.png`

### Confetti (16×8)

1. **Plane**: Scale to 2:1 ratio (rectangular)
2. **Material**: Emission white, Strength 6.0
3. **Rotate**: Random Z-rotation for variety
4. **Render**: 16×8 px → Save as `particle-confetti.png`

### Star (24×24)

1. **Add → Mesh → Star** (5 points)
2. **Material**: Emission white, Strength 8.0
3. **Bevel**: Slight bevel on points for soft edges
4. **Render**: 24×24 px → Save as `particle-star.png`

**All particles**:
- Export as PNG-24 with alpha transparency
- File size target: ≤2 KB (achieved with small dimensions)

---

## Export Settings & Optimization

### Render Output Settings

**For all assets**:
- File Format: PNG (export to WebP in post-processing)
- Color Depth: RGBA (8-bit per channel)
- Compression: 15 (good balance)
- Film → Transparent: ✅ Enabled (for assets with alpha)

### WebP Conversion

**Using ImageMagick** (recommended):
```bash
magick input.png -quality 85 output.webp
```

**Quality guidelines**:
- Symbols: 90 (minimal artifacts on small sprites)
- Backgrounds: 80-85 (larger file, lossy acceptable)
- UI Chrome: 85-90 (clean edges important)
- Particles: 90 (small files, want clean alpha)

**Verify file size**:
```bash
ls -lh *.webp
```

Target budgets (from ART_ASSET_REQUIREMENTS.md):
- Symbols: ≤15 KB
- Backgrounds: ≤200 KB
- Frame/UI: ≤80 KB (frame), ≤30 KB (overlay)
- Particles: ≤2 KB

### PNG Fallbacks

**Always create PNG fallback**:
```bash
magick input.png -quality 95 output.png
```

Fallbacks ensure compatibility with older browsers.

---

## Troubleshooting

### Performance Issues

**Problem**: Render takes too long
- **Solution**: Reduce samples (128 for simple scenes, 256 for complex)
- **Solution**: Use GPU rendering (Preferences → System)
- **Solution**: Simplify geometry (use modifiers instead of high poly counts)

**Problem**: Out of memory during render
- **Solution**: Render in tiles (Render Properties → Performance → Tiles)
- **Solution**: Reduce texture resolution
- **Solution**: Use instances instead of duplicates

### Visual Quality

**Problem**: Jagged edges on transparent objects
- **Solution**: Increase samples (256+)
- **Solution**: Enable Denoising (Render Properties → Denoising)
- **Solution**: Use Compositing → Filter → Despeckle

**Problem**: Neon glow not strong enough
- **Solution**: Increase Emission Strength (try 10-15)
- **Solution**: Add Glare node in Compositing (Fog Glow type)
- **Solution**: Render at higher bit depth, adjust in post

**Problem**: Colors don't match spec
- **Solution**: Verify Color Management settings (Filmic vs Standard)
- **Solution**: Use exact hex colors in material (ColorRamp node)
- **Solution**: Check monitor calibration

### File Size Issues

**Problem**: File size exceeds budget
- **Solution**: Reduce WebP quality (try 75-80)
- **Solution**: Reduce render resolution, scale up in post if needed
- **Solution**: Remove unnecessary alpha channel regions (crop in GIMP)

**Problem**: WebP has compression artifacts
- **Solution**: Increase quality (90-95) or use lossless WebP
- **Solution**: Simplify gradients in material (banding compresses poorly)

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

## Quick Reference: Asset Specifications

| Asset Category | Dimensions | Format | File Size | Key Requirements |
|---------------|-----------|--------|-----------|-----------------|
| Symbol sprites | 128×128 px | WebP/PNG | ≤15 KB | 3 states (idle/blur/glow), dark outline, vibrant colors |
| Backgrounds | 2560×1440 px | WebP/PNG | ≤200 KB | Transparent regions, tile-able (some layers), parallax-ready |
| Frame (cabinet) | 600×800 px | WebP/PNG | ≤80 KB | Transparent reel window, neon edges, 3 states |
| Reel overlay | 400×150 px | WebP/PNG | ≤30 KB | Glass reflection, subtle highlight |
| Marquee | 600×60 px | WebP/PNG | ≤30 KB | Neon strip, segmented lights |
| Particles | 32×32 px (max) | PNG | ≤2 KB | White color (tinted at runtime), soft edges, alpha transparency |

---

**Last updated**: 2026-02-16  
**Blender version**: 3.6 LTS or newer  
**Questions?** See [CONTRIBUTING.md](../../CONTRIBUTING.md) for how to ask
