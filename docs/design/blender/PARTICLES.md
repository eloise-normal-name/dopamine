# Particle Textures

Create soft, blendable particle textures for the particle system.

**Reference**: [ART_ASSET_REQUIREMENTS.md](../ART_ASSET_REQUIREMENTS.md) § 4 (Particle Textures)  
**Required outputs**: 4 images (32×32, 16×16, 16×8, 24×24 px)

**Prerequisites**: Complete [project setup](SETUP.md) first

---

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


---

**Next**: [Export & Optimization](EXPORT.md)
