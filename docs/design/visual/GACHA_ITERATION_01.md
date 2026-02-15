# Gacha Iteration 01 (Design-First)

This document kicks off the gacha game iteration with narrative refinement, opinionated visual direction, and quick sample art. The core concept is a **repeated treasure-chest opening loop** — an endlessly watchable sequence of chests appearing, unlocking, and revealing loot.

## Narrative Focus (Iteration Goal)

**Theme:** *"Endless Hoard"*  
Replace the capsule-toy machine with a procession of treasure chests. Each chest lands, rattles with anticipation, cracks open, and reveals its prize in a burst of light. The viewer should feel *childlike wonder* — the same thrill as opening birthday presents, one after another, forever.

### Core Loop (Single Cycle)

```
1. CHEST ARRIVES   → A chest slides / drops into the stage area
2. ANTICIPATION    → Chest shakes, glows, rarity hint builds
3. OPEN            → Lid flies open, light spills out
4. REVEAL          → Prize rises from the chest with rarity-appropriate fanfare
5. COLLECT         → Prize shrinks into collection tray / counter updates
6. RESET           → Chest fades, stage clears, next chest arrives
```

The loop repeats indefinitely with variation in chest style, rarity tier, and reveal intensity.

## Opinionated Design Decisions

1. **Treasure chests, not capsules**  
   The gacha metaphor is a treasure chest — wooden, iron-banded, glowing keyhole. This grounds the experience in fantasy/adventure rather than toy-vending.

2. **Rarity telegraphed before the open**  
   The chest's visual treatment (size, glow color, shake intensity) hints at rarity *before* the lid lifts, building anticipation without spoiling the reveal.

3. **One chest at a time, center-stage**  
   Keep the viewport focused on a single chest. No grid, no multi-pull. Simplicity maximizes the drama of each reveal.

4. **Warm, fantasy palette**  
   Rich wood browns, antique gold hardware, jewel-tone glows (emerald common → sapphire rare → amethyst epic → molten gold legendary). Complement with the Dopamine purple gradient shell.

5. **Passive-first pacing**  
   The full open cycle should feel satisfying at ~4-6 seconds so the loop is mesmerizing as a background screen — fast enough to stay interesting, slow enough to read each beat.

6. **Dual-mode entertainment**  
   - **Passive/background mode**: ambient chest procession with harmonic timing, mesmerizing to glance at.  
   - **Active/attention mode**: rarity reveals escalate particles and sound, rewarding focused watching.

## Rarity Tiers & Visual Language

| Tier       | Probability | Chest Appearance                         | Glow Color       | Reveal Intensity        |
|------------|-------------|------------------------------------------|-------------------|-------------------------|
| Common     | 60%         | Small, plain wood, simple latch           | Soft green `#10b981` | Gentle sparkle           |
| Rare       | 30%         | Medium, iron bands, etched lid            | Cool blue `#3b82f6`  | Shimmer cascade          |
| Epic       | 9%          | Large, ornate carvings, gem inlay         | Deep purple `#8b5cf6` | Burst of magic particles |
| Legendary  | 1%          | Grand, gold-trimmed, pulsing aura         | Molten gold `#f59e0b` | Full-screen flash + rays |

### Pity System

After 90 consecutive non-legendary opens, the next chest is guaranteed legendary. A subtle counter or aura intensification hints at approaching pity.

## Sample Art (Low-Fidelity)

### A. Stage Layout Wireframe

```text
╔═══════════════════════════════════════╗
║         ✦ ENDLESS HOARD ✦            ║
║                                       ║
║           ┌───────────┐               ║
║           │  /‾‾‾‾‾\  │               ║
║           │ │ ✦  ✦  │ │  ← chest     ║
║           │ │       │ │               ║
║           │ └───────┘ │               ║
║           └───────────┘               ║
║                                       ║
║    ┌──────────────────────────┐        ║
║    │  OPENED: 142  │ ★ 3 ◆ 12│        ║
║    │   ★ = Legendary  ◆ = Epic │        ║
║    └──────────────────────────┘        ║
║       LAST FIND: Epic Amulet          ║
╚═══════════════════════════════════════╝
```

### B. Chest Style Direction

- **Common chest**: Simple rectangular box, warm cedar wood, thin iron latch, no ornament
- **Rare chest**: Slightly larger, horizontal iron bands, small keyhole plate, faint blue edge glow
- **Epic chest**: Ornate — carved scrollwork on lid, inset gemstone on front, visible purple luminescence through seams
- **Legendary chest**: Grand and golden — filigree corners, glowing keyhole, floating golden particles, chest subtly levitates

### C. Open Sequence Storyboard (Common)

```text
Frame 1: Chest sits center, idle bob animation
Frame 2: Chest shakes L-R (2 quick oscillations)
Frame 3: Lid cracks open, thin beam of green light
Frame 4: Lid fully open, item silhouette rises
Frame 5: Item revealed with soft sparkle ring
Frame 6: Item shrinks toward collection counter
Frame 7: Stage empty, next chest slides in from below
```

### D. Open Sequence Storyboard (Legendary)

```text
Frame 1: Grand gold chest descends from above with slow gravity
Frame 2: Stage lighting dims, chest pulses with golden aura
Frame 3: Heavy shake — screen subtly trembles
Frame 4: Lid bursts open — radial light explosion, particles shower outward
Frame 5: Silhouette rises dramatically (slower, larger)
Frame 6: Full reveal — item glows, text banner "★ LEGENDARY ★" appears
Frame 7: Celebration hold (confetti, sparkle rain) for 2 seconds
Frame 8: Item collected, counter updates with golden flash
Frame 9: Stage resets, normal pacing resumes
```

## Animation Pacing

### Motion Timing Table

| Event               | Duration (ms) | Easing                        | Notes                          |
|----------------------|---------------|-------------------------------|--------------------------------|
| Chest entrance       | 600           | `cubic-bezier(0.34, 1.56, 0.64, 1)` | Overshoot bounce arrival (value >1 is intentional — creates spring effect) |
| Idle bob             | 2000          | `ease-in-out`                 | Continuous until open triggers |
| Anticipation shake   | 400           | `linear`                      | 4 oscillations, ±3px          |
| Lid open             | 500           | `cubic-bezier(0.22, 1, 0.36, 1)` | Starts slow, accelerates    |
| Light burst          | 300           | `ease-out`                    | Opacity 0→1→0.6               |
| Item rise            | 800           | `cubic-bezier(0.16, 1, 0.3, 1)` | Decelerate into position    |
| Item hold (reveal)   | 1200          | —                             | Static display with sparkle   |
| Item collect (shrink)| 400           | `ease-in`                     | Scale down + translate to tray|
| Stage clear          | 300           | `ease-out`                    | Fade to ready state           |

**Total common cycle: ~4.5s** (some phases overlap)  
**Total legendary cycle: ~8s** (longer hold, celebration phase)

### Harmonic Timing

Loop durations align to powers of 2 seconds for ambient rhythm:
- Idle bob: 2s
- Full common cycle: ~4s active + brief pause ≈ 6s
- Background particle loop: 8s

## Inspirations Used in This Iteration

- **Genshin Impact** (gacha pull reveal theatrics, rarity escalation)
- **The Legend of Zelda** (treasure chest opening animation — lid flip, item rise, jingle)
- **Candy Crush Saga** (reward readability and juicy visual feedback)
- **Vaporwave Aesthetic** (purple-neon palette shell)
- **Disney animation principles** (anticipation → action → follow-through for chest open)

See also: [../REFERENCES.md](../REFERENCES.md)

## How to Find References (Image-First)

### Target Source Categories

- **Steam** (store pages with treasure/loot chest games)
- **iOS App Store / Google Play** (gacha and loot box game screenshots)
- **Design portfolio sites** (Behance, Dribbble — chest UI and loot reveal mockups)
- **Game wikis** (screenshot galleries of chest-open sequences)
- **Asset marketplaces** (itch.io, Unity Asset Store — treasure chest sprite packs)
- **Video platforms** (YouTube gacha pull compilations for pacing reference)

### Copy/Paste Search Queries (Vibe-Focused)

- `treasure chest opening animation game UI`
- `gacha pull reveal effect fantasy`
- `loot box open sequence particles glow`
- `fantasy treasure chest pixel art sprites`
- `chest opening reward screen mobile game`
- `RPG treasure chest animation frames`
- `steam treasure chest loot game screenshots`
- `behance gacha loot box UI design`
- `itch.io treasure chest game assets`
- `legendary loot reveal animation particles gold`

### Selection Criteria

1. Pick sources that show **3+ screenshots or animation frames** of chest-open sequences.
2. Prefer pages that include both:
   - **Close-up shots** (chest detail, latch, lid motion, light burst)
   - **Full-scene context** (stage/background, collection UI, rarity indicators)
3. Keep a **mobile + PC/console mix**:
   - At least 40% mobile game references (for compact layout ideas)
   - At least 40% desktop/console references (for cinematic reveal quality)
4. Favor references with strong rarity differentiation:
   - Distinct chest designs per tier
   - Escalating reveal intensity
   - Clear visual hierarchy
5. Favor sources that are **agent-usable for mockup workflows**:
   - Stable public URLs
   - Visible image grids/carousels in browser
   - Enough visual detail to derive asset lists and layout specs

### Logging Template (Use for Every New Source)

```md
### [Ref ##] Source name
- Source category: Steam | iOS App Store | Google Play | Design portfolio | Game wiki | Asset marketplace | Video platform | Visual curation board
- Page link: <url>
- Query used: "<exact query>"
- What to copy: chest design | open animation | rarity effects | UI layout | particle treatment
- Where images are on the page: screenshot carousel | project gallery | thumbnail grid | video frames
- Quick usage note: inspiration only; don't reuse assets; check source licensing before production use.
```

## Future Agent Handoff Note

- Use the reference queries above to collect **specific visual references** of treasure chest opening sequences, then produce **layout mockups** (idle state, mid-open, reveal, collect).
- As mockups are created, maintain an **asset enumeration list** (chest variants per rarity, lid animation frames, particle sprites, glow layers, UI elements, audio triggers).
- The next design task will add **detailed user scenarios**. Prepare by tagging references/mockups to scenario moments (chest arrive, anticipation build, open burst, rarity reveal, collect, reset).
- Consider how the **collection tray / counter UI** should display cumulative stats (total opened, per-rarity counts, last legendary).

## Ready-for-Implementation Checklist

- [x] Narrative angle chosen (treasure chests, not capsules)
- [x] Core loop defined (arrive → anticipate → open → reveal → collect → reset)
- [x] Visual hierarchy and rarity system defined
- [x] Opinionated design decisions documented
- [x] Initial sample art / wireframes provided
- [x] Animation pacing and motion timing table created
- [x] Reference collection process and search queries prepared
- [ ] Collect first external reference batch (target: 20+ entries)
- [ ] Convert sample art into visual mockup PNG/SVG
- [ ] Define prize/item catalog (what items appear inside chests)
- [ ] Audio design pass (sounds per phase of the open cycle)
- [ ] Detailed user scenarios (attract/idle, first open, streak, pity trigger)
