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

## Ready-for-Implementation Checklist

- [x] Narrative angle chosen
- [x] Visual hierarchy and readability priorities defined
- [x] Symbol style constraints defined
- [x] Initial sample art provided
- [ ] Convert sample art into visual mockup PNG/SVG
- [ ] Add motion timing table for CSS implementation
