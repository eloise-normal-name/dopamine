# Concept Art

Visual development for Dopamine games, powered by AI-assisted prompt-based exploration.

## How This Works

Dopamine takes a **prompt-first** approach to concept art. Rather than starting with sketches or mockups, we write evocative natural-language prompts and feed them into AI image generation tools (DALL-E, Midjourney, Stable Diffusion). The results are curated, refined, and iterated upon until we land on a visual direction that *feels* right.

This works because:
- **Prompts are cheap** — Exploring ten wildly different directions costs minutes, not days
- **AI shows you what you didn't know you wanted** — Unexpected outputs spark better ideas
- **Language captures feeling** — Describing a mood is often more useful than specifying pixel values
- **Iteration is fast** — Tweak a phrase, regenerate, compare, repeat

## Directory Structure

```
concept-art/
├── README.md                    # You are here
├── ARTIST_QUICKSTART.md         # How to start generating concepts
├── shared/                      # Cross-game UI and effects
│   └── README.md
└── slot-machine/                # "Neon Night Market Slots"
    ├── README.md                # Art briefs with technical specs
    ├── AI_IMAGE_GENERATION_PROMPTS.md  # ⭐ Creative prompts
    ├── celebration/             # Win/jackpot celebration concepts
    ├── environment/             # Night market background concepts
    └── machine-details/         # Cabinet and component concepts
```

## Concept Categories

### Celebration & Reward
The moments of payoff — wins, jackpots, achievements. These should feel like opening a gift: warm, surprising, and genuinely delightful. Not aggressive or overwhelming.

### Environment & Atmosphere
The world the player inhabits. For the slot machine, this is the "Neon Night Market" — a cozy, glowing urban nightscape that feels like a favorite late-night haunt. Depth and warmth without harshness.

### Machine & Component Details
The craft of the game itself. Reel windows, buttons, frames, materials. These should communicate quality and care — premium craftsmanship with personality.

### Shared Elements
UI components, particle effects, typography, and transitions that maintain visual consistency across all Dopamine games.

## Design Principles

- **Warm over harsh** — Controlled glow, inviting colors, cozy atmosphere
- **Playful over serious** — Arcade nostalgia, not Vegas intensity
- **Readable over detailed** — Clear at a glance, satisfying up close
- **Surprising over predictable** — Embrace creative accidents from AI generation

## Color DNA

The Dopamine visual signature across all games:

| Role | Colors | Feel |
|------|--------|------|
| Foundation | `#667eea` → `#764ba2` | Purple gradient — the Dopamine signature |
| Depth | `#1a1a2e` → `#16213e` | Deep night sky — mysterious, calm |
| Energy | `#06b6d4` | Electric cyan — bright without harsh |
| Warmth | `#ec4899` | Magenta — playful, inviting |
| Celebration | `#ffd700` | Gold — reward, triumph |

These colors guide but don't constrain. Beautiful variations and happy accidents are welcome.

## Getting Started

1. Read the [Artist Quickstart Guide](ARTIST_QUICKSTART.md)
2. Pick a creative direction from the [AI prompts](slot-machine/AI_IMAGE_GENERATION_PROMPTS.md)
3. Generate concepts with your AI tool of choice
4. Save the best results in the appropriate subdirectory
5. Iterate — each generation informs the next

## Naming Convention

```
<game>-<category>-<description>-v<##>.<ext>

Examples:
slot-celebration-golden-burst-v01.png
slot-environment-market-alley-v03.jpg
slot-detail-reel-window-v02.png
shared-particle-confetti-v01.png
```

## Status

- [x] Slot machine art briefs written
- [x] Creative prompt library created
- [x] Directory structure established
- [ ] Concept generation (ready to begin)
- [ ] Concept curation and selection
- [ ] Asset enumeration from approved concepts
