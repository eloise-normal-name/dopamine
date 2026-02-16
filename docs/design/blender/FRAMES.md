# Machine Frame & UI Chrome

Create the slot machine cabinet and UI elements with realistic materials.

**Reference**: [ART_ASSET_REQUIREMENTS.md](../ART_ASSET_REQUIREMENTS.md) § 3 (Machine Frame & UI Chrome)  
**Required outputs**: 5 images (600×800 frame, 400×150 overlay, 600×60 marquee)

**Prerequisites**: Complete [project setup](SETUP.md) first

---

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


---

**Next**: [Symbol Sprites](SYMBOLS.md) | [Particle Textures](PARTICLES.md) | [Export & Optimization](EXPORT.md)
