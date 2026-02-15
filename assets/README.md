# Assets

This directory contains static assets used by the games.

## Structure

- `concept-art/` - Visual development and concept art for asset creation
- `images/` - Images, sprites, icons (production-ready assets)
- `sounds/` - Sound effects and music
- `styles/` - Global CSS and styling

## Guidelines

### Concept Art
- See `concept-art/README.md` for visual development workflow
- Art briefs define requirements before asset creation
- Concepts guide production assets (images, sprites, animations)
- Follow design-first workflow: Narrative → Concept → Asset → Implementation

### Images
- Use web-optimized formats (WebP, PNG, SVG)
- Keep file sizes small
- Use sprite sheets for multiple related images
- Include attribution for third-party assets

### Sounds
- Use compressed formats (MP3, OGG)
- Keep audio files small (< 100KB per sound)
- Normalize audio levels
- Provide both music and sound effect variants
- Include attribution for third-party assets

### Styles
- `common.css` - Shared styles across all games
- Use CSS custom properties for theming
- Follow mobile-first responsive design

## Licensing

All assets should be either:
- Created specifically for this project
- Public domain
- Licensed under permissive open-source licenses

Include proper attribution in comments where required.

## Status

🚧 Asset library to be populated as games are developed

Current status:
- ✅ `styles/common.css` - Common stylesheet
- ✅ `concept-art/` - Structure and art briefs created
  - ✅ Slot machine art briefs (celebration, environment, machine details)
  - ✅ Shared components planning
- ⏳ Concept art creation - Ready for artist assignment
- ⏳ Production assets - Awaiting concept approval
