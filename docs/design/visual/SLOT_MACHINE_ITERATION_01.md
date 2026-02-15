# Slot Machine Iteration 01 (Design-First)

This document starts slot-machine iteration with narrative refinement, opinionated visual direction, and quick sample art.

## Narrative Focus (Iteration Goal)

**Theme:** *"Neon Night Market Slots"*  
Keep the familiar 3-reel loop, but shift tone from casino realism to playful arcade nostalgia. The viewer should feel *cozy anticipation* rather than high-stakes tension.

## Opinionated Design Decisions

1. **High-legibility over realism**  
   Use bold icon silhouettes and thick outlines so reel outcomes are readable at a glance.
2. **Warm win language**  
   Wins should pulse and sparkle, never flash aggressively.
3. **One strong visual hook**  
   Keep the purple Dopamine gradient UI shell, but make the reel window feel like a glowing marquee.
4. **Symbol simplicity first**  
   Keep symbol set to 5 icons (Cherry, Lemon, Orange, Seven, Jackpot) until polish phase.
5. **Animation pacing**  
   Reels should stop left -> right with clear delay so anticipation is readable even when passively watching.

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
- **FR-1.1** System shall support 3-reel slot machine with independent reel control
- **FR-1.2** Each reel shall display 5 distinct symbols (Cherry, Lemon, Orange, Seven, Jackpot)
- **FR-1.3** Reels shall spin and stop sequentially left → right with visible delay
- **FR-1.4** System shall detect and display winning combinations across single payline
- **FR-1.5** Credit balance shall update accurately after each spin result

#### FR-2: User Interaction
- **FR-2.1** System shall auto-spin at configurable interval (default: 3-5 seconds)
- **FR-2.2** Game shall support manual start/stop controls
- **FR-2.3** Sound effects shall be toggle-able via user control
- **FR-2.4** Game state shall be resettable to initial conditions

#### FR-3: Visual Feedback
- **FR-3.1** Winning combinations shall trigger visual celebration (pulse, glow, sparkle)
- **FR-3.2** Credit counter shall animate smoothly on value changes
- **FR-3.3** Reel symbols shall be clearly readable during idle state
- **FR-3.4** Spin animation shall show motion blur or scroll effect
- **FR-3.5** Each reel stop shall have distinct visual feedback

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

### 3. Animation & Timing Requirements

#### TR-1: Motion Timing Table

| Animation Event | Duration | Easing Function | Delay Pattern |
|----------------|----------|-----------------|---------------|
| **Spin Start** | 200ms | ease-in | All reels simultaneous |
| **Reel Spinning** | 1500-2000ms | linear | Continuous during spin |
| **Reel 1 Stop** | 400ms | cubic-bezier(0.25, 0.1, 0.25, 1) | 0ms (immediate) |
| **Reel 2 Stop** | 400ms | cubic-bezier(0.25, 0.1, 0.25, 1) | +300ms after Reel 1 |
| **Reel 3 Stop** | 400ms | cubic-bezier(0.25, 0.1, 0.25, 1) | +300ms after Reel 2 |
| **Symbol Settle** | 100ms | ease-out | On each reel stop |
| **Win Pulse** | 600ms | ease-in-out | After all reels stopped |
| **Win Glow** | 800ms | ease-out | Simultaneous with pulse |
| **Win Sparkle** | 1000ms | ease-out | Staggered 100ms intervals |
| **Credit Update** | 300ms | ease-out | After win animations |
| **Idle Reset** | 500ms | ease-in-out | 2000ms after credit update |

#### TR-2: Interaction Timing
- **TR-2.1** Auto-spin interval: 3000ms minimum between spin cycles
- **TR-2.2** Button press response: <100ms feedback latency
- **TR-2.3** State transition: max 200ms for any state change
- **TR-2.4** Total spin cycle: 2500-3500ms from start to credits settled

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
- **PR-1.1** Initial page load: <2 seconds on 3G connection
- **PR-1.2** Total asset size (HTML/CSS/JS/images): <500KB
- **PR-1.3** Symbol images: <20KB each (optimized SVG or compressed PNG)
- **PR-1.4** First Contentful Paint: <1.5 seconds

#### PR-2: Runtime Performance
- **PR-2.1** Memory usage: <50MB heap size during active gameplay
- **PR-2.2** No memory leaks over 100+ spin cycles
- **PR-2.3** Smooth 60fps during all animations
- **PR-2.4** CPU usage: <30% on mid-tier devices

#### PR-3: Browser Compatibility
- **PR-3.1** Support: Chrome 90+, Firefox 88+, Safari 14+, Edge 90+
- **PR-3.2** Graceful degradation for older browsers
- **PR-3.3** Mobile support: iOS 14+, Android 10+
- **PR-3.4** Responsive: 320px to 2560px viewport width

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
- [x] Functional requirements (FR-1 through FR-3)
- [x] Visual requirements (VR-1 through VR-5)
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
- [ ] `reel-frame.svg` - Decorative border around reel window
- [ ] `glow-overlay.png` - Neon glow effect (multiply/screen blend)
- [ ] `sparkle-particle.svg` - For win celebrations (reusable sprite)
- [ ] `title-graphic.svg` - "NEON NIGHT MARKET" stylized text

#### Background Elements
- [ ] `background-gradient.svg` - Dark purple base gradient
- [ ] `neon-lights-texture.png` - Optional atmospheric overlay (subtle)

### Audio Assets Required

#### Sound Effects
- [ ] `spin-start.ogg` - Mechanical whir, 250ms, <25KB
- [ ] `reel-stop-1.ogg` - Click sound, 440 Hz base, 50ms, <10KB
- [ ] `reel-stop-2.ogg` - Click sound, 494 Hz base, 50ms, <10KB
- [ ] `reel-stop-3.ogg` - Click sound, 523 Hz base, 50ms, <10KB
- [ ] `win-small.ogg` - Pleasant chime, 200ms, <15KB
- [ ] `win-medium.ogg` - Cascade notes, 500ms, <30KB
- [ ] `win-big.ogg` - Triumphant fanfare, 1000ms, <50KB
- [ ] `win-jackpot.ogg` - Extended celebration, 2000ms, <80KB

**Format:** OGG Vorbis (primary), MP3 (fallback)

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
- [ ] `_animateWin()` - trigger celebration animations
- [ ] `_updateCredits(amount)` - animate credit counter

#### CSS Animations
- [ ] `@keyframes spin` - reel spinning effect
- [ ] `@keyframes stop` - reel stop with settle
- [ ] `@keyframes pulse` - winning symbol pulse
- [ ] `@keyframes glow` - neon glow effect
- [ ] `@keyframes sparkle` - particle effects
- [ ] `@keyframes countUp` - credit counter animation
- [ ] Responsive media queries (320px, 768px, 1024px breakpoints)
- [ ] `prefers-reduced-motion` alternative animations

#### Configuration (config.js)
- [ ] Symbol array: `['cherry', 'lemon', 'orange', 'seven', 'jackpot']`
- [ ] Symbol weights/probabilities for randomization
- [ ] Paytable: define winning combinations and payouts
- [ ] Timing constants: spin duration, stop delays, celebration length
- [ ] Credit settings: starting balance, bet amount
- [ ] Animation easing functions (from TR-1 table)

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

4. **Background animation:** Static or animated night-market scene?
   - **Decision needed by:** Stage 2 review
   - **Impact:** Performance budget, visual complexity

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

---

**Document Version:** 2.0  
**Last Updated:** 2026-02-15  
**Status:** ✅ Requirements Complete - Mockup Phase In Progress  
**Next Review:** Stage 2 (Mockup Review) - TBD
