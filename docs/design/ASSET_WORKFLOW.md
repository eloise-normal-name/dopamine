# Asset Development Workflow

How Dopamine moves from a spark of an idea to polished, production-ready game art.

## Overview

Every game asset in Dopamine follows the same journey through seven phases. The process is deliberately front-loaded with imagination and discovery so that by the time we're cutting sprites and optimizing PNGs, we know *exactly* what we're building — and why it feels right.

## The Seven Phases

```
 ┌─────────────┐     ┌──────────────┐     ┌──────────────┐     ┌───────────────┐
 │ 1. Narrative │ ──▶ │ 2. Reference │ ──▶ │ 3. Art Brief │ ──▶ │ 4. Concepting │
 └─────────────┘     └──────────────┘     └──────────────┘     └───────────────┘
                                                                       │
 ┌──────────────────┐     ┌────────────────┐     ┌──────────────┐      │
 │ 7. Integrate     │ ◀── │ 6. Production  │ ◀── │ 5. Enumerate │ ◀───┘
 └──────────────────┘     └────────────────┘     └──────────────┘
```

### Phase 1 — Narrative

Write the story of the player experience. Not a spec sheet — a *feeling*.

- What emotions should the game evoke?
- What does the world feel like to inhabit?
- What is the moment-to-moment rhythm?

**Output**: Game entry in `/docs/design/NARRATIVES.md`
**Example**: The slot machine narrative describes "cozy anticipation" — the pleasure of wondering "will this match?" — like popping bubble wrap.

### Phase 2 — Reference Collection

Gather visual and experiential references that capture the intended feel.

- Screenshots, mood boards, color palettes
- Videos of similar games and interactions
- Real-world inspiration (environments, textures, lighting)

**Output**: Reference links and notes in `/docs/design/REFERENCES.md`
**Example**: 36 visual references for the slot machine covering vaporwave aesthetics, neon signage, arcade cabinets, and candy-colored UI.

### Phase 3 — Art Briefs

Translate the narrative and references into structured creative directions.

Each brief specifies:
- The emotional target (what it should *feel* like)
- Visual anchors (specific elements, compositions, palettes)
- Technical constraints (dimensions, format, performance)
- Priority level and relationship to other briefs

**Output**: Art brief documents in `/assets/concept-art/<game>/README.md`

### Phase 4 — Concept Art (Prompt-Based)

This is where Dopamine's approach differs from traditional pipelines.

We use **AI-generated prompts** as the primary tool for visual exploration. Instead of hand-drawing concepts, we:

1. **Craft evocative prompts** — Written to inspire AI image tools, not to prescribe exact outputs
2. **Generate broadly** — Run prompts through DALL-E, Midjourney, Stable Diffusion for diverse interpretations
3. **Curate ruthlessly** — Select results that capture the intended feeling
4. **Iterate rapidly** — Refine prompts based on discoveries, then generate again
5. **Embrace surprises** — Unexpected results often reveal the best creative direction

See `/assets/concept-art/slot-machine/AI_IMAGE_GENERATION_PROMPTS.md` for the prompt library.

**Output**: Curated concept images saved in category subdirectories

### Phase 5 — Asset Enumeration

Break approved concepts into a concrete list of production assets.

- Individual sprites, backgrounds, UI elements
- Animation frames and state variations
- Particle textures and effect components
- Size requirements, format targets, performance budgets

**Output**: Asset checklist added to the game's concept art README

### Phase 6 — Asset Production

Create optimized, game-ready files from the approved concepts.

- Web-optimized formats (WebP, SVG, compressed PNG)
- Sprite sheets for related animation frames
- Multiple resolution variants if needed
- Performance testing (target: 60fps with all assets loaded)

**Output**: Production files in `/assets/images/<game>/`

### Phase 7 — Integration

Wire assets into the running game.

- Import and reference from game code
- Verify animations and transitions feel right at runtime
- Performance profiling and optimization
- Accessibility review (reduced motion, color contrast)

**Output**: Working game with visual assets

## Current Status

### Slot Machine: "Neon Night Market"

| Phase | Status | Notes |
|-------|--------|-------|
| 1. Narrative | ✅ Complete | See NARRATIVES.md |
| 2. References | ✅ Complete | 36 sources in SLOT_MACHINE_ITERATION_01.md |
| 3. Art Briefs | ✅ Complete | 3 briefs in /assets/concept-art/slot-machine/ |
| 4. Concept Art | ⏳ Ready | Prompts written, awaiting generation |
| 5. Enumeration | ⏳ Pending | Follows concept art |
| 6. Production | ⏳ Pending | — |
| 7. Integration | ⏳ Pending | — |

### Other Games

| Game | Phase | Notes |
|------|-------|-------|
| Gacha | 1. Narrative | Narrative drafted in NARRATIVES.md |
| Dice Roll | Not started | — |
| Card Flip | Not started | — |

## Principles

- **Design before code** — No asset work begins without a narrative and references
- **Feeling before fidelity** — A rough concept that *feels* right beats a polished one that doesn't
- **Prompt before pixel** — AI-assisted concepting enables faster exploration
- **Iterate quickly, commit slowly** — Generate many options before selecting a direction
