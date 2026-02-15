# Machine Detail Concept Art

This directory contains close-up component studies of the slot machine's physical structure and parts.

## Purpose
Technical visual reference for asset creation, showing materials, construction, and component details.

## Art Brief
See parent directory: `../README.md` → Art Brief 03: Machine Component Close-ups

## Concepts Needed

### Primary Component Studies

#### 1. Reel Window / Viewing Glass
- [ ] Frontal view - Full window assembly
- [ ] Detail study - Glass material properties
- [ ] Detail study - Bezel and frame edge
- [ ] Detail study - Internal glow lighting
- [ ] State variations - Idle vs active vs winning

#### 2. Machine Frame / Cabinet Structure
- [ ] Front view - Overall cabinet shape
- [ ] 3/4 view - Depth and dimensionality
- [ ] Side view - Profile and thickness
- [ ] Detail study - Panel materials and finishes
- [ ] Detail study - Purple gradient application
- [ ] Detail study - Edge lighting channels

#### 3. Reel Mechanism Detail
- [ ] Reel drum assembly - How symbols wrap
- [ ] Symbol strip layout - Full reel unwrapped
- [ ] Mechanical elements - Stop mechanism
- [ ] Lighting setup - Backlight or internal light
- [ ] Motion states - Static vs spinning (blur)

#### 4. Control Panel / Credit Display
- [ ] Credit counter - LED/digital display style
- [ ] Last win display - Secondary info panel
- [ ] Display housing - Bezel and mounting
- [ ] Typography - Font and number style
- [ ] Lighting states - Dim, active, highlight

#### 5. Decorative Elements
- [ ] Title marquee - "Neon Night Market" logo treatment
- [ ] Neon accent strips - Installation and mounting
- [ ] Chrome/metallic accents - Highlight details
- [ ] Star/sparkle motifs - Decorative elements
- [ ] Edge lighting - Glow channels and distribution

#### 6. Material Studies
- [ ] Material swatches sheet:
  - Brushed aluminum (silver-blue)
  - Glossy black panel
  - Neon tube glass
  - Transparent acrylic (window)
  - Printed graphics (symbols)
  - Matte plastics (housing)
- [ ] Reflection behavior notes
- [ ] Wear and finish notes

### Supplementary Studies
- [ ] Full machine exploded view (parts separated)
- [ ] Assembly diagram (how parts connect)
- [ ] Scale reference (overall dimensions)
- [ ] Multi-angle turnaround (360° reference)

## File Naming Convention

```
detail-[component]-[view/state]-v[##].ext

Examples:
detail-reel-window-front-v01.png
detail-cabinet-3quarter-v01.png
detail-reel-mechanism-cutaway-v01.png
detail-credit-display-active-v01.png
detail-materials-swatches-v01.png
detail-full-machine-exploded-v01.png
```

## Drawing Specifications

- **Style**: Technical illustration with artistic polish
- **Accuracy**: Mechanically believable, functionally plausible
- **Annotations**: Label parts, dimensions, materials
- **Multiple angles**: Provide 2-3 views per component
- **Lighting notes**: Indicate light sources and glow areas

## Implementation Assets

From approved detail studies, extract:
- Component sprite sheets (different states)
- Material texture maps
- Lighting overlay templates
- Normal/depth maps (if using advanced rendering)
- 3D modeling reference (if going 3D route)
- Assembly animation keyframes

## Technical Considerations

- **Modularity**: Components should be reusable
- **State variations**: Idle, active, winning, disabled
- **Performance**: Sprite-based vs DOM-based rendering
- **Scalability**: Detail level for different zoom levels
- **Accessibility**: High contrast modes, reduced effects

## Status

- [ ] Component studies created
- [ ] Material swatches completed
- [ ] Multi-angle views documented
- [ ] Lighting states defined
- [ ] Concepts approved
- [ ] Assets enumerated
- [ ] Ready for production

---

**Current**: Awaiting concept creation  
**Next**: Individual component studies (start with reel window)  
**Reference**: Art Brief 03 in parent README
