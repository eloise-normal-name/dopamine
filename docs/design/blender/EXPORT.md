# Export Settings & Optimization

File export, format conversion, and troubleshooting guide for Blender-rendered assets.

**Prerequisites**: Complete asset rendering from the specific workflow guides

---

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


---

**See also**: [Art asset requirements](../ART_ASSET_REQUIREMENTS.md) | [Asset workflow](../ASSET_WORKFLOW.md)
