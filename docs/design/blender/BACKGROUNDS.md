# Background Environment Layers

Create parallax background layers for the "Neon Night Market" slot machine scene.

**Reference**: [ART_ASSET_REQUIREMENTS.md](../ART_ASSET_REQUIREMENTS.md) § 2 (Background Environment Layers)  
**Required outputs**: 4 layers at 2560×1440 px, WebP format, ≤200 KB each

**Prerequisites**: Complete [project setup](SETUP.md) first

---

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


---

**Next**: [Machine Frame & UI Chrome](FRAMES.md) | [Symbol Sprites](SYMBOLS.md) | [Export & Optimization](EXPORT.md)
