# Blender Project Setup

Initial Blender configuration for creating Dopamine game assets.

**Prerequisites**: Blender 3.6 LTS or newer ([download](https://www.blender.org/))

---

## Initial Blender Configuration

Before creating assets, set up Blender for web-optimized rendering:

1. **Create a new project**: File → New → General
2. **Set render engine**: Switch to **Cycles** (Render Properties → Render Engine → Cycles)
   - Better for realistic materials and lighting
   - Use GPU if available (Preferences → System → Cycles Render Devices)
3. **Configure color management**: Render Properties → Color Management
   - View Transform: **Filmic** (for cinematic tone) or **Standard** (for saturated colors)
   - Look: **Medium High Contrast** for vibrant neon aesthetics
4. **Set output resolution**: Output Properties
   - Resolution will vary per asset (detailed in each workflow guide)
   - **Film → Transparent**: Enable for assets with alpha channel

## Workspace Organization

Create a dedicated workspace for game asset creation:

1. **Top menu**: Click the `+` next to workspace tabs
2. **Add workspace**: Name it "Game Assets"
3. **Split viewport**: Add a UV Editor and Shader Editor for material work
4. **Save startup file**: File → Defaults → Save Startup File

---

## Next Steps

Once your project is configured, proceed to the specific asset workflow guides:

- [Background Environment Layers](BACKGROUNDS.md) — Parallax scene layers
- [Machine Frame & UI Chrome](FRAMES.md) — Cabinet and UI elements
- [Symbol Sprites](SYMBOLS.md) — 3D-to-2D rendered symbols
- [Particle Textures](PARTICLES.md) — Soft particle sprites
- [Export & Optimization](EXPORT.md) — File conversion and troubleshooting

---

**See also**: [Main Blender guide](../BLENDER_ASSET_CREATION.md) | [Art asset requirements](../ART_ASSET_REQUIREMENTS.md)
