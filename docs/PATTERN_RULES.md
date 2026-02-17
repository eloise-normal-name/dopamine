# Pattern Rules — Slot Machine Pattern Detection System

**Status:** Ready for Phase 2 Implementation  
**Audience:** Developers implementing `pattern.js`  
**Date:** 2026-02-17

---

## Table of Contents

1. [Overview](#overview)
2. [Pattern Type Definitions](#pattern-type-definitions)
3. [Overlap Behavior](#overlap-behavior)
4. [Unlock System](#unlock-system)
5. [Visualization Requirements](#visualization-requirements)
6. [Edge Cases & Special Conditions](#edge-cases--special-conditions)
7. [Implementation Guidelines](#implementation-guidelines)
8. [Test Cases](#test-cases)

---

## Overview

The slot machine uses a **progressive pattern detection system** where five distinct pattern types unlock as the player accumulates spins. This document defines explicit rules for each pattern type, their detection logic, overlap behavior, and visualization requirements.

### Design Philosophy

- **Gradual Learning:** Patterns reveal complexity over time, not all at once
- **Visual Communication:** Each pattern has a distinct visual signature
- **Clear Rules:** Detection logic must be deterministic and testable
- **Performance:** Pattern evaluation runs once per spin (not per frame)

### Grid Coordinate System

All pattern positions use a **zero-indexed (reel, row)** coordinate system:

```
Reel Count: 3
Rows Per Reel: 1 (visible symbol)

Grid coordinates:
  (0,0)  (1,0)  (2,0)
   🍒     🍒     🍒
```

For multi-row configurations (future):
```
  (0,0)  (1,0)  (2,0)
  (0,1)  (1,1)  (2,1)
  (0,2)  (1,2)  (2,2)
```

---

## Pattern Type Definitions

### 1. Linear Patterns

**Unlock:** Spin 1 (available immediately)  
**Complexity:** Simple  
**Concept:** Symbols form a continuous line (horizontal, vertical, or diagonal)

#### Detection Rules

A linear pattern is valid when:
1. **Minimum length:** 3 consecutive symbols
2. **Same symbol:** All symbols in the line must match exactly
3. **Direction:** Line follows one of these paths:
   - **Horizontal:** Same row, consecutive reels (e.g., `(0,0) → (1,0) → (2,0)`)
   - **Vertical:** Same reel, consecutive rows (e.g., `(0,0) → (0,1) → (0,2)`)
   - **Diagonal (down-right):** `(0,0) → (1,1) → (2,2)`
   - **Diagonal (up-right):** `(0,2) → (1,1) → (2,0)`

#### Valid Examples

**3-Reel Horizontal:**
```
🍒 🍒 🍒  ← Linear match (3)
```

**5-Reel Horizontal:**
```
🍋 🍋 🍋 🍋 🍊  ← Linear match (4 lemons)
```

**Diagonal (3x3 grid):**
```
🍒 🍊 🍊
🍊 🍒 🍊  ← Diagonal match (3 cherries)
🍊 🍊 🍒
```

#### Invalid Examples

```
🍒 🍊 🍒  ✗ Symbols don't match
🍒 🍒 ∅   ✗ Only 2 consecutive (need 3+)
```

#### Payout Calculation

```javascript
payout = symbolValue × lineLength
// Example: 3 cherries on a line
// payout = 10 (cherry base value) × 3 = 30 credits
```

#### Implementation Notes

- Check all possible line directions for each starting position
- Longer lines pay more (4-match > 3-match)
- Stop checking once line breaks (no gaps allowed)

---

### 2. Scatter Patterns

**Unlock:** Spin 11  
**Complexity:** Medium  
**Concept:** Matching symbols anywhere on the grid, position-independent

#### Detection Rules

A scatter pattern is valid when:
1. **Minimum count:** 3 or more of the same symbol
2. **Position-independent:** Symbols can be anywhere on visible grid
3. **No adjacency required:** Gaps between symbols are allowed
4. **Reel distribution:** Symbols must appear on at least 3 different reels (prevents single-reel clusters from counting as scatter)

#### Valid Examples

**3-Reel, 3 Scatters:**
```
🍋 🍊 🍋  ← 2 lemons scattered (reel 0, reel 2)
```
(Not valid yet — need 3+ symbols)

**5-Reel, 4 Scatters:**
```
🍒 🍊 🍒 🍋 🍒  ← 3 cherries scattered (reels 0, 2, 4) ✓
```

**6-Reel Grid, 5 Scatters:**
```
🍋 🍊 🍋 🍒 🍋 🍊
🍋 🍒 🍊 🍋 🍊 🍒
← 5 lemons scattered across grid ✓
```

#### Invalid Examples

```
🍒 🍊 🍊 🍊 🍋  ✗ Only 2 cherries (need 3+)
🍒 🍒 🍒 🍊 🍊  ✗ Cherries only on 1 reel (need 3+ reels)
```

#### Payout Calculation

```javascript
payout = symbolValue × scatterCount × scatterMultiplier
scatterMultiplier = 1.5  // Scatters pay 50% more than linear
// Example: 4 scattered lemons
// payout = 8 (lemon value) × 4 × 1.5 = 48 credits
```

#### Special Behavior: Bonus Triggers

Certain symbols (e.g., "Jackpot" or "Bonus" symbols) act as **scatter-only** symbols:
- 3+ bonus symbols anywhere → trigger special celebration
- Do not participate in other pattern types

#### Implementation Notes

- Count occurrences of each symbol across entire grid
- Verify symbols appear on 3+ different reels
- Bonus symbols should be checked separately from regular scatters

---

### 3. Cluster Patterns

**Unlock:** Spin 31  
**Complexity:** Medium-High  
**Concept:** Groups of adjacent matching symbols

#### Detection Rules

A cluster pattern is valid when:
1. **Minimum size:** 4 or more matching symbols
2. **Adjacency:** Each symbol must touch at least one other symbol in the cluster (horizontal or vertical, not diagonal)
3. **Connected group:** All symbols must form a single connected component
4. **Shape-agnostic:** Any blob shape counts (not restricted to geometric patterns)

#### Adjacency Definition

Two symbols are adjacent if they differ by exactly 1 in either reel OR row (but not both):
- `(0,0)` is adjacent to `(1,0)` (right) and `(0,1)` (down)
- `(0,0)` is **not** adjacent to `(1,1)` (diagonal)

#### Valid Examples

**L-Shaped Cluster (5 symbols):**
```
🍒 🍒 🍊
🍒 🍊 🍊  ← 4-symbol cluster (top-left L-shape) ✓
🍒 🍊 🍊
```

**Irregular Blob (6 symbols):**
```
🍋 🍋 🍋 🍊
🍊 🍋 🍋 🍋  ← 6-symbol cluster (irregular shape) ✓
```

#### Invalid Examples

```
🍒 🍊 🍒
🍊 🍊 🍊  ✗ Only 3 cherries (need 4+)
🍒 🍒 🍒 🍊
```

```
🍒 🍊 🍒
🍊 🍊 🍊  ✗ Cherries not adjacent (diagonal doesn't count)
🍒 🍊 🍊
```

#### Payout Calculation

```javascript
payout = symbolValue × clusterSize² × 0.5
// Quadratic scaling rewards large clusters
// Example: 6-symbol cherry cluster
// payout = 10 × 6² × 0.5 = 10 × 36 × 0.5 = 180 credits
```

#### Implementation Notes

- Use flood-fill algorithm to detect connected components
- Check 4-directional adjacency (up, down, left, right)
- A grid can have multiple independent clusters (see overlap rules)

---

### 4. Shape Patterns

**Unlock:** Spin 61  
**Complexity:** High  
**Concept:** Specific geometric formations of matching symbols

#### Detection Rules

A shape pattern is valid when:
1. **Exact geometric match:** Symbols must form one of the predefined shapes
2. **Minimum size:** Shape must meet minimum cell count
3. **Solid fill:** All positions in the shape must contain matching symbols (no gaps)
4. **Orientation matters:** Most shapes have specific orientations (see table below)

#### Defined Shapes

| Shape Name | Min Size | Grid Requirement | Orientation | Example |
|------------|----------|------------------|-------------|---------|
| **L-Shape** | 5 cells | 3×3 | 4 rotations | See below |
| **T-Shape** | 5 cells | 3×3 | 4 rotations | See below |
| **Plus** | 5 cells | 3×3 | Fixed | See below |
| **Box 2×2** | 4 cells | 2×2 | Fixed | See below |
| **Box 3×3** | 9 cells | 3×3 | Fixed | See below |
| **Arrow** | 5 cells | 3×3 | 4 rotations | See below |

#### Shape Examples

**L-Shape (4 rotations):**
```
Rotation 1:     Rotation 2:     Rotation 3:     Rotation 4:
🍒 ∅ ∅          ∅ ∅ 🍒          ∅ ∅ 🍒          🍒 🍒 🍒
🍒 ∅ ∅          ∅ ∅ 🍒          🍒 🍒 🍒          🍒 ∅ ∅
🍒 🍒 🍒          🍒 🍒 🍒          🍒 ∅ ∅          🍒 ∅ ∅
```

**T-Shape:**
```
🍋 🍋 🍋
∅ 🍋 ∅
∅ 🍋 ∅
```

**Plus:**
```
∅ 🍊 ∅
🍊 🍊 🍊
∅ 🍊 ∅
```

**Box 2×2:**
```
🍒 🍒
🍒 🍒
```

**Arrow (pointing up):**
```
∅ 🍋 ∅
🍋 🍋 🍋
🍋 ∅ 🍋
```

#### Payout Calculation

```javascript
payout = symbolValue × shapeComplexity × 10
shapeComplexity = {
  'box-2x2': 1,
  'L-shape': 2,
  'T-shape': 2,
  'plus': 3,
  'arrow': 3,
  'box-3x3': 5
}
// Example: T-shape with lemons
// payout = 8 × 2 × 10 = 160 credits
```

#### Implementation Notes

- Pre-define shape templates as coordinate offsets from anchor point
- Check all possible anchor positions and rotations
- A shape pattern takes precedence over cluster if both match

---

### 5. Transform Patterns

**Unlock:** Spin 100  
**Complexity:** Expert  
**Concept:** Dynamic patterns involving special symbol behaviors

#### Detection Rules

Transform patterns are **not static matches** — they modify the grid after initial evaluation:

1. **Wild Expansion:** Wild symbol expands to fill its entire reel/row, completing nearby patterns
2. **Symbol Morph:** Adjacent symbols transform to match a triggering symbol
3. **Cascade:** Winning symbols are removed, new symbols drop down, potentially creating chain reactions

#### Transform Types

##### A. Wild Expansion

**Trigger:** Wild symbol appears on grid  
**Behavior:** Wild expands in a direction to complete patterns

**Rules:**
- **Horizontal expansion:** Wild fills entire row
- **Vertical expansion:** Wild fills entire reel
- **Direction chosen:** Whichever creates the highest-value pattern
- **Secondary evaluation:** After expansion, re-run pattern detection

**Example:**
```
Before:            After (vertical expansion):
🍒 🍊 🍒          🍒 🍊 🍒
🍒 ⭐ 🍒    →    🍒 🍒 🍒   ← Now a horizontal line!
🍊 🍊 🍒          🍊 🍒 🍒   ← Another horizontal line!
```

##### B. Symbol Morph

**Trigger:** 2 adjacent identical symbols appear  
**Behavior:** Adjacent symbols transform to match

**Rules:**
- Check all 4-directional neighbors
- If neighbor is a different symbol, 50% chance to transform
- Morph happens before pattern evaluation
- Maximum 1 morph per spin (prevents runaway cascades)

**Example:**
```
Before:            After (orange morphs to lemon):
🍋 🍋 🍊          🍋 🍋 🍋   ← Now a linear match!
```

##### C. Cascade

**Trigger:** Any winning pattern detected  
**Behavior:** Winning symbols removed, new symbols fall from top

**Rules:**
1. **Remove winners:** Clear all cells involved in winning patterns
2. **Drop symbols:** Symbols above empty cells fall down
3. **Fill from top:** New random symbols fill empty top positions
4. **Re-evaluate:** Check for new patterns in modified grid
5. **Chain bonus:** Each cascade level adds +0.5× multiplier to payout
6. **Max cascades:** Stop after 5 cascades (prevents infinite loops)

**Example:**
```
Spin 1:              Cascade 1:           Cascade 2:
🍒 🍒 🍒            🍊 🍋 🍊            🍊 🍋 🍊
🍊 🍋 🍊     →      🍊 🍋 🍊     →      🍋 🍋 🍋   ← New match!
(line match)        (dropped)            (final)

Payout = (line) + (cascade line × 1.5)
```

#### Payout Calculation

```javascript
// Wild expansion: Base pattern payout + wild bonus
payout = basePatternPayout × 1.5

// Symbol morph: Base pattern payout (no bonus)
payout = basePatternPayout

// Cascade: Cumulative with multipliers
payout = pattern1 + (pattern2 × 1.5) + (pattern3 × 2.0) + ...
```

#### Implementation Notes

- **Order of operations:** Morph → Expansion → Evaluation → Cascade
- **Wild symbols:** Should be rare (5% weight in symbol pool)
- **Cascade performance:** Limit to 5 cascades to prevent runaway computation
- **Visual feedback:** Each transform step should animate (see visualization section)

---

## Overlap Behavior

### Core Principle: Multiple Patterns Can Coexist

**Rule:** A single spin can detect **multiple patterns simultaneously**, and **all detected patterns pay out**.

### Priority System

When the same cells participate in multiple pattern types, apply these rules:

1. **Shape > Cluster:** If cells form both a shape and a cluster, only the shape pays (higher value)
2. **Transform > Static:** Transform patterns take precedence and modify the grid before static evaluation
3. **Linear + Scatter:** Can coexist if they use different symbols
4. **Multiple Linear:** Can coexist if they use different cells (e.g., horizontal + vertical lines)

### Examples

#### Example 1: Non-Overlapping Patterns (Both Pay)

```
🍒 🍒 🍒 🍋 🍊
🍊 🍊 🍊 🍋 🍒
```
- **Pattern 1:** Horizontal line of cherries (top row)
- **Pattern 2:** Horizontal line of oranges (bottom row)
- **Payout:** Both patterns pay out independently
- **Total:** `(cherry_line) + (orange_line)`

#### Example 2: Overlapping Cells (Shape Wins)

```
🍒 🍒 ∅
🍒 🍒 ∅
```
- **Pattern A:** 2×2 Box shape (4 cherries)
- **Pattern B:** Could also be seen as a 4-symbol cluster
- **Resolution:** Shape takes precedence (higher payout)
- **Payout:** Box shape only

#### Example 3: Scatter + Linear (Both Pay)

```
🍋 🍒 🍒 🍒 🍋 🍋
```
- **Pattern 1:** Linear (3 cherries in middle)
- **Pattern 2:** Scatter (3 lemons at positions 0, 4, 5)
- **Resolution:** Different symbols, no conflict
- **Payout:** Both patterns pay out

#### Example 4: Transform Creates New Pattern

```
Initial:           After Wild Expansion:
🍒 ⭐ 🍒          🍒 🍒 🍒   ← Linear pattern created by transform
```
- **Pattern 1:** Transform (wild expansion)
- **Pattern 2:** Linear (created by transform)
- **Payout:** Transform bonus + resulting linear pattern

### Overlap Detection Algorithm

```javascript
function resolveOverlaps(detectedPatterns) {
  const finalPatterns = [];
  const cellUsage = new Map(); // track which cells are claimed by which pattern type

  // Priority order: Transform > Shape > Cluster > Linear > Scatter
  const sortedPatterns = detectedPatterns.sort(byPriority);

  for (const pattern of sortedPatterns) {
    const cells = pattern.cells;
    const conflicts = cells.filter(cell => cellUsage.has(cell));

    if (conflicts.length === 0) {
      // No overlap, add pattern
      finalPatterns.push(pattern);
      cells.forEach(cell => cellUsage.set(cell, pattern.type));
    } else {
      // Check if higher priority pattern already claimed these cells
      const existingTypes = conflicts.map(cell => cellUsage.get(cell));
      if (pattern.type === 'shape' && existingTypes.includes('cluster')) {
        // Shape replaces cluster
        finalPatterns.push(pattern);
        cells.forEach(cell => cellUsage.set(cell, pattern.type));
      }
      // Otherwise, skip this pattern (lower priority)
    }
  }

  return finalPatterns;
}
```

---

## Unlock System

### Progressive Revelation

Patterns unlock based on **total spin count** across all sessions:

| Spin Count | Unlocked Patterns | UI Indicator |
|------------|-------------------|--------------|
| 1 | Linear | "Basic Paylines Active" |
| 11 | Linear, Scatter | "Scatter Wins Unlocked!" (discovery animation) |
| 31 | Linear, Scatter, Cluster | "Cluster Pays Active!" |
| 61 | Linear, Scatter, Cluster, Shape | "Shape Patterns Revealed!" |
| 100 | All (including Transform) | "Master Mode: All Patterns Active!" |

### Discovery Celebration

When a pattern type unlocks for the first time:
1. **Pause gameplay** for 2 seconds
2. **Show discovery modal:** "New Pattern Type: [Cluster]"
3. **Animate example:** Show 3-second loop of pattern type in action
4. **Particle burst:** Medium-tier celebration (400 particles, pattern color)
5. **Audio cue:** Special "discovery" sound effect
6. **Resume:** Auto-play continues

### Persistence

- Unlock state stored in `localStorage` with key: `slot-machine-spin-count`
- Format: `{ totalSpins: 47, discoveredPatterns: ['linear', 'scatter'] }`
- Reset button clears localStorage and resets to spin 1

---

## Visualization Requirements

Each pattern type requires distinct visual feedback so viewers can learn through observation.

### Common Elements (All Patterns)

- **Duration:** 1.5 seconds (TR-2.3)
- **Layer:** SVG overlay on z-index 20
- **Timing:** Appears during CELEBRATING state
- **Fade-in:** 200ms ease-in
- **Fade-out:** 300ms ease-out

### Pattern-Specific Visuals

#### 1. Linear Pattern

**Visual:** Solid line connecting matched symbols

```svg
<line
  x1={start.x} y1={start.y}
  x2={end.x} y2={end.y}
  stroke="#00D9FF"  /* cyan */
  stroke-width="6"
  stroke-linecap="round"
/>
```

**Animation:** Line draws from left to right (or top to bottom) over 300ms

#### 2. Scatter Pattern

**Visual:** Light beams connecting all scattered symbols (constellation style)

```svg
<!-- Draw lines between all scatter positions -->
<g class="scatter-constellation">
  {scatterPositions.map((pos, i) =>
    scatterPositions.slice(i+1).map(otherPos =>
      <line x1={pos.x} y1={pos.y} x2={otherPos.x} y2={otherPos.y}
            stroke="#FF6B9D" stroke-width="2" opacity="0.6" />
    )
  )}
  <!-- Glowing circles at each scatter position -->
  {scatterPositions.map(pos =>
    <circle cx={pos.x} cy={pos.y} r="10"
            fill="#FF6B9D" opacity="0.8" filter="url(#glow)" />
  )}
</g>
```

**Animation:** Beams appear sequentially (50ms delay between each), circles pulse

#### 3. Cluster Pattern

**Visual:** Glowing outline around cluster perimeter

```svg
<!-- Calculate convex hull or bounding polygon -->
<polygon
  points={calculateClusterOutline(cells)}
  fill="rgba(255, 215, 0, 0.2)"  /* translucent gold */
  stroke="#FFD700"
  stroke-width="5"
  filter="url(#glow)"
/>
```

**Animation:** Outline traces clockwise starting from top-left cell (500ms duration)

#### 4. Shape Pattern

**Visual:** Neon outline tracing the shape

```svg
<path
  d={generateShapePath(shapeType, cells)}
  fill="none"
  stroke="#00FFAA"  /* mint green */
  stroke-width="8"
  stroke-linecap="round"
  stroke-linejoin="round"
  filter="url(#neon-glow)"
/>
```

**Animation:** Path draws using `stroke-dasharray` animation (like line-drawing), 800ms duration

#### 5. Transform Pattern

**Visual:** Animated transformation sequence

**Wild Expansion:**
```svg
<!-- Show expanding rays from wild symbol -->
<g class="wild-expansion">
  <circle cx={wild.x} cy={wild.y} r="20" fill="white" opacity="0.8" />
  {expansionCells.map(cell =>
    <line x1={wild.x} y1={wild.y} x2={cell.x} y2={cell.y}
          stroke="white" stroke-width="4" opacity="1" />
  )}
</g>
```

**Symbol Morph:**
```svg
<!-- Cross-fade between old and new symbol -->
<image href={oldSymbol} opacity={1 - t} />
<image href={newSymbol} opacity={t} />
```

**Cascade:**
- Symbols involved in win fade out (200ms)
- Remaining symbols slide down with physics (500ms)
- New symbols appear from top with slight bounce (300ms)

### SVG Filter Definitions

```svg
<defs>
  <!-- Glow effect for all patterns -->
  <filter id="glow">
    <feGaussianBlur stdDeviation="4" result="coloredBlur"/>
    <feMerge>
      <feMergeNode in="coloredBlur"/>
      <feMergeNode in="SourceGraphic"/>
    </feMerge>
  </filter>

  <!-- Stronger neon glow for shapes -->
  <filter id="neon-glow">
    <feGaussianBlur stdDeviation="6" result="coloredBlur"/>
    <feMerge>
      <feMergeNode in="coloredBlur"/>
      <feMergeNode in="coloredBlur"/>
      <feMergeNode in="SourceGraphic"/>
    </feMerge>
  </filter>
</defs>
```

### Near-Miss Hints

When no pattern matches but a near-miss occurs (e.g., 2/3 symbols in a line):
- **Visual:** Show ghost outline at 30% opacity
- **Duration:** 1 second
- **Frequency:** Max once every 5 spins (avoid overload)

---

## Edge Cases & Special Conditions

### Grid Size Constraints

**Problem:** Some patterns require minimum grid sizes

| Pattern Type | Minimum Grid | Reason |
|--------------|--------------|--------|
| Linear (horizontal) | 1 row, 3 reels | Need 3 consecutive symbols |
| Linear (vertical) | 3 rows, 1 reel | Need 3 stacked symbols |
| Cluster | 2 rows, 2 reels | Need adjacency space |
| Shape (L/T/Plus) | 3 rows, 3 reels | Shape definitions require 3×3 |
| Shape (Box 2×2) | 2 rows, 2 reels | Minimum box size |

**Solution:** Disable pattern types that can't fit in current grid configuration

```javascript
function getEligiblePatterns(reelCount, rowCount, totalSpins) {
  const unlocked = getUnlockedTypes(totalSpins);
  return unlocked.filter(type => {
    if (type === 'linear-vertical') return rowCount >= 3;
    if (type === 'shape' && type.includes('3x3')) return reelCount >= 3 && rowCount >= 3;
    if (type === 'cluster') return reelCount >= 2 && rowCount >= 2;
    return true;  // linear-horizontal and scatter work on any grid
  });
}
```

### Symbol Scarcity

**Problem:** With 5 symbol types and 3 reels, probability of 3-match is low

**Solution:** Weight distribution ensures matches occur ~15% of spins (configurable in `config.js`)

```javascript
config.symbols = [
  { id: 'cherry', weight: 30 },  // Most common
  { id: 'lemon',  weight: 25 },
  { id: 'orange', weight: 20 },
  { id: 'seven',  weight: 15 },
  { id: 'jackpot', weight: 10 }, // Rarest
];
```

### Transform Infinite Loops

**Problem:** Cascade could theoretically create infinite chains

**Solution:** Hard cap at 5 cascades per spin

```javascript
function evaluateWithCascades(grid, maxCascades = 5) {
  let cascadeCount = 0;
  let totalPayout = 0;

  while (cascadeCount < maxCascades) {
    const patterns = detectPatterns(grid);
    if (patterns.length === 0) break;

    const cascadePayout = patterns.reduce((sum, p) => sum + p.payout, 0);
    const multiplier = 1 + (cascadeCount * 0.5);
    totalPayout += cascadePayout * multiplier;

    grid = applyCascade(grid, patterns);
    cascadeCount++;
  }

  return { totalPayout, cascadeCount };
}
```

### Overlapping Wild Expansion

**Problem:** Multiple wild symbols could expand in conflicting directions

**Solution:** Process wilds left-to-right, each expansion modifies grid before next wild is evaluated

```javascript
function processWildExpansions(grid, wilds) {
  const sortedWilds = wilds.sort((a, b) => a.reel - b.reel);
  let modifiedGrid = grid;

  for (const wild of sortedWilds) {
    const expansion = determineExpansionDirection(modifiedGrid, wild);
    modifiedGrid = applyExpansion(modifiedGrid, wild, expansion);
  }

  return modifiedGrid;
}
```

### Pattern History Overflow

**Problem:** Unlimited history storage could grow unbounded

**Solution:** Cap at 10 entries, FIFO eviction

```javascript
class PatternHistory {
  constructor(maxSize = 10) {
    this.entries = [];
    this.maxSize = maxSize;
  }

  add(pattern) {
    this.entries.unshift(pattern);  // Add to front
    if (this.entries.length > this.maxSize) {
      this.entries.pop();  // Remove oldest
    }
  }
}
```

### Same-Symbol Adjacency Ambiguity

**Problem:** In a 2×2 grid of identical symbols, is it a cluster or a box shape?

**Solution:** Shape takes precedence (higher payout)

```
🍒 🍒
🍒 🍒
→ Detected as "Box 2×2" (not cluster), pays shape bonus
```

### Reel Count Changes Mid-Game

**Problem:** Responsive layout changes reel count during play (e.g., device rotation)

**Solution:**
- Allow layout change only during IDLE state
- If forced during SPINNING, wait for COOLDOWN before adapting
- Re-evaluate eligible patterns after layout change

---

## Implementation Guidelines

### Module Structure

```javascript
// pattern.js
export class PatternEngine {
  constructor(config) {
    this.config = config;
    this.detectors = {
      linear: new LinearDetector(config),
      scatter: new ScatterDetector(config),
      cluster: new ClusterDetector(config),
      shape: new ShapeDetector(config),
      transform: new TransformDetector(config),
    };
  }

  evaluate(grid, reelCount, totalSpins) {
    const unlockedTypes = this.getUnlockedTypes(totalSpins);
    const eligibleTypes = this.filterByGridSize(unlockedTypes, grid);

    // Apply transforms first (they modify the grid)
    if (eligibleTypes.includes('transform')) {
      grid = this.detectors.transform.apply(grid);
    }

    // Detect static patterns
    const patterns = [];
    for (const type of eligibleTypes) {
      if (type !== 'transform') {
        patterns.push(...this.detectors[type].detect(grid, reelCount));
      }
    }

    // Resolve overlaps
    const finalPatterns = this.resolveOverlaps(patterns);

    // Mark new discoveries
    finalPatterns.forEach(p => {
      p.isNew = !this.discoveredTypes.has(p.type);
      if (p.isNew) this.discoveredTypes.add(p.type);
    });

    return finalPatterns;
  }

  getUnlockedTypes(totalSpins) {
    const unlocks = this.config.patternUnlocks;
    return Object.keys(unlocks).filter(type => totalSpins >= unlocks[type]);
  }

  resolveOverlaps(patterns) {
    // See "Overlap Behavior" section
  }
}
```

### Detection Performance

**Target:** Pattern evaluation completes in < 2ms (TR-3.4)

**Optimization strategies:**
- Early exit: Stop checking once pattern found in a region
- Memoization: Cache grid hash to avoid re-checking identical grids
- Spatial indexing: Pre-compute adjacency maps

```javascript
// Example: Cluster detection with flood-fill
function detectClusters(grid) {
  const visited = new Set();
  const clusters = [];

  for (let reel = 0; reel < grid.length; reel++) {
    for (let row = 0; row < grid[reel].length; row++) {
      const key = `${reel},${row}`;
      if (!visited.has(key)) {
        const cluster = floodFill(grid, reel, row, visited);
        if (cluster.length >= 4) {  // Minimum cluster size
          clusters.push({ type: 'cluster', cells: cluster, ... });
        }
      }
    }
  }

  return clusters;
}
```

---

## Test Cases

### Unit Test Structure

```javascript
// pattern.test.js (run with: node --input-type=module pattern.test.js)
import assert from 'assert';
import { PatternEngine } from './pattern.js';

const testGrids = {
  linear_3_match: [
    ['cherry', 'cherry', 'cherry'],
  ],
  scatter_4_match: [
    ['lemon', 'orange', 'lemon', 'seven', 'lemon', 'lemon'],
  ],
  cluster_5_match: [
    ['cherry', 'cherry', 'orange'],
    ['cherry', 'orange', 'orange'],
    ['cherry', 'orange', 'orange'],
  ],
  shape_L: [
    ['cherry', null, null],
    ['cherry', null, null],
    ['cherry', 'cherry', 'cherry'],
  ],
  // ... more test grids
};

function testLinearDetection() {
  const engine = new PatternEngine(config);
  const result = engine.evaluate(testGrids.linear_3_match, 3, 1);
  assert.strictEqual(result.length, 1, 'Should detect 1 pattern');
  assert.strictEqual(result[0].type, 'linear', 'Should be linear type');
  assert.strictEqual(result[0].cells.length, 3, 'Should match 3 cells');
  console.log('✓ Linear detection test passed');
}

function testOverlapResolution() {
  const engine = new PatternEngine(config);
  const grid = [
    ['cherry', 'cherry'],
    ['cherry', 'cherry'],
  ];
  const result = engine.evaluate(grid, 2, 100);  // All patterns unlocked
  // Should detect box shape, not cluster (shape priority)
  assert.strictEqual(result[0].type, 'shape', 'Shape should take priority');
  console.log('✓ Overlap resolution test passed');
}

// Run all tests
testLinearDetection();
testOverlapResolution();
// ... more tests
```

### Critical Test Cases

1. **Empty Grid:** No patterns detected, no errors
2. **Single Symbol:** No patterns (need 3+ for linear, 4+ for cluster)
3. **All Same Symbol:** All pattern types trigger (test overlap resolution)
4. **Diagonal Line:** Correctly identified as linear (not cluster)
5. **Near-Miss:** Detect and return near-miss hint data
6. **Cascade Chain:** Correctly applies multipliers and stops at cap
7. **Grid Size Edge:** Shape patterns disabled on 2×2 grid
8. **Multiple Patterns:** Correctly returns array of all valid patterns

---

## References

- **[TECHNICAL_PLAN_SLOT_MACHINE.md](TECHNICAL_PLAN_SLOT_MACHINE.md)** — Section 5.3 (PatternEngine API)
- **[PHASE_1_NOTES.md](PHASE_1_NOTES.md)** — Section 5 (Pattern Detection Scope)
- **[SLOT_MACHINE_ITERATION_01.md](design/visual/SLOT_MACHINE_ITERATION_01.md)** — FR-6 (Pattern unlock thresholds), VR-12 (Visualization)

---

**Document Owner:** Development team  
**Next Review:** Before Phase 2 implementation begins  
**Status:** Ready for implementation
