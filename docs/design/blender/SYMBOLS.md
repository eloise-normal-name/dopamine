# Symbol Sprites (3D-to-2D Workflow)

Create consistent, high-quality symbol sprites by rendering 3D models.

**Reference**: [ART_ASSET_REQUIREMENTS.md](../ART_ASSET_REQUIREMENTS.md) § 1 (Symbol Sprites)  
**Required outputs**: 15 images (5 symbols × 3 states), 128×128 px each

**Prerequisites**: Complete [project setup](SETUP.md) first

---

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


---

**Next**: [Particle Textures](PARTICLES.md) | [Export & Optimization](EXPORT.md)
