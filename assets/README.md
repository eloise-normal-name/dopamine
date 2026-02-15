# Assets

This directory contains static assets used by the games.

## Structure

- `concept-art/` - Visual development and AI-generated concept art
- `images/` - Production-ready images, sprites, icons
- `sounds/` - Sound effects and music
- `styles/` - Global CSS and styling

## Guidelines

### Concept Art
- See [`concept-art/README.md`](concept-art/README.md) for the prompt-based visual development workflow
- Art briefs define creative direction before asset production begins
- Follow design-first pipeline: Narrative → References → Briefs → Concepts → Assets

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
- ✅ `concept-art/` - Visual development pipeline established
  - ✅ Slot machine art briefs and creative prompts
  - ✅ Directory structure for concept generation output
- ⏳ Concept art generation (ready for AI image tools)
- ⏳ Production asset creation
