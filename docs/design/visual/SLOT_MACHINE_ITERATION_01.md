# Slot Machine Iteration 01 (Design-First)

This document starts slot-machine iteration with narrative refinement, opinionated visual direction, and quick sample art.

## Narrative Focus (Iteration Goal)

**Theme:** *"Neon Night Market Slots"*  
A configurable multi-reel slot machine (1-6 reels) that evolves from simple patterns to complex reward systems. Viewers gradually discover and understand the reward mechanics through passive observation, creating a satisfying learning curve. The tone shifts from casino realism to playful arcade nostalgia with an element of pattern discovery. The viewer should feel *curious anticipation* and *gradual mastery* rather than high-stakes tension.

## Opinionated Design Decisions

1. **High-legibility over realism**  
   Use bold icon silhouettes and thick outlines so reel outcomes are readable at a glance.
2. **Warm win language**  
   Wins should pulse and sparkle, never flash aggressively.
3. **One strong visual hook**  
   Keep the purple Dopamine gradient UI shell, but make the reel window feel like a glowing marquee.
4. **Layered visual depth**  
   Move beyond flat simplicity with parallax background layers, atmospheric particles, and animated environmental elements that create a living, breathing night market scene.
5. **Configurable complexity**  
   Support 1-6 reels with adaptive layout. Start viewers with simpler patterns (3 reels, basic paylines) and allow progression to complex patterns (5-6 reels, multi-dimensional matching).
6. **Discoverable reward patterns**  
   Reward system reveals itself through observation. Visual cues highlight pattern types without explicit tutorials. Viewers learn by watching, building mental models of how wins work.
7. **Animation pacing**  
   Reels should stop left → right with clear delay so anticipation is readable even when passively watching. Delay scales with reel count for dramatic effect.

## Multi-Reel System & Pattern Discovery

### Configurable Reel Architecture (1-6 Reels)

**Core Concept:** The slot machine adapts from simple to complex configurations, allowing viewers to gradually build understanding of reward patterns through observation.

#### Reel Configuration Tiers

**Tier 1: Foundation (1-2 Reels)**
- Single or double reel matching
- Simple direct matches (symbol A = symbol A)
- Learning outcome: Basic symbol recognition
- Use case: Quick demo mode, initial viewer onboarding

**Tier 2: Classic (3 Reels)**
- Traditional three-reel paylines (left-to-right)
- Introduction to sequential matching
- Learning outcome: Understanding of payline concept
- Use case: Familiar entry point for casual viewers

**Tier 3: Intermediate (4 Reels)**
- Multiple paylines (horizontal, diagonal)
- Introduction to pattern variety
- Learning outcome: Discovery that wins can form different shapes
- Use case: Building complexity without overwhelming

**Tier 4: Advanced (5 Reels)**
- Cluster pays (adjacent symbols)
- Scatter wins (position-independent)
- Multiplier symbols affect nearby wins
- Learning outcome: Position relationships matter in multiple ways
- Use case: Engaged viewers seeking depth

**Tier 5: Expert (6 Reels)**
- Multi-dimensional patterns (L-shapes, T-shapes, boxes)
- Cascading reels (winning symbols disappear, new ones fall)
- Symbol transformations (wilds expand, symbols morph)
- Learning outcome: Complex pattern recognition, emergent strategies
- Use case: Long-term viewers building mastery

### Progressive Complexity Reward Patterns

#### Pattern Categories (Viewers Discover Through Observation)

**1. Linear Patterns** (Easiest to learn)
- Horizontal lines: `[A][A][A]` across reels 1-2-3
- Vertical lines: Matching symbols in same reel position across spins (streak tracking)
- Diagonal lines: `[A]` reel1-pos1, `[A]` reel2-pos2, `[A]` reel3-pos3
- **Visual cue:** Connecting line animates from left→right showing the match path

**2. Cluster Patterns** (Medium difficulty)
- Adjacent matches: Any 3+ matching symbols touching horizontally or vertically
- Mega clusters: 6+ symbols form massive wins
- **Visual cue:** Matched symbols glow and pulse together, showing they're a "group"

**3. Scatter Patterns** (Medium-high difficulty)
- Position-independent: 3+ of same symbol anywhere on reels = win
- Bonus triggers: Special scatter symbols unlock bonus events
- **Visual cue:** Scatter symbols shoot light beams to each other, forming constellation-like connections

**4. Shape Patterns** (High difficulty)
- L-shapes: Corners and edges form specific geometric patterns
- T-shapes, Plus-signs, Boxes (2×2, 3×3)
- **Visual cue:** Pattern outline traces itself in neon, highlighting the discovered shape

**5. Transformation Patterns** (Expert difficulty)
- Wild expansions: Wild symbol expands vertically/horizontally to complete patterns
- Symbol morphs: Adjacent symbols transform into matching set
- Cascades: Winning symbols removed, new symbols fall creating chain reactions
- **Visual cue:** Transformation animations show the before→after change explicitly

### Gradual Learning Through Visual Storytelling

**Discovery Mechanisms** (How viewers learn without tutorials):

#### Progressive Revelation System
1. **First 10 spins:** Only linear patterns possible (3-reel mode), clear line animations
2. **Spins 11-30:** Introduce one scatter pattern, light beam visual shows position-independence
3. **Spins 31-60:** Unlock cluster patterns, glowing groups teach adjacency concept
4. **Spins 61-100:** Enable shape patterns, neon tracing reveals geometric matching
5. **Spins 100+:** Full complexity available, cascades and transformations create "aha!" moments

#### Visual Learning Aids (No Text Tutorials)
- **Pattern History Display:** Last 5 wins shown as small icons above reels (viewers see pattern variety)
- **Highlight Hints:** On no-win spins, briefly highlight almost-patterns (near-misses teach what to look for)
- **Celebration Intensity:** Bigger patterns = bigger particle explosions (implicitly teaching value hierarchy)
- **Symbol Relationships:** Symbols that frequently appear together develop subtle visual affinity (shared color accents)

#### Passive Observation Learning Curve
**Minute 1-2:** "Symbols match, lights happen"
**Minute 3-5:** "Lines make wins, different symbols have different celebrations"
**Minute 6-10:** "Wait, that diagonal counted too? Interesting..."
**Minute 11-20:** "Those three anywhere triggered something special"
**Minute 21-40:** "I'm starting to predict what will win before the celebration fires"
**Minute 41+:** "I understand the patterns now, and I'm curious what new ones might appear"

### Multi-Reel Layout Adaptation

#### Responsive Reel Grid Design

**1-Reel Mode:** Vertical emphasis, single column, large symbols (128px)
```
┌────────┐
│ CHERRY │
└────────┘
```

**2-Reel Mode:** Balanced pair, medium symbols (96px)
```
┌────────┬────────┐
│ CHERRY │ CHERRY │
└────────┴────────┘
```

**3-Reel Mode:** Classic slot proportions (80px)
```
┌────────┬────────┬────────┐
│ CHERRY │  SEVEN │ CHERRY │
└────────┴────────┴────────┘
```

**4-Reel Mode:** Widescreen, symbols 64px
```
┌──────┬──────┬──────┬──────┐
│CHERRY│ SEVEN│CHERRY│LEMON │
└──────┴──────┴──────┴──────┘
```

**5-Reel Mode:** Premium slot standard, 56px symbols
```
┌────┬────┬────┬────┬────┐
│ CH │ 7  │ CH │ LE │ OR │
└────┴────┴────┴────┴────┘
```

**6-Reel Mode:** Maximum complexity, 48px symbols with tighter spacing
```
┌───┬───┬───┬───┬───┬───┐
│CH │ 7 │CH │LE │OR │JP │
└───┴───┴───┴───┴───┴───┘
```

**Responsive Breakpoints:**
- Mobile (320-767px): Max 4 reels (space constraint)
- Tablet (768-1023px): Max 5 reels
- Desktop (1024px+): Full 6-reel support

## Attention-Grabbing & Differentiating Features

### Core Philosophy: Dual-Mode Entertainment + Progressive Discovery
This slot machine serves two viewing modes simultaneously:
- **Passive Background Mode**: Mesmerizing ambient animation that works as desk/stream companion
- **Active Hypnotic Mode**: Engaging visual hooks and micro-events that reward sustained attention
- **Discovery Mode**: Viewers build understanding of complex patterns through observation, creating satisfying "eureka" moments

### Key Differentiating Features

#### 1. Living Night Market Environment
**What makes it compete:** Instead of static casino floor or generic background, the game exists inside a fully animated night market scene.

- **Parallax depth layers** (3-5 layers):
  - Far background: City skyline silhouette with slow-moving window lights
  - Mid background: Market stalls with hanging lanterns that sway gently
  - Near background: Neon signs with animated kanji/symbols cycling through colors
  - Foreground: Occasional floating paper lanterns or fireflies drifting across the view
  
- **Environmental micro-events** (every 30-90 seconds):
  - Passing pedestrian silhouette crosses behind the machine
  - Market vendor arranges items in peripheral stall
  - Distant firework burst illuminates the sky
  - Neon sign flickers and re-stabilizes
  - These are subtle enough for background mode but rewarding to notice

**Genre-appropriate:** Many modern slots have themed environments, but most are static. This makes the background active without being distracting.

#### 2. Symbol Evolution & Reactive Machine
**What makes it compete:** Symbols aren't just spinning icons—they respond to game state and build visual narrative.

- **Symbol micro-animations** (idle state):
  - Cherry: subtle bob and glossy highlight shift (breathing effect)
  - Lemon: interior glow pulses like bioluminescence
  - Orange: segments rotate slowly showing different facets
  - Seven: metallic surface reflects passing environmental lights
  - Jackpot: star points twinkle in sequence, magenta particles orbit

- **Reactive machine frame**:
  - Win streaks: Frame glow intensifies, color shifts (purple → gold → magenta)
  - Near-misses: Brief frame pulse and subtle shake
  - Jackpot ready: Corner ornaments pulse in sequence (building anticipation)
  - Loss streaks: Frame dims slightly (recovers on next win)

**Genre-appropriate:** Reactive UI is standard in premium slots. This adds polish-level feedback without reinventing mechanics.

#### 3. Cascade Particle System
**What makes it compete:** Wins trigger multi-layered particle effects that fill the screen space elegantly.

- **Win tier particle cascades**:
  - **Small win**: Confetti burst from matching symbols (200 particles, 1s duration)
  - **Medium win**: Neon light trails arc across the screen (400 particles, 1.5s)
  - **Big win**: Cherry blossom petals spiral upward with sparkles (800 particles, 2s)
  - **Jackpot**: Full-screen particle explosion with market lanterns floating up, neon light beams radiating outward, and holographic text shimmer (2000+ particles, 3-4s)

- **Particle physics**:
  - Gravity, wind drift, and fade-out for natural motion
  - Particles interact with depth layers (some behind machine, some in front)
  - Color-coded to symbol themes (cherry particles are red, jackpot are gold/magenta)

**Genre-appropriate:** Modern slots heavily use particle effects. This adds visual luxury and screen presence.

#### 4. Persistent Ambient Animation Loop
**What makes it compete:** The game never truly idles—there's always something moving.

- **Continuous motion elements**:
  - Neon tubes: Animated glow pulse traveling through marquee border (4-second loop)
  - Background lanterns: Gentle swing animation (8-second loop, offset timing)
  - Market atmosphere: Heat haze effect above distant food stalls
  - Reel reflections: Environmental lights reflect on reel glass (changes with background events)
  - Credit counter: Numbers have subtle shimmer even when static

- **Hypnotic rhythm**:
  - Animations use harmonic timing (loops at 2s, 4s, 8s intervals)
  - Creates satisfying visual "beats" without being repetitive
  - No two 30-second windows look identical due to micro-event randomization

**Genre-appropriate:** Premium slots use ambient animation. This makes every frame interesting for passive viewing.

#### 5. Dynamic Symbol Depth & Reel Mechanics
**What makes it compete:** Reels have physical presence and believable motion.

- **3D reel cylinder illusion**:
  - Symbols appear on curved reel surface (subtle perspective distortion)
  - Symbols above/below visible window show partial peek (creates depth)
  - Shadow gradient suggests reel cylinder depth
  - Light reflection moves across spinning reel surface

- **Enhanced spin physics**:
  - Reel acceleration: slight "catch" at spin start (mechanical feel)
  - Deceleration bounce: overshoot by 1-2 symbols then settle back (satisfying physics)
  - Stop impact: subtle screen shake on each reel stop (haptic-style feedback)
  - Sound synchronization: click sounds match visible ratchet positions

**Genre-appropriate:** 3D reel presentation is industry-standard. This adds physical believability.

#### 6. Attention-Pulse System (Passive → Active Transition)
**What makes it compete:** Game subtly draws focus when something interesting happens.

- **Escalating attention cues**:
  - Near-miss (2/3 symbols matched): Frame pulse + spotlight effect on third reel
  - Streak building (3+ wins): Background begins color-shift animation
  - Jackpot symbol visible: Faint glow ray points from symbol to jackpot meter
  - Long idle (60s+): One random element does a "hey, look at me" animation (reel symbol waves, neon sign flashes message)

- **Gentle escalation**:
  - Cues start subtle (can be ignored in background mode)
  - Build in intensity for active viewers
  - Never intrusive or anxiety-inducing

**Genre-appropriate:** Modern slots use attention management. This makes it work for both engagement styles.

#### 7. Micro-Narrative System
**What makes it compete:** Symbols and environment tell a tiny story over time.

- **Symbol personality**:
  - Cherry acts "cheerful" (bouncy idle animation, happy particle trails on win)
  - Seven acts "prestigious" (slow rotation, metallic gleam, sophisticated particles)
  - Jackpot acts "magical" (ethereal glow, sparkle orbit, special win SFX)

- **Environmental story beats**:
  - Market vendors occasionally "notice" big wins (silhouette turns toward screen)
  - Lanterns brighten during win celebrations (environmental sympathy)
  - Background music tempo subtly increases during win streaks
  - Night deepens or lightens based on credit balance (environmental mood)

**Genre-appropriate:** Themed slots often have narrative elements. This adds character without cutscenes.

### Why This Avoids "Student Project" Appearance

**Professional polish markers:**
1. **Layered complexity**: Multiple depth planes with independent animation systems (requires production pipeline)
2. **Particle budget**: 2000+ particles for jackpot (shows technical capacity)
3. **Harmonic timing**: All animations use musical timing relationships (shows design sophistication)
4. **Persistent ambient motion**: Never static (premium slots never sleep)
5. **Reactive environmental storytelling**: Background responds to gameplay (integrated systems)
6. **Physical believability**: Realistic reel physics and lighting (attention to craft)

**Differentiation without divergence:**
- All features exist in premium slot games individually
- Unique combination: Night market theme + dual-mode design + environmental reactivity
- Genre-appropriate mechanics (3-reel, paylines, symbols) with presentation innovation
- Players instantly understand it's a slot machine, but notice it's a _crafted_ one

### Production Feasibility

**Asset requirements:**
- 3-5 parallax background layers (illustrative or photo-composite)
- 15-20 animated environmental elements (neon signs, lanterns, silhouettes)
- 5 symbol base designs + 5 animated variants + 5 win-state variants
- 4-tier particle systems (200-2000 particles per tier)
- Reel frame with 4 reactivity states
- 8-12 sound effects with environmental ambient track

**Technical implementation:**
- CSS animations + JavaScript for logic (no WebGL required, though could enhance)
- Layered DOM elements with z-index depth
- Particle system: Canvas 2D or CSS transform-based
- All animations target 60fps on mid-tier devices

**Timeline alignment:**
- Concept art phase: 2-3 weeks (environment, symbols, particles)
- Asset production: 3-4 weeks (illustration, animation frames)
- Implementation: 2-3 weeks (code + integration)
- Polish: 1-2 weeks (timing, particle tuning, sound mix)
- **Total: 8-12 weeks** (professional but achievable)

## Sample Art (Low-Fidelity)

### A. Reel Window Wireframe

```text
+---------------------------------+
|     * NEON NIGHT MARKET *      |
| +--------+--------+----------+ |
| | CHERRY |   7    |  LEMON   | |
| +--------+--------+----------+ |
|        CREDITS: 01240          |
|         LAST WIN: +20          |
+---------------------------------+
```

### B. Symbol Style Direction

- **Cherry**: rounded, glossy highlight, thick dark outline
- **Lemon**: slightly flattened oval, bright center highlight
- **Orange**: segmented interior mark for instant differentiation
- **Seven**: metallic gradient with subtle cyan edge glow
- **Jackpot**: star coin icon with gold + magenta sparkle accent

## Inspirations Used in This Iteration

- **Traditional Slot Machines** (anticipation/reveal loop)
- **Candy Crush Saga** (reward readability and juicy feedback)
- **Vaporwave Aesthetic** (purple-neon palette direction)
- **Disney animation principles** (anticipation + easing for reel stop)

See also: [../REFERENCES.md](../REFERENCES.md)

## How to find references (image-first)

### Target source categories

- **Steam** (store pages + search pages with capsule art/screenshots)
- **iOS App Store** (app previews + screenshot strips)
- **Google Play** (feature graphics + screenshot carousels)
- **Casino demo/review sites** (in-game screenshot galleries + symbol/paytable panels)
- **Slot theme aggregators** (theme-tagged slot lists and thumbnails)
- **Design portfolio/mockup sites** (high-fidelity concept shots and key art)
- **Photo/media archives** (real machine photography and historical visuals)
- **Reference/encyclopedia sources** (terminology and historical image context)
- **Manufacturer product galleries** (cabinet form factors and control-panel patterns)
- **Asset marketplaces / curation boards** (style exploration and motif diversity)

### Agent-usable source priority (for mockup production)

Prioritize sources that agents can reliably inspect and reuse as **visual design tooling inputs**:

1. **Web-accessible image galleries** (Wikimedia Commons, Flickr, Behance, Pinterest)
2. **Structured slot libraries** (SlotCatalog/AskGamblers/SlotsUp-type indexes with repeatable page patterns)
3. **Manufacturer/product pages** (IGT/Aristocrat cabinet pages for layout and hardware framing)
4. **Asset marketplaces** (itch.io-style icon/UI packs for motif and asset-list planning)

De-prioritize sources that are hard to parse or gated for agents (native-only storefront views, login-only pages) unless no equivalent open-web visual reference exists.

### Copy/paste search queries (vibe-focused)

- `neon night market slot screenshots promo`
- `synthwave slot machine UI screenshots`
- `cyberpunk slot game promo banner city lights`
- `city lights casino slot interface screenshots`
- `night themed slots symbols background moodboard`
- `steam neon slot screenshots`
- `app store synthwave slot screenshots`
- `google play cyberpunk slots screenshots`
- `slot review neon theme screenshots reels symbols`
- `slot theme aggregator city lights slots`

### Selection criteria

1. Pick sources that show **3+ screenshots or promo banners**.
2. Prefer pages that include both:
   - **UI close-ups** (reels, buttons, counters, win states)
   - **full-scene shots** (background mood, framing, lighting)
3. Keep a **mobile + casino UI pattern mix**:
   - at least 40% mobile app references
   - at least 40% casino/review/aggregator references
4. Favor references with strong neon/night readability:
   - symbol contrast
   - reel legibility
   - controlled glow
5. Favor sources that are **agent-usable for mockup workflows**:
   - stable public URLs
   - visible image grids/carousels in browser
   - enough visual detail to derive asset lists and layout specs

### Logging template (use for every new source)

```md
### [Ref ##] Source name
- Source category: Steam | iOS App Store | Google Play | Casino demo/review | Slot theme aggregator | Design portfolio/mockup | Photo/media archive | Reference/encyclopedia | Manufacturer gallery | Asset marketplace | Visual curation board
- Page link: <url>
- Query used: "<exact query>"
- What to copy: palette | UI layout | symbol style | background mood | animation cues
- Where images are on the page: screenshot carousel | promo banner header | review body gallery | thumbnail grid
- Quick usage note: inspiration only; don't reuse assets; check source licensing before production use.
```

## Future agent handoff note

- Use the reference images in this document to produce **specific slot mockups** (layout states, reel frames, symbol sets, win states), not just mood boards.
- As mockups are created, maintain an **asset enumeration list** (UI parts, symbols, backgrounds, FX, typography treatments, audio triggers) so implementation scope is explicit.
- The next design task will add **detailed user scenarios**. Prepare for that by tagging references/mockups to scenario moments (idle attract, spin start, reel stop, win tier reveal, reset loop).

## External Visual References (Batch 01)

### [Ref 01] Steam search: neon slot machine
- Source category: Steam
- Page link: https://store.steampowered.com/search/?term=neon%20slot%20machine
- Query used: "steam neon slot screenshots"
- What to copy: capsule color balance, typography contrast, neon accent treatment
- Where images are on the page: search-result capsule art grid and store card thumbnails
- Quick usage note: inspiration only; don't reuse assets; check source licensing before production use.

### [Ref 02] Steam search: synthwave casino
- Source category: Steam
- Page link: https://store.steampowered.com/search/?term=synthwave%20casino
- Query used: "steam synthwave slot screenshots"
- What to copy: synthwave gradients, glow hierarchy, title framing
- Where images are on the page: search-result capsule art grid
- Quick usage note: inspiration only; don't reuse assets; check source licensing before production use.

### [Ref 03] Steam search: cyberpunk slot
- Source category: Steam
- Page link: https://store.steampowered.com/search/?term=cyberpunk%20slot
- Query used: "steam cyberpunk slots screenshots"
- What to copy: high-contrast icon silhouettes, futuristic panel styling
- Where images are on the page: search-result capsule art thumbnails and linked store pages
- Quick usage note: inspiration only; don't reuse assets; check source licensing before production use.

### [Ref 04] Steam search: city lights casino
- Source category: Steam
- Page link: https://store.steampowered.com/search/?term=city%20lights%20casino
- Query used: "steam city lights casino screenshots"
- What to copy: skyline/night palettes, foreground-vs-background separation
- Where images are on the page: search-result capsules; open candidate store pages for screenshot strips
- Quick usage note: inspiration only; don't reuse assets; check source licensing before production use.

### [Ref 05] Steam search: vegas slots
- Source category: Steam
- Page link: https://store.steampowered.com/search/?term=vegas%20slots
- Query used: "steam vegas slots promo screenshots"
- What to copy: slot framing patterns, win-callout hierarchy
- Where images are on the page: capsule grid and linked store screenshot carousels
- Quick usage note: inspiration only; don't reuse assets; check source licensing before production use.

### [Ref 06] iOS search: neon slots
- Source category: iOS App Store
- Page link: https://apps.apple.com/us/search?term=neon%20slots
- Query used: "app store neon slots screenshots"
- What to copy: mobile HUD density, icon readability at small sizes
- Where images are on the page: search results and app detail screenshot strips
- Quick usage note: inspiration only; don't reuse assets; check source licensing before production use.

### [Ref 07] iOS search: night market slots
- Source category: iOS App Store
- Page link: https://apps.apple.com/us/search?term=night%20market%20slots
- Query used: "app store night themed slots screenshots"
- What to copy: nighttime color story and atmospheric overlays
- Where images are on the page: app cards and screenshot strips in app detail pages
- Quick usage note: inspiration only; don't reuse assets; check source licensing before production use.

### [Ref 08] iOS search: synthwave slots
- Source category: iOS App Store
- Page link: https://apps.apple.com/us/search?term=synthwave%20slots
- Query used: "app store synthwave slot screenshots"
- What to copy: retro-futurist accents, purple/cyan balance, reel panel framing
- Where images are on the page: app detail screenshot carousels and promotional app art
- Quick usage note: inspiration only; don't reuse assets; check source licensing before production use.

### [Ref 09] iOS search: cyberpunk casino
- Source category: iOS App Store
- Page link: https://apps.apple.com/us/search?term=cyberpunk%20casino
- Query used: "app store cyberpunk casino screenshots"
- What to copy: metallic UI panels, futuristic button styles, HUD layering
- Where images are on the page: search cards plus app-page screenshots/promotional banners
- Quick usage note: inspiration only; don't reuse assets; check source licensing before production use.

### [Ref 10] iOS search: city lights slots
- Source category: iOS App Store
- Page link: https://apps.apple.com/us/search?term=city%20lights%20slots
- Query used: "app store city lights slot promo"
- What to copy: skyline motifs, vignette use, high-saturation highlight accents
- Where images are on the page: app listing visuals and screenshot strips
- Quick usage note: inspiration only; don't reuse assets; check source licensing before production use.

### [Ref 11] Google Play search: neon slots
- Source category: Google Play
- Page link: https://play.google.com/store/search?q=neon%20slots&c=apps
- Query used: "google play neon slots screenshots"
- What to copy: feature graphic composition, CTA placement around reels
- Where images are on the page: app cards and screenshot rows inside app detail pages
- Quick usage note: inspiration only; don't reuse assets; check source licensing before production use.

### [Ref 12] Google Play search: night slots
- Source category: Google Play
- Page link: https://play.google.com/store/search?q=night%20slots&c=apps
- Query used: "google play night themed slots screenshots"
- What to copy: low-light palettes and glow readability constraints
- Where images are on the page: result cards + app detail screenshot carousel
- Quick usage note: inspiration only; don't reuse assets; check source licensing before production use.

### [Ref 13] Google Play search: synthwave slot machine
- Source category: Google Play
- Page link: https://play.google.com/store/search?q=synthwave%20slot%20machine&c=apps
- Query used: "google play synthwave slot ui screenshots"
- What to copy: retro-future motifs and color ramps for symbol art
- Where images are on the page: app tiles and in-page screenshot strips
- Quick usage note: inspiration only; don't reuse assets; check source licensing before production use.

### [Ref 14] Google Play search: cyberpunk casino
- Source category: Google Play
- Page link: https://play.google.com/store/search?q=cyberpunk%20casino&c=apps
- Query used: "google play cyberpunk casino promo"
- What to copy: sci-fi paneling, chrome highlights, typography treatment
- Where images are on the page: app detail feature graphics and screenshot rows
- Quick usage note: inspiration only; don't reuse assets; check source licensing before production use.

### [Ref 15] Google Play search: city lights slots
- Source category: Google Play
- Page link: https://play.google.com/store/search?q=city%20lights%20slots&c=apps
- Query used: "google play city lights slot screenshots"
- What to copy: city-at-night backdrops and depth layering behind reels
- Where images are on the page: result listings plus app-page screenshots
- Quick usage note: inspiration only; don't reuse assets; check source licensing before production use.

### [Ref 16] AskGamblers slot games index
- Source category: Casino demo/review
- Page link: https://www.askgamblers.com/online-slot-games
- Query used: "slot review neon theme screenshots reels symbols"
- What to copy: paytable panel layouts, symbol-size hierarchy, reel framing
- Where images are on the page: game cards in index + screenshots on individual game review pages
- Quick usage note: inspiration only; don't reuse assets; check source licensing before production use.

### [Ref 17] AskGamblers slots by theme
- Source category: Casino demo/review
- Page link: https://www.askgamblers.com/online-slot-games/themes
- Query used: "slot theme aggregator city lights slots"
- What to copy: theme taxonomy, mood grouping labels, color cluster ideas
- Where images are on the page: themed slot tiles and linked game-page screenshot galleries
- Quick usage note: inspiration only; don't reuse assets; check source licensing before production use.

### [Ref 18] SlotCatalog main slots list
- Source category: Casino demo/review
- Page link: https://slotcatalog.com/en/slots
- Query used: "slotcatalog neon slot screenshots"
- What to copy: icon metadata overlays, tile readability, category chips
- Where images are on the page: slot thumbnail grid and image galleries in each slot page
- Quick usage note: inspiration only; don't reuse assets; check source licensing before production use.

### [Ref 19] SlotCatalog themes index
- Source category: Slot theme aggregator
- Page link: https://slotcatalog.com/en/themes
- Query used: "slot theme aggregator neon city lights"
- What to copy: theme-to-visual mapping and mood-board grouping logic
- Where images are on the page: theme cards and slot thumbnails linked from each theme
- Quick usage note: inspiration only; don't reuse assets; check source licensing before production use.

### [Ref 20] SlotCatalog tags index
- Source category: Slot theme aggregator
- Page link: https://slotcatalog.com/en/tags
- Query used: "slot tags cyberpunk neon city"
- What to copy: tag taxonomy that can inform internal reference labels
- Where images are on the page: tagged slot thumbnails and linked slot-page galleries
- Quick usage note: inspiration only; don't reuse assets; check source licensing before production use.

### [Ref 21] SlotsUp slot themes
- Source category: Slot theme aggregator
- Page link: https://www.slotsup.com/online-slots/themes
- Query used: "slot theme aggregator night slots screenshots"
- What to copy: high-level mood categories and visual motif grouping
- Where images are on the page: themed slot thumbnails and linked review image sections
- Quick usage note: inspiration only; don't reuse assets; check source licensing before production use.

### [Ref 22] Slot Java game list
- Source category: Casino demo/review
- Page link: https://slotjava.com/games/
- Query used: "casino demo site slot screenshots"
- What to copy: game tile composition, category coverage, symbol style range
- Where images are on the page: game thumbnails and linked slot-page preview images
- Quick usage note: inspiration only; don't reuse assets; check source licensing before production use.

### [Ref 23] Bigwinboard slot reviews
- Source category: Casino demo/review
- Page link: https://www.bigwinboard.com/slot-reviews/
- Query used: "bigwinboard neon slot review screenshots"
- What to copy: feature callouts, reel-view crops, symbol close-up framing
- Where images are on the page: article hero images and embedded screenshot blocks
- Quick usage note: inspiration only; don't reuse assets; check source licensing before production use.

### [Ref 24] Behance slot game design gallery
- Source category: Design portfolio/mockup
- Page link: https://www.behance.net/search/projects/slot%20game%20design
- Query used: "slot game design neon city lights mockup"
- What to copy: polished key art composition and UI-over-art integration ideas
- Where images are on the page: project cover thumbnails and multi-image project pages
- Quick usage note: inspiration only; don't reuse assets; check source licensing before production use.

## External Visual References (Batch 02 - expanded design space)

### [Ref 25] Steam broad slot machine search (feature + style spread)
- Source category: Steam
- Page link: https://store.steampowered.com/search/?term=slot%20machine
- Query used: "slot machine"
- What to copy: UI density range, genre blending (horror/comedy/arcade), title-card readability patterns
- Where images are on the page: result capsule grid with thumbnail art and linked store-page screenshot strips
- Quick usage note: inspiration only; don't reuse assets; check source licensing before production use.

### [Ref 26] Wikimedia Commons slot machine category
- Source category: Photo/media archive
- Page link: https://commons.wikimedia.org/wiki/Category:Slot_machines
- Query used: "slot machine cabinet photos"
- What to copy: physical cabinet forms, reel-window proportions, bezel and panel materials
- Where images are on the page: category thumbnail gallery with linked full-resolution images
- Quick usage note: inspiration only; don't reuse assets; check source licensing before production use.

### [Ref 27] Wikipedia slot machine article
- Source category: Reference/encyclopedia
- Page link: https://en.wikipedia.org/wiki/Slot_machine
- Query used: "slot machine history visuals"
- What to copy: historic-to-modern visual evolution, reel conventions, terminology to label design studies
- Where images are on the page: article infobox and inline media illustrations
- Quick usage note: inspiration only; don't reuse assets; check source licensing before production use.

### [Ref 28] Flickr slot machine photo search
- Source category: Photo/media archive
- Page link: https://www.flickr.com/search/?text=slot%20machine
- Query used: "slot machine casino floor photos"
- What to copy: real-world lighting contrast, casino floor color temperatures, reflections/glare behavior
- Where images are on the page: photo grid thumbnails with photographer pages and multiple image sets
- Quick usage note: inspiration only; don't reuse assets; check source licensing before production use.

### [Ref 29] URComped slot machine finder
- Source category: Casino demo/review
- Page link: https://urcomped.com/game/slotmachinefinder
- Query used: "slot machine finder images videos"
- What to copy: jackpot presentation framing, camera-friendly symbol layouts, machine variety by venue
- Where images are on the page: user-submitted photo/video listings and machine-specific entries
- Quick usage note: inspiration only; don't reuse assets; check source licensing before production use.

### [Ref 30] Getty vintage slot machine photos
- Source category: Photo/media archive
- Page link: https://www.gettyimages.com/photos/vintage-slot-machine
- Query used: "vintage slot machine reference photos"
- What to copy: mechanical details, chrome + enamel palette accents, retro typography and icon framing
- Where images are on the page: stock photo gallery thumbnails with linked high-detail previews
- Quick usage note: inspiration only; don't reuse assets; check source licensing before production use.

### [Ref 31] IGT gaming cabinets
- Source category: Manufacturer gallery
- Page link: https://www.igt.com/products-and-services/gaming/cabinets
- Query used: "IGT slot cabinet visuals"
- What to copy: cabinet silhouettes, multi-screen stack patterns, ergonomic button/touch zones
- Where images are on the page: product hero images and cabinet showcases on the listing page
- Quick usage note: inspiration only; don't reuse assets; check source licensing before production use.

### [Ref 32] Aristocrat gaming cabinets
- Source category: Manufacturer gallery
- Page link: https://www.aristocratgaming.com/us/casino-operator/cabinets/
- Query used: "Aristocrat slot cabinet reference"
- What to copy: premium cabinet lighting, curved display framing, branded machine posture
- Where images are on the page: cabinet product imagery and promotional hero visuals
- Quick usage note: inspiration only; don't reuse assets; check source licensing before production use.

### [Ref 33] GamblingSites slot features guide
- Source category: Casino demo/review
- Page link: https://www.gamblingsites.com/slots/features/
- Query used: "slot features with examples visuals"
- What to copy: feature taxonomy for gameplay hooks (wilds, bonuses, modifiers), terminology for design docs
- Where images are on the page: feature explainer sections with illustrative graphics/examples
- Quick usage note: inspiration only; don't reuse assets; check source licensing before production use.

### [Ref 34] SlotsHawk Megaways overview
- Source category: Casino demo/review
- Page link: https://www.slotshawk.com/slot-games/megaways-slots/
- Query used: "megaways slot visuals and mechanics"
- What to copy: dynamic reel-height presentation, cascade feedback language, bonus reveal pacing
- Where images are on the page: game-list blocks and linked slot review visuals
- Quick usage note: inspiration only; don't reuse assets; check source licensing before production use.

### [Ref 35] Pinterest slot animation references board
- Source category: Visual curation board
- Page link: https://www.pinterest.com/higashi1264/slot-games-animation-references/
- Query used: "slot games animation references"
- What to copy: animation poses, win-celebration motion motifs, particle treatment ideas
- Where images are on the page: board pin grid and linked image detail overlays
- Quick usage note: inspiration only; don't reuse assets; check source licensing before production use.

### [Ref 36] itch.io slot-tagged game assets
- Source category: Asset marketplace
- Page link: https://itch.io/game-assets/tag-slot
- Query used: "slot game assets icon reels UI"
- What to copy: reusable visual motifs, symbol readability at different scales, indie art-style variation
- Where images are on the page: asset-card thumbnails and multi-image asset detail pages
- Quick usage note: inspiration only; don't reuse assets; check source licensing before production use.

## Requirements Specification

### 1. Functional Requirements

#### FR-1: Core Game Mechanics
- **FR-1.1** System shall support configurable reel count from 1 to 6 reels with independent reel control
- **FR-1.2** Each reel shall display 5 distinct symbols (Cherry, Lemon, Orange, Seven, Jackpot) with potential for expanded symbol sets in 5-6 reel modes
- **FR-1.3** Reels shall spin and stop sequentially left → right with visible delay that scales with reel count
- **FR-1.4** System shall detect and display winning combinations across multiple pattern types:
  - Linear patterns (horizontal, diagonal)
  - Cluster patterns (adjacent matching)
  - Scatter patterns (position-independent)
  - Shape patterns (L, T, plus, box formations)
  - Transformation patterns (wilds, morphs, cascades)
- **FR-1.5** Pattern complexity shall unlock progressively based on spin count (simple→complex)
- **FR-1.6** Credit balance shall update accurately after each spin result and pattern evaluation
- **FR-1.7** System shall track and display pattern history (last 5-10 wins) for viewer learning

#### FR-2: User Interaction
- **FR-2.1** System shall auto-spin at configurable interval (default: 3-5 seconds)
- **FR-2.2** Game shall support manual start/stop controls
- **FR-2.3** Sound effects shall be toggle-able via user control
- **FR-2.4** Game state shall be resettable to initial conditions

#### FR-3: Visual Feedback
- **FR-3.1** Winning combinations shall trigger visual celebration (pulse, glow, sparkle) with intensity scaled to pattern complexity
- **FR-3.2** Pattern visualization shall show win formation:
  - Lines: Animated connecting path from left→right
  - Clusters: Unified glow showing grouped symbols
  - Scatters: Light beams connecting scattered symbols
  - Shapes: Neon outline tracing the geometric pattern
  - Transformations: Before→after animation showing symbol changes
- **FR-3.3** Credit counter shall animate smoothly on value changes
- **FR-3.4** Reel symbols shall be clearly readable during idle state across all reel counts
- **FR-3.5** Spin animation shall show motion blur or scroll effect
- **FR-3.6** Each reel stop shall have distinct visual feedback
- **FR-3.7** Near-miss hints shall briefly highlight almost-patterns (teaching mechanism)
- **FR-3.8** Pattern history display shall show last 5-10 winning patterns as visual icons

#### FR-4: Attention-Pulse System
- **FR-4.1** System shall provide escalating attention cues for noteworthy events:
  - Near-miss patterns: Frame pulse + highlighting of missing symbols
  - Win streak (3+ consecutive): Background color-shift animation
  - Jackpot symbol visible: Glow ray from symbol to jackpot meter
  - New pattern discovered: Brief "discovery glow" celebration
  - Long idle (60s+): Random element "attention grab" animation
- **FR-4.2** Attention cues shall start subtle and build in intensity
- **FR-4.3** No attention cue shall be intrusive or anxiety-inducing
- **FR-4.4** System shall support both passive background and active engagement modes

#### FR-5: Environmental Reactivity
- **FR-5.1** Background elements shall respond to gameplay events:
  - Big wins: Lanterns brighten, environmental "celebration"
  - Win streaks: Background music tempo increases subtly
  - Market vendors: Silhouettes occasionally "notice" big wins
  - Night cycle: Environment mood shifts based on credit balance
  - Pattern complexity: Environment adapts to current reel configuration
- **FR-5.2** Environmental reactions shall be optional and configurable
- **FR-5.3** All environmental effects shall enhance, not distract from core gameplay

#### FR-6: Progressive Complexity & Discovery System
- **FR-6.1** System shall unlock pattern types progressively based on spin count:
  - Spins 1-10: Linear patterns only (horizontal, diagonal)
  - Spins 11-30: Add scatter patterns (position-independent)
  - Spins 31-60: Add cluster patterns (adjacent matching)
  - Spins 61-100: Add shape patterns (L, T, plus, box)
  - Spins 100+: Add transformation patterns (wilds, cascades, morphs)
- **FR-6.2** Pattern unlocks shall be celebrated with discovery animations
- **FR-6.3** System shall track viewer learning progress (patterns encountered, understood)
- **FR-6.4** Visual learning aids shall be provided without text tutorials:
  - Pattern history display (last 5-10 wins)
  - Near-miss highlighting (teaching what to look for)
  - Celebration intensity scaling (teaching value hierarchy)
  - Pattern visualization animations (showing how wins form)
- **FR-6.5** Reel count shall be configurable (1-6 reels) with UI adapting to count
- **FR-6.6** Symbol size and spacing shall adapt to reel count (fewer reels = larger symbols)
- **FR-6.7** Animation timing shall scale with reel count (more reels = longer anticipation build)

### 2. Visual Requirements

#### VR-1: Color Palette
- **VR-1.1** Base UI shall use Dopamine purple gradient (#8B5CF6 to #6366F1 range)
- **VR-1.2** Reel window shall feature warm neon-glow accent (#FF6B9D or #FFB84D)
- **VR-1.3** Symbols shall use high-saturation colors for instant differentiation:
  - Cherry: #FF3366 (red) with glossy highlight
  - Lemon: #FFD700 (yellow) with center bright spot
  - Orange: #FF8C42 (orange) with segment details
  - Seven: #4ECDC4 to #45B7D1 (cyan gradient) with metallic finish
  - Jackpot: #FFD700 (gold) + #FF6B9D (magenta) sparkle accents
- **VR-1.4** Background shall use dark purple/navy (#1A1A2E to #16213E) for high contrast

#### VR-2: Typography
- **VR-2.1** Title text "NEON NIGHT MARKET" shall use bold, wide display font (min 24px)
- **VR-2.2** Credit/win counters shall use monospace font for stable layout
- **VR-2.3** All text shall maintain 4.5:1 contrast ratio minimum (WCAG AA)
- **VR-2.4** Text shall have subtle glow/shadow for readability on dark backgrounds

#### VR-3: Symbol Design
- **VR-3.1** Each symbol shall have thick dark outline (3-5px) for high legibility
- **VR-3.2** Symbols shall be recognizable at minimum 64×64px size
- **VR-3.3** Symbol artwork shall be vector-based (SVG) or high-DPI raster (2x scale)
- **VR-3.4** Symbols shall include highlight/shadow for depth perception
- **VR-3.5** Symbol designs shall avoid fine details that blur during spin

#### VR-4: Layout Specifications
- **VR-4.1** Reel window aspect ratio shall be approximately 3:1 (width:height)
- **VR-4.2** Each reel cell shall be square or near-square (1:1 to 1.1:1 ratio)
- **VR-4.3** Reel spacing shall provide clear visual separation (min 8px gaps)
- **VR-4.4** Credit/win displays shall be positioned below reel window
- **VR-4.5** Layout shall be responsive and centered in container

#### VR-5: Animation Quality
- **VR-5.1** All animations shall target 60fps performance
- **VR-5.2** Animations shall use CSS transforms (translate, scale) over position changes
- **VR-5.3** Easing functions shall follow Disney animation principles (anticipation, ease-out)
- **VR-5.4** No animation shall cause content layout shift

#### VR-6: Environmental Depth & Layers
- **VR-6.1** Background shall implement 3-5 parallax depth layers for visual richness
- **VR-6.2** Far background: City skyline silhouette with animated window lights
- **VR-6.3** Mid background: Market stalls with hanging lanterns (gentle sway animation)
- **VR-6.4** Near background: Neon signs with color-cycling animations
- **VR-6.5** Foreground: Floating elements (lanterns, fireflies) drifting across view
- **VR-6.6** Layer motion speed shall scale with depth (far layers move slower)

#### VR-7: Ambient Animation System
- **VR-7.1** Game shall never be fully static—continuous ambient motion required
- **VR-7.2** Environmental micro-events shall trigger every 30-90 seconds:
  - Passing pedestrian silhouettes
  - Market vendor movements
  - Distant firework bursts
  - Neon sign flickers
- **VR-7.3** Symbol idle animations (when reels stopped):
  - Cherry: subtle bob and glossy highlight shift
  - Lemon: interior glow pulse effect
  - Orange: slow segment rotation
  - Seven: reflective surface responds to environmental lights
  - Jackpot: star points twinkle in sequence, particle orbit
- **VR-7.4** Neon marquee border: animated glow pulse (4-second loop)
- **VR-7.5** All ambient loops use harmonic timing (2s, 4s, 8s intervals)

#### VR-8: Particle System Specifications
- **VR-8.1** Win celebrations shall use tiered particle effects:
  - Small win: 200 particles, 1s duration (confetti burst)
  - Medium win: 400 particles, 1.5s duration (neon light trails)
  - Big win: 800 particles, 2s duration (cherry blossom petals + sparkles)
  - Jackpot: 2000+ particles, 3-4s duration (full-screen celebration)
- **VR-8.2** Particles shall exhibit realistic physics (gravity, wind drift, fade-out)
- **VR-8.3** Particles shall respect depth layers (some behind machine, some in front)
- **VR-8.4** Particle colors shall match symbol themes
- **VR-8.5** Particle system shall maintain 60fps on mid-tier devices

#### VR-9: Reactive Machine Frame
- **VR-9.1** Machine frame shall react to game state:
  - Win streaks: Frame glow intensifies, color shifts (purple → gold → magenta)
  - Near-misses: Brief frame pulse and subtle shake
  - Jackpot ready: Corner ornaments pulse in sequence
  - Loss streaks: Frame dims slightly (recovers on next win)
- **VR-9.2** Frame reactions shall be subtle enough for background viewing
- **VR-9.3** All frame states shall transition smoothly (300-500ms)

#### VR-10: 3D Reel Presentation
- **VR-10.1** Reels shall appear as 3D cylinders with perspective distortion
- **VR-10.2** Symbols above/below visible window shall show partial peek (depth cue)
- **VR-10.3** Shadow gradient shall suggest reel cylinder depth
- **VR-10.4** Light reflections shall move across spinning reel surface
- **VR-10.5** Reel physics shall include:
  - Acceleration "catch" at spin start
  - Deceleration bounce (overshoot 1-2 symbols, settle back)
  - Stop impact with subtle screen shake
  - Sound synchronization with ratchet positions

#### VR-11: Adaptive Multi-Reel Layout
- **VR-11.1** Layout shall support 1-6 reels with responsive symbol sizing:
  - 1-2 reels: 96-128px symbols (large, emphasis on detail)
  - 3 reels: 80px symbols (classic slot proportions)
  - 4 reels: 64px symbols (widescreen format)
  - 5 reels: 56px symbols (premium slot standard)
  - 6 reels: 48px symbols (maximum complexity)
- **VR-11.2** Reel spacing shall adapt to reel count:
  - Fewer reels (1-3): 16px gaps for breathing room
  - More reels (4-6): 8px gaps for compact efficiency
- **VR-11.3** Viewport shall resize to accommodate reel count while maintaining 16:9 aspect ratio target
- **VR-11.4** Responsive breakpoints:
  - Mobile (320-767px): Max 4 reels
  - Tablet (768-1023px): Max 5 reels
  - Desktop (1024px+): Full 6-reel support
- **VR-11.5** Symbol legibility shall be maintained across all reel counts (minimum 48px)

#### VR-12: Pattern Visualization System
- **VR-12.1** Winning patterns shall be visually highlighted with type-specific animations:
  - **Linear patterns:** Animated connecting line traces from first to last symbol (300ms)
  - **Cluster patterns:** Unified glow boundary around grouped symbols (400ms pulse)
  - **Scatter patterns:** Light beams shoot between scattered symbols forming constellation (500ms)
  - **Shape patterns:** Neon outline traces the geometric shape (L/T/plus/box) in 600ms
  - **Transformation patterns:** Morph animation shows before→after state (800ms)
- **VR-12.2** Pattern colors shall differentiate pattern types:
  - Linear: Electric blue (#00D9FF)
  - Cluster: Warm gold (#FFD700)
  - Scatter: Magenta (#FF6B9D)
  - Shape: Cyan-green (#00FFAA)
  - Transformation: Rainbow gradient shimmer
- **VR-12.3** Multiple simultaneous patterns shall layer visualizations with slight timing offsets
- **VR-12.4** Pattern history display shall show last 5-10 wins as compact icons:
  - Icons use simplified pattern visualization (16×16px)
  - Icons fade in sequence (newest on left, oldest fades out on right)
  - Clicking icon replays that pattern's visualization (educational)
- **VR-12.5** Near-miss hints shall use subtle ghost outlines (30% opacity, 1s duration)
- **VR-12.6** Discovery celebrations (new pattern type) shall use special particle burst + frame flash

### 3. Animation & Timing Requirements

#### TR-1: Motion Timing Table

| Animation Event | Duration | Easing Function | Delay Pattern |
|----------------|----------|-----------------|---------------|
| **Spin Start** | 200ms | ease-in | All reels simultaneous |
| **Reel Spinning** | 1500-2000ms | linear | Continuous during spin |
| **Reel 1 Stop** | 400ms | cubic-bezier(0.25, 0.1, 0.25, 1) | 0ms (immediate) |
| **Reel 2 Stop** | 400ms | cubic-bezier(0.25, 0.1, 0.25, 1) | +300ms after Reel 1 |
| **Reel 3 Stop** | 400ms | cubic-bezier(0.25, 0.1, 0.25, 1) | +300ms after Reel 2 |
| **Reel 4 Stop** | 400ms | cubic-bezier(0.25, 0.1, 0.25, 1) | +300ms after Reel 3 |
| **Reel 5 Stop** | 400ms | cubic-bezier(0.25, 0.1, 0.25, 1) | +300ms after Reel 4 |
| **Reel 6 Stop** | 400ms | cubic-bezier(0.25, 0.1, 0.25, 1) | +300ms after Reel 5 |
| **Deceleration Bounce** | 150ms | cubic-bezier(0.68, -0.55, 0.265, 1.55) | On each reel stop |
| **Symbol Settle** | 100ms | ease-out | After bounce |
| **Pattern Detection** | 200ms | linear | After all reels stopped |
| **Pattern Visualization (Line)** | 300ms | ease-out | After detection |
| **Pattern Visualization (Cluster)** | 400ms | ease-in-out | After detection |
| **Pattern Visualization (Scatter)** | 500ms | ease-out | After detection |
| **Pattern Visualization (Shape)** | 600ms | cubic-bezier(0.34, 1.56, 0.64, 1) | After detection |
| **Pattern Visualization (Transform)** | 800ms | ease-in-out | After detection |
| **Win Pulse** | 600ms | ease-in-out | Simultaneous with pattern |
| **Win Glow** | 800ms | ease-out | Simultaneous with pulse |
| **Win Sparkle** | 1000ms | ease-out | Staggered 100ms intervals |
| **Particle Burst (Small)** | 1000ms | ease-out | On win detected |
| **Particle Cascade (Medium)** | 1500ms | ease-out | On win detected |
| **Particle Storm (Big)** | 2000ms | ease-out | On win detected |
| **Particle Explosion (Jackpot)** | 3500ms | ease-out | On jackpot |
| **Discovery Celebration** | 2000ms | cubic-bezier(0.34, 1.56, 0.64, 1) | On new pattern type |
| **Credit Update** | 300ms | ease-out | After win animations |
| **Pattern History Update** | 400ms | ease-in-out | New icon slides in |
| **Near-Miss Hint** | 1000ms | ease-in-out | 30% opacity ghost |
| **Idle Reset** | 500ms | ease-in-out | 2000ms after credit update |
| **Symbol Idle Bob** | 2000ms | ease-in-out | Continuous loop |
| **Symbol Glow Pulse** | 4000ms | ease-in-out | Continuous loop |
| **Neon Border Pulse** | 4000ms | linear | Continuous loop |
| **Lantern Sway** | 8000ms | ease-in-out | Continuous loop (offset per lantern) |
| **Background Layer Drift** | 60000ms | linear | Continuous loop (parallax) |
| **Frame Reaction** | 400ms | ease-out | On game state change |
| **Near-Miss Pulse** | 500ms | cubic-bezier(0.4, 0, 0.2, 1) | On near-miss detected |
| **Attention Grab** | 1200ms | cubic-bezier(0.34, 1.56, 0.64, 1) | On 60s idle |
| **Environmental Event** | 2000-4000ms | ease-in-out | Random 30-90s intervals |
| **Reel Count Transition** | 800ms | ease-in-out | On configuration change |

#### TR-2: Interaction Timing
- **TR-2.1** Auto-spin interval: 3000ms minimum between spin cycles (base 3-reel)
- **TR-2.2** Auto-spin scaling: +200ms per additional reel (6-reel = 3600ms)
- **TR-2.3** Button press response: <100ms feedback latency
- **TR-2.4** State transition: max 200ms for any state change
- **TR-2.5** Total spin cycle: Scales with reel count
  - 1-2 reels: 1500-2000ms
  - 3 reels: 2500-3000ms
  - 4 reels: 3000-3500ms
  - 5 reels: 3500-4000ms
  - 6 reels: 4000-4500ms
- **TR-2.6** Pattern evaluation time: 200-500ms depending on complexity
- **TR-2.7** Progressive unlock reveal: 2000ms discovery celebration

#### TR-3: Performance Budgets
- **TR-3.1** Frame drops during animation: <5% of frames
- **TR-3.2** Paint operations per frame: <5ms
- **TR-3.3** JavaScript execution per spin: <50ms total
- **TR-3.4** DOM manipulations: batch/minimize during animations

### 4. Audio Requirements

#### AR-1: Sound Effects
- **AR-1.1** Spin start: mechanical whir (250ms, fade-in)
- **AR-1.2** Reel stop: distinct click per reel (50ms each, pitch variation)
  - Reel 1: 440 Hz base
  - Reel 2: 494 Hz base
  - Reel 3: 523 Hz base
- **AR-1.3** Win sounds (tiered):
  - Small win (2-match): pleasant chime (200ms)
  - Medium win (3-match standard): cascade notes (500ms)
  - Big win (3 sevens): triumphant fanfare (1000ms)
  - Jackpot: extended celebration (2000ms)
- **AR-1.4** All sound files: <50KB each, OGG/MP3 format
- **AR-1.5** Default volume: 60%, user-adjustable or mutable

#### AR-2: Audio UX
- **AR-2.1** Sounds shall not overlap in jarring way (mix or queue)
- **AR-2.2** Mute state shall persist across page reloads
- **AR-2.3** Audio feedback shall be optional, not required for gameplay
- **AR-2.4** No background music in initial iteration (future consideration)

### 5. Accessibility Requirements

#### AC-1: Visual Accessibility
- **AC-1.1** Color shall not be sole differentiator (symbols have distinct shapes)
- **AC-1.2** All text contrast ratio: minimum 4.5:1 (WCAG AA)
- **AC-1.3** Animation shall respect `prefers-reduced-motion` media query
- **AC-1.4** Focus indicators shall be clearly visible (3px outline minimum)

#### AC-2: Semantic Accessibility
- **AC-2.1** Game container shall have appropriate ARIA landmarks
- **AC-2.2** Dynamic content updates shall use ARIA live regions
- **AC-2.3** Control buttons shall have descriptive labels
- **AC-2.4** Game state shall be announced to screen readers

#### AC-3: Interaction Accessibility
- **AC-3.1** All controls shall be keyboard-accessible (Tab navigation)
- **AC-3.2** Keyboard shortcuts shall not conflict with browser defaults
- **AC-3.3** Game shall function without requiring precise timing
- **AC-3.4** Auto-play shall be pausable

### 6. Performance Requirements

#### PR-1: Load Performance
- **PR-1.1** Initial page load: <3 seconds on 3G connection (increased for richer assets)
- **PR-1.2** Total initial asset bundle: <1.2MB (base game + critical assets)
- **PR-1.3** Progressive asset loading: background layers load after game functional
- **PR-1.4** Symbol images: <20KB each base, <10KB each for animation frames
- **PR-1.5** First Contentful Paint: <1.5 seconds
- **PR-1.6** Time to Interactive: <3.5 seconds

#### PR-2: Runtime Performance
- **PR-2.1** Memory usage: <80MB heap size with full environmental system active
- **PR-2.2** No memory leaks over 100+ spin cycles with particles
- **PR-2.3** Smooth 60fps during standard gameplay (reels + basic particles)
- **PR-2.4** Acceptable 45-60fps during jackpot celebration (2000+ particles)
- **PR-2.5** CPU usage: <40% on mid-tier devices with ambient animations
- **PR-2.6** Particle system shall degrade gracefully on low-end devices
- **PR-2.7** Environmental events shall pause during active spin (focus performance)

#### PR-3: Browser Compatibility & Optimization
- **PR-3.1** Support: Chrome 90+, Firefox 88+, Safari 14+, Edge 90+
- **PR-3.2** Graceful degradation for older browsers (disable ambient loops, reduce particles)
- **PR-3.3** Mobile support: iOS 14+, Android 10+
- **PR-3.4** Responsive: 320px to 2560px viewport width
- **PR-3.5** Touch-optimized for mobile (no hover-dependent features)
- **PR-3.6** GPU acceleration for transforms and particles (use will-change hints)
- **PR-3.7** Adaptive quality: reduce effects on low-battery or high-load conditions

### 7. Technical Requirements

#### TC-1: Code Structure
- **TC-1.1** Game logic in ES6+ class structure (see existing game.js pattern)
- **TC-1.2** Configuration separated in config.js
- **TC-1.3** Styles in modular CSS (game-specific + common.css)
- **TC-1.4** No inline styles (use classes)

#### TC-2: Data Management
- **TC-2.1** Game state shall be encapsulated in class instance
- **TC-2.2** No global state pollution
- **TC-2.3** State changes via documented methods only
- **TC-2.4** Configuration must be overridable via constructor options

#### TC-3: Asset Management
- **TC-3.1** Symbols loaded from /assets/images/slot-machine/
- **TC-3.2** Sounds loaded from /assets/sounds/slot-machine/
- **TC-3.3** Shared styles from /assets/styles/common.css
- **TC-3.4** Lazy-load audio files (don't block initial render)

## Design Review Process

### Stage 1: Concept Review (Complete ✓)

**Participants:** Design lead, product owner  
**Deliverables:**
- [x] Narrative description (see NARRATIVES.md)
- [x] Opinionated design decisions (see sections above)
- [x] Visual mood and theme definition
- [x] Reference collection (36 external sources)
- [x] Sample wireframe/low-fi art

**Acceptance Criteria:**
- [x] Narrative aligns with Dopamine brand (playful, watchable, satisfying)
- [x] Theme is unique enough to differentiate from generic slots
- [x] Design decisions are documented and justified
- [x] References demonstrate visual direction feasibility

**Status:** ✅ Approved - proceed to mockup stage

---

### Stage 2: Mockup Review (In Progress)

**Participants:** Design lead, development lead, stakeholders  
**Deliverables Required:**
- [ ] High-fidelity mockups (PNG/SVG) showing:
  - [ ] Idle state (reels stopped, waiting)
  - [ ] Spin state (reels blurred/moving)
  - [ ] Stop sequence states (1 reel, 2 reels, 3 reels stopped)
  - [ ] Win state (celebration visuals)
  - [ ] UI controls and information displays
- [ ] Symbol artwork finalized (5 symbols in spec-compliant style)
- [ ] Color palette swatches with hex codes
- [ ] Typography specimens (font families, sizes, weights)
- [ ] Responsive layout variations (mobile, tablet, desktop)

**Review Checklist:**
- [ ] Visual hierarchy: Can viewer instantly see reel outcome?
- [ ] Symbol legibility: Each symbol distinct at intended size?
- [ ] Color contrast: All text meets WCAG AA (4.5:1)?
- [ ] Neon aesthetic: Glow effects controlled, not overwhelming?
- [ ] Dopamine brand: Purple gradient integrated cohesively?
- [ ] Anticipation pacing: Stop sequence feels satisfying?
- [ ] Win celebration: Appropriate intensity for reward tier?
- [ ] Responsive design: Works at 320px and 2560px width?
- [ ] Animation notes: Timing/easing documented for dev?

**Acceptance Criteria:**
- All deliverables provided and meet requirements
- Design team consensus on visual direction
- Development team confirms technical feasibility
- Mockups demonstrate all game states clearly
- Style guide elements extractable for implementation

**Exit Gate:** Design lead + development lead sign-off required

---

### Stage 3: Specification Review (Current Stage)

**Participants:** Development team, QA lead, design lead  
**Deliverables Required:**
- [x] Functional requirements (FR-1 through FR-6)
- [x] Visual requirements (VR-1 through VR-12)
- [x] Animation timing table (TR-1)
- [x] Audio requirements (AR-1 through AR-2)
- [x] Accessibility requirements (AC-1 through AC-3)
- [x] Performance requirements (PR-1 through PR-3)
- [x] Technical requirements (TC-1 through TC-3)
- [ ] Asset inventory list (all symbols, sounds, images cataloged)
- [ ] State diagram (game states and transitions)
- [ ] Edge case documentation (errors, loading states, etc.)

**Review Checklist:**
- [x] Requirements complete and unambiguous?
- [x] All requirements testable/measurable?
- [x] Animation timings specified for developers?
- [x] Accessibility considerations addressed?
- [x] Performance budgets realistic and measurable?
- [ ] Asset list complete with file names/formats?
- [ ] Technical requirements match project patterns?
- [ ] Edge cases and error states documented?
- [ ] Dependencies on shared components identified?

**Acceptance Criteria:**
- Development team can estimate implementation effort
- QA can derive test cases from requirements
- No major requirement gaps or contradictions
- Requirements align with technical constraints
- Asset needs clearly defined

**Exit Gate:** Development lead + QA lead sign-off required

---

### Stage 4: Implementation Review (Pending)

**Participants:** Developer(s), code reviewer, design lead  
**Activities:**
- [ ] Code review against technical requirements (TC-*)
- [ ] Visual QA against mockups (pixel-perfect check)
- [ ] Animation timing verification (match TR-1 spec)
- [ ] Accessibility audit (AC-* requirements)
- [ ] Performance profiling (PR-* budgets)
- [ ] Cross-browser testing (PR-3.1)
- [ ] Responsive testing (320px-2560px)

**Review Checklist:**
- [ ] Code follows project patterns (class structure, file organization)
- [ ] Visual output matches approved mockups
- [ ] Animation timing matches specification table
- [ ] All symbols render correctly at target sizes
- [ ] Win states trigger appropriate celebrations
- [ ] Keyboard navigation functional
- [ ] Screen reader announces state changes
- [ ] Reduced motion preference respected
- [ ] 60fps maintained during animations
- [ ] No console errors or warnings
- [ ] Mobile touch interactions work smoothly

**Acceptance Criteria:**
- All functional requirements (FR-*) implemented
- Visual fidelity matches approved mockups (±5% tolerance)
- Performance budgets met on target devices
- Accessibility requirements pass automated + manual testing
- Code review approved by senior developer
- QA sign-off on test cases

**Exit Gate:** Code reviewer + design lead + QA lead sign-off

---

### Stage 5: User Acceptance (Pending)

**Participants:** Product owner, stakeholders, design team  
**Activities:**
- [ ] Demo to stakeholders
- [ ] Collect feedback on "feel" and pacing
- [ ] Verify emotional goals met (anticipation, satisfaction)
- [ ] Check brand cohesion with other Dopamine games
- [ ] Validate "watchability" (passive viewing appeal)

**Review Checklist:**
- [ ] Game feels satisfying to watch for 60+ seconds?
- [ ] Win celebrations feel appropriately rewarding?
- [ ] Pacing neither too fast nor too slow?
- [ ] Audio enhances experience without annoyance?
- [ ] Fits Dopamine brand (matches other games' quality)?
- [ ] Theme ("Neon Night Market") comes through clearly?
- [ ] No unexpected bugs or visual glitches?

**Acceptance Criteria:**
- Product owner approves final implementation
- Emotional goals from narrative achieved
- Stakeholder consensus on quality
- No critical bugs or polish issues
- Ready for production deployment

**Exit Gate:** Product owner sign-off

---

### Stage 6: Post-Launch Review (Future)

**Timing:** 2 weeks after deployment  
**Participants:** Full team  
**Activities:**
- [ ] Review analytics (if available): engagement metrics
- [ ] Collect user feedback
- [ ] Identify improvement opportunities
- [ ] Document lessons learned
- [ ] Plan iteration 02 (if needed)

**Retrospective Questions:**
- What worked well in design process?
- What could be improved in next iteration?
- Did requirements capture everything needed?
- Were time estimates accurate?
- What surprised us during development?

---

## Review Sign-Off Template

```markdown
### [Stage Name] - Sign-Off

**Date:** YYYY-MM-DD  
**Reviewer:** [Name, Role]  
**Status:** ✅ Approved / ⚠️ Approved with conditions / ❌ Needs revision

**Comments:**
[Feedback, concerns, or conditions]

**Conditions (if any):**
- [ ] [Condition 1]
- [ ] [Condition 2]

**Signature:** _[Initials]_
```

---

## Asset Inventory & Implementation Checklist

### Visual Assets Required

#### Symbol Artwork (5 symbols)
- [ ] `cherry.svg` or `cherry@2x.png` - Red cherry with glossy highlight, thick outline
- [ ] `lemon.svg` or `lemon@2x.png` - Yellow lemon with bright center, thick outline  
- [ ] `orange.svg` or `orange@2x.png` - Orange with segment details, thick outline
- [ ] `seven.svg` or `seven@2x.png` - Cyan gradient seven with metallic finish, thick outline
- [ ] `jackpot.svg` or `jackpot@2x.png` - Gold star coin with magenta sparkles, thick outline

**Spec per symbol:**
- Base size: 128×128px (renders at 64×64px on screen for 2x DPI)
- File size: <20KB each
- Format: SVG preferred (scalable), PNG @2x fallback
- Outline: 3-5px thick, dark (#1A1A2E or black)
- Background: transparent

#### UI Graphics
- [ ] `reel-frame.svg` - Decorative border around reel window with reactive states
- [ ] `reel-frame-win.svg` - Win state frame variant (gold/magenta glow)
- [ ] `glow-overlay.png` - Neon glow effect (multiply/screen blend)
- [ ] `sparkle-particle.svg` - For win celebrations (reusable sprite)
- [ ] `title-graphic.svg` - "NEON NIGHT MARKET" stylized text
- [ ] `corner-ornament.svg` - Animated corner decorations (4 variants for jackpot ready state)

#### Background Elements (Parallax Layers)
- [ ] `layer-1-skyline.svg` - Far background: City skyline silhouette
- [ ] `layer-2-buildings.png` - Mid-far: Buildings with animated window lights
- [ ] `layer-3-market-stalls.svg` - Mid background: Market stall structures
- [ ] `layer-4-lanterns.svg` - Mid-near: Hanging lanterns (multiple for sway animation)
- [ ] `layer-5-neon-signs.svg` - Near background: Neon signs (3-5 variants)
- [ ] `layer-6-foreground-elements.svg` - Foreground: Floating lanterns, fireflies
- [ ] `background-gradient.svg` - Base dark purple gradient
- [ ] `heat-haze-overlay.png` - Atmospheric effect (optional, subtle)

#### Environmental Elements (Micro-Events)
- [ ] `pedestrian-silhouette-1.svg` - Passing pedestrian (3 variants for variety)
- [ ] `pedestrian-silhouette-2.svg`
- [ ] `pedestrian-silhouette-3.svg`
- [ ] `vendor-animation-sprite.svg` - Market vendor movements (sprite sheet)
- [ ] `firework-burst.svg` - Distant firework effects (3 color variants)
- [ ] `neon-flicker-overlay.png` - Neon sign flicker effect

#### Particle System Assets
- [ ] `confetti-particle.svg` - Small win confetti (10 color variants)
- [ ] `neon-trail-particle.svg` - Medium win light trails (5 color variants)
- [ ] `cherry-blossom-petal.svg` - Big win petals (3 size variants)
- [ ] `sparkle-star.svg` - General sparkle effect (4 size variants)
- [ ] `jackpot-beam.svg` - Jackpot light beam rays
- [ ] `jackpot-hologram.svg` - Jackpot holographic text effect

#### Symbol Animation Variants (Idle States)
- [ ] Each symbol needs 3 additional states:
  - `{symbol}-idle-frame1.svg` through `{symbol}-idle-frame4.svg` (4-frame idle loop)
  - `{symbol}-win-frame1.svg` through `{symbol}-win-frame3.svg` (3-frame celebration)
  - Total: 5 symbols × 7 frames = 35 additional symbol frames

### Audio Assets Required

#### Sound Effects
- [ ] `spin-start.ogg` - Mechanical whir, 250ms, <25KB
- [ ] `reel-stop-1.ogg` - Click sound, 440 Hz base, 50ms, <10KB
- [ ] `reel-stop-2.ogg` - Click sound, 494 Hz base, 50ms, <10KB
- [ ] `reel-stop-3.ogg` - Click sound, 523 Hz base, 50ms, <10KB
- [ ] `reel-bounce.ogg` - Deceleration bounce impact, 100ms, <10KB
- [ ] `win-small.ogg` - Pleasant chime, 200ms, <15KB
- [ ] `win-medium.ogg` - Cascade notes, 500ms, <30KB
- [ ] `win-big.ogg` - Triumphant fanfare, 1000ms, <50KB
- [ ] `win-jackpot.ogg` - Extended celebration, 2000ms, <80KB
- [ ] `particle-burst-small.ogg` - Confetti pop, 150ms, <10KB
- [ ] `particle-cascade.ogg` - Neon trail whoosh, 300ms, <15KB
- [ ] `near-miss-pulse.ogg` - Subtle tension sound, 200ms, <12KB
- [ ] `frame-glow-shift.ogg` - Frame state change sound, 150ms, <10KB

#### Ambient/Environmental Audio
- [ ] `ambient-night-market.ogg` - Background loop: distant market sounds, 30s loop, <200KB
- [ ] `ambient-crowd-murmur.ogg` - Very subtle crowd ambience, 20s loop, <150KB
- [ ] `neon-hum.ogg` - Gentle electrical hum (optional), 10s loop, <100KB
- [ ] `firework-distant.ogg` - Environmental micro-event, 800ms, <30KB
- [ ] `lantern-chime.ogg` - Gentle wind chime for lantern sway, 500ms, <20KB

**Format:** OGG Vorbis (primary), MP3 (fallback)
**Mixing:** Ambient tracks at 20-30% volume, effects at 60% volume, all user-adjustable

### Code Implementation Checklist

#### File Structure
- [ ] `/games/slot-machine/game.js` - Updated with all game logic
- [ ] `/games/slot-machine/config.js` - Symbol config, timing values, paytable
- [ ] `/games/slot-machine/styles.css` - Game-specific styles + animations
- [ ] `/games/slot-machine/index.html` - Game container markup
- [ ] `/games/slot-machine/README.md` - Game-specific documentation

#### Class Implementation (game.js)
- [ ] Constructor: accept containerId + options, initialize state
- [ ] `start()` method: begin auto-spin loop
- [ ] `stop()` method: pause auto-spin
- [ ] `spin()` method: execute single spin cycle
- [ ] `reset()` method: reset credits and state
- [ ] `destroy()` method: cleanup listeners and timers
- [ ] `_updateReel(reelIndex, symbolIndex)` - private helper
- [ ] `_checkWin()` - detect winning combinations
- [ ] `_checkNearMiss()` - detect near-miss situations (2/3 match)
- [ ] `_animateWin()` - trigger celebration animations
- [ ] `_animateParticles(tier)` - particle system for win tiers
- [ ] `_updateCredits(amount)` - animate credit counter
- [ ] `_updateFrameState(state)` - update reactive frame (win/streak/loss)
- [ ] `_triggerEnvironmentalEvent()` - random environmental micro-events
- [ ] `_startAmbientAnimations()` - initialize continuous background loops
- [ ] `_handleIdleTimeout()` - attention grab after 60s idle
- [ ] `_updateParallaxLayers()` - parallax scrolling effects (optional)
- [ ] `_detectPatterns()` - evaluate all pattern types (linear, cluster, scatter, shape, transform)
- [ ] `_visualizePattern(type, coordinates)` - render pattern visualization overlay
- [ ] `_updatePatternHistory(pattern)` - add pattern to history display
- [ ] `_checkProgressiveUnlock()` - determine if new pattern types should unlock
- [ ] `_celebrateDiscovery(patternType)` - special animation for new pattern discovery
- [ ] `_adaptLayoutToReelCount(count)` - resize symbols and spacing for 1-6 reels
- [ ] `_highlightNearMiss(almostPattern)` - show ghost outline for teaching

#### CSS Animations
- [ ] `@keyframes spin` - reel spinning effect
- [ ] `@keyframes stop` - reel stop with settle
- [ ] `@keyframes bounce` - deceleration bounce (overshoot)
- [ ] `@keyframes pulse` - winning symbol pulse
- [ ] `@keyframes glow` - neon glow effect
- [ ] `@keyframes sparkle` - particle effects
- [ ] `@keyframes countUp` - credit counter animation
- [ ] `@keyframes symbolBob` - idle symbol bob animation (cherry)
- [ ] `@keyframes symbolGlow` - idle symbol glow pulse (lemon, jackpot)
- [ ] `@keyframes symbolRotate` - idle symbol rotation (orange)
- [ ] `@keyframes symbolReflect` - idle reflection shift (seven)
- [ ] `@keyframes neonPulse` - border neon pulse (4s loop)
- [ ] `@keyframes lanternSway` - hanging lantern sway (8s loop)
- [ ] `@keyframes parallaxDrift` - background layer drift
- [ ] `@keyframes frameGlow` - reactive frame state transitions
- [ ] `@keyframes particleFall` - particle gravity/fade animation
- [ ] `@keyframes nearMissPulse` - near-miss frame pulse
- [ ] `@keyframes attentionGrab` - idle timeout attention animation
- [ ] `@keyframes fireworkBurst` - environmental firework effect
- [ ] `@keyframes pedestrianWalk` - passing silhouette animation
- [ ] `@keyframes patternTraceLine` - animated line connecting matched symbols
- [ ] `@keyframes patternGlowCluster` - unified glow for clustered symbols
- [ ] `@keyframes patternBeamScatter` - light beams between scattered symbols
- [ ] `@keyframes patternShapeOutline` - neon shape tracing (L/T/plus/box)
- [ ] `@keyframes patternMorph` - symbol transformation animation
- [ ] `@keyframes patternHistorySlide` - new pattern icon slides into history
- [ ] `@keyframes nearMissGhost` - 30% opacity ghost outline hint
- [ ] `@keyframes discoveryBurst` - special celebration for pattern unlock
- [ ] `@keyframes reelCountTransition` - layout adaptation when changing reel count
- [ ] Responsive media queries (320px, 768px, 1024px breakpoints)
- [ ] `prefers-reduced-motion` alternative animations (disable ambient loops, reduce particles)

#### Configuration (config.js)
- [ ] Symbol array: `['cherry', 'lemon', 'orange', 'seven', 'jackpot']`
- [ ] Symbol weights/probabilities for randomization (varies by reel count)
- [ ] Reel configuration:
  - Default reel count (3)
  - Min/max reel count (1-6)
  - Responsive breakpoint limits (mobile: 4, tablet: 5, desktop: 6)
  - Symbol size mapping per reel count (128px→48px)
  - Reel spacing mapping per reel count (16px→8px)
- [ ] Pattern definitions and detection rules:
  - Linear patterns (horizontal, diagonal) - available from spin 1
  - Scatter patterns (position-independent) - unlocks at spin 11
  - Cluster patterns (adjacent matching) - unlocks at spin 31
  - Shape patterns (L, T, plus, box) - unlocks at spin 61
  - Transformation patterns (wilds, morphs, cascades) - unlocks at spin 100
- [ ] Progressive unlock thresholds (spin counts for pattern reveals)
- [ ] Paytable: define winning combinations and payouts per pattern type
- [ ] Timing constants: spin duration, stop delays, celebration length
- [ ] Timing scaling factors for multi-reel (base + 200ms per reel)
- [ ] Credit settings: starting balance, bet amount
- [ ] Animation easing functions (from TR-1 table)
- [ ] Pattern visualization configuration:
  - Pattern colors (linear: blue, cluster: gold, scatter: magenta, shape: cyan, transform: rainbow)
  - Animation durations per pattern type (300ms→800ms)
  - Pattern history display settings (max 10 icons, fade timing)
  - Near-miss hint opacity and duration (30%, 1s)
- [ ] Particle system configuration:
  - Particle counts per tier (200/400/800/2000)
  - Particle physics constants (gravity, wind, fade rate)
  - Particle color palettes per symbol
- [ ] Environmental event configuration:
  - Micro-event frequency (30-90s random intervals)
  - Event type weights (pedestrian/vendor/firework/flicker)
  - Ambient animation timing (2s/4s/8s harmonic loops)
- [ ] Parallax layer speeds (depth-based scaling)
- [ ] Attention pulse thresholds (near-miss, streak, discovery, idle timeout)
- [ ] Frame reactivity states and color shifts
- [ ] Learning progression tracking:
  - Spin count
  - Patterns encountered
  - Patterns discovered (first occurrence of each type)
  - Win history for pattern distribution analysis

#### Accessibility Implementation
- [ ] ARIA labels on all controls
- [ ] ARIA live region for credit/win announcements
- [ ] Keyboard event listeners (Space = spin, Escape = stop)
- [ ] Focus management (tab order logical)
- [ ] `prefers-reduced-motion` detection and handling
- [ ] Screen reader state announcements

#### Testing Requirements
- [ ] Unit tests for game logic (win detection, credit math)
- [ ] Visual regression tests (screenshot comparisons)
- [ ] Accessibility audit with axe or WAVE
- [ ] Performance profiling in Chrome DevTools
- [ ] Cross-browser manual testing (Chrome, Firefox, Safari, Edge)
- [ ] Mobile device testing (iOS, Android)
- [ ] Reduced motion testing
- [ ] Keyboard-only navigation testing

### Documentation Checklist
- [ ] Update `/games/slot-machine/README.md` with usage instructions
- [ ] Add JSDoc comments to all public methods
- [ ] Document configuration options in config.js
- [ ] Add inline comments for complex animation logic
- [ ] Update main `/docs/GAME_DEVELOPMENT.md` with slot-specific patterns (if applicable)
- [ ] Create or update `/docs/API.md` with slot machine API reference

---

## Completion Criteria

### Definition of Done

The slot machine design is considered **complete** when:

✅ **Design Phase:**
- [x] All requirements documented (FR, VR, TR, AR, AC, PR, TC)
- [x] Review process defined with clear stages and gates
- [ ] High-fidelity mockups created and approved
- [ ] Asset inventory complete with specifications
- [ ] All Stage 1-3 reviews passed with sign-offs

✅ **Implementation Phase:**
- [ ] All code implementation checklist items complete
- [ ] Visual output matches approved mockups
- [ ] Animation timing matches TR-1 specification table
- [ ] All functional requirements (FR-*) implemented and tested
- [ ] Accessibility requirements (AC-*) pass audits
- [ ] Performance requirements (PR-*) met on target devices
- [ ] All Stage 4-5 reviews passed with sign-offs

✅ **Quality Assurance:**
- [ ] Zero critical bugs
- [ ] All test cases passing
- [ ] Cross-browser compatibility verified
- [ ] Mobile responsiveness verified
- [ ] Accessibility audit passed
- [ ] Performance budgets met

✅ **Documentation:**
- [ ] All documentation checklist items complete
- [ ] Code commented and JSDoc complete
- [ ] README.md updated with usage instructions
- [ ] API documentation current

✅ **Deployment:**
- [ ] Game integrated into main Dopamine index
- [ ] Assets deployed to correct directories
- [ ] No build errors or console warnings
- [ ] Smoke testing passed in production

### Success Metrics (Post-Launch)

**Qualitative:**
- Players/viewers report game is "satisfying to watch"
- Win celebrations feel appropriately rewarding
- Theme ("Neon Night Market") comes through clearly
- Fits cohesively with other Dopamine games

**Quantitative (if analytics available):**
- Average viewing session: >60 seconds
- 60fps maintained in >95% of measurements
- Zero accessibility violations (automated tools)
- Page load time: <2 seconds on 3G
- Zero critical bugs reported in first 2 weeks

---

## Ready-for-Implementation Checklist

### Design Phase (Current Focus)
- [x] Narrative angle chosen
- [x] Visual hierarchy and readability priorities defined
- [x] Symbol style constraints defined
- [x] Initial sample art provided
- [x] Add image-first reference collection process for contributors
- [x] Collect first external reference batch (24 entries)
- [x] Expand design-space references with cross-domain batch (12 more entries)
- [x] Define comprehensive requirements (FR, VR, TR, AR, AC, PR, TC)
- [x] Create motion timing table for CSS implementation (TR-1)
- [x] Document review process with stages and acceptance criteria
- [x] Create asset inventory and implementation checklist
- [ ] Convert sample art into high-fidelity mockups (PNG/SVG)
- [ ] Finalize symbol artwork (5 symbols to spec)
- [ ] Create responsive layout mockups (mobile, tablet, desktop)
- [ ] Document state diagram (idle, spinning, stopped, win, etc.)
- [ ] Get Stage 2 (Mockup Review) sign-off

### Implementation Phase (Blocked on mockups)
- [ ] Implement core game class with methods (start, stop, spin, reset, destroy)
- [ ] Implement reel rendering and animation system
- [ ] Implement win detection and celebration logic
- [ ] Create CSS animations per TR-1 timing table
- [ ] Implement audio system with user controls
- [ ] Add keyboard accessibility
- [ ] Add ARIA labels and live regions
- [ ] Implement responsive layout
- [ ] Add prefers-reduced-motion handling
- [ ] Create configuration file (symbols, timing, paytable)
- [ ] Write unit tests for game logic
- [ ] Performance profiling and optimization
- [ ] Cross-browser testing
- [ ] Accessibility audit
- [ ] Get Stage 4 (Implementation Review) sign-off

### Polish & Launch Phase
- [ ] Final visual QA (pixel-perfect check)
- [ ] Sound mixing and volume balancing
- [ ] Animation fine-tuning based on feel
- [ ] Documentation completion
- [ ] Stakeholder demo and feedback
- [ ] Get Stage 5 (User Acceptance) sign-off
- [ ] Integration into main Dopamine site
- [ ] Production deployment
- [ ] Post-launch monitoring
- [ ] Schedule Stage 6 (Post-Launch Review) in 2 weeks

---

## Next Steps

**Immediate (Week 1):**
1. Create high-fidelity mockups using reference images as inspiration
2. Design and export 5 symbol graphics per specification
3. Document game state diagram (state machine for transitions)
4. Schedule Stage 2 (Mockup Review) meeting with stakeholders

**Short-term (Week 2-3):**
1. Address mockup review feedback and get sign-off
2. Begin code implementation (game.js class structure)
3. Implement reel animation system
4. Create CSS animations matching TR-1 timing table

**Mid-term (Week 4-5):**
1. Complete all functional requirements
2. Implement accessibility features
3. Performance optimization
4. Cross-browser and device testing
5. Schedule Stage 4 (Implementation Review)

**Pre-launch (Week 6):**
1. Address implementation review feedback
2. Final polish and QA
3. Stakeholder demo (Stage 5)
4. Documentation finalization
5. Production deployment

**Post-launch (Week 8):**
1. Monitor for issues
2. Collect user feedback
3. Conduct Stage 6 (Post-Launch Review)
4. Plan iteration 02 improvements if needed

---

## Appendix: Open Questions & Decisions Log

### Open Questions
1. **Audio mixing:** Should win sounds interrupt spin sounds, or queue/overlap?
   - **Decision needed by:** Stage 2 review
   - **Impact:** Audio implementation approach

2. **Credit system:** Should credits have a maximum cap, or grow indefinitely?
   - **Decision needed by:** Stage 3 review  
   - **Impact:** UI layout (number display width)

3. **Mobile interactions:** Tap to spin, or auto-only on mobile?
   - **Decision needed by:** Stage 2 review
   - **Impact:** Mobile UI design

### Decisions Made
1. **Q:** How many symbols in initial version?  
   **A:** 5 symbols (Cherry, Lemon, Orange, Seven, Jackpot) - simple first, expand later
   **Date:** [Original document creation]
   **Rationale:** Focus on polish over variety in iteration 01

2. **Q:** Auto-spin or manual only?  
   **A:** Auto-spin primary (3-5s interval), manual controls optional
   **Date:** [Original document creation]
   **Rationale:** "Watchability" goal - passive viewing experience

3. **Q:** Reels stop together or sequentially?  
   **A:** Sequential left→right with 300ms delays
   **Date:** [Original document creation]  
   **Rationale:** Builds anticipation, readable even when passively watching

4. **Q:** What easing functions for animations?  
   **A:** See TR-1 timing table - varies by animation type
   **Date:** [This document]
   **Rationale:** Disney animation principles (anticipation, ease-out)

5. **Q:** Background animation: Static or animated night-market scene?  
   **A:** Fully animated living night market with 3-5 parallax depth layers and environmental micro-events
   **Date:** 2026-02-15
   **Rationale:** Dual-mode entertainment philosophy requires persistent ambient motion; see "Living Night Market Environment" section

---

**Document Version:** 3.0  
**Last Updated:** 2026-02-15  
**Status:** ✅ Requirements Complete - Mockup Phase In Progress  
**Next Review:** Stage 2 (Mockup Review) - TBD
