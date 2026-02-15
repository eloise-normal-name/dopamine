# Gacha Game

A treasure chest opening simulation that plays automatically.

> Design kickoff doc: [../../docs/design/visual/GACHA_ITERATION_01.md](../../docs/design/visual/GACHA_ITERATION_01.md)

## Status
🚧 Coming Soon

## Planned Features

- Auto-open every few seconds
- Multiple rarity tiers (Common, Rare, Epic, Legendary)
- Collection tracking
- Duplicate system
- Visual treasure chest opening animation
- Particle effects
- Sound effects
- Pity system (guaranteed legendary after 90 pulls)

## Concept

Viewers watch as the game automatically opens treasure chests in an endless loop. Each chest arrives center-stage, rattles with anticipation, cracks open, and reveals a prize with rarity-appropriate fanfare. The game maintains a collection and shows statistics about opens.

## Rarity Distribution (Planned)

| Rarity | Probability | Visual |
|--------|-------------|--------|
| Common | 60% | Soft green `#10b981` |
| Rare | 30% | Cool blue `#3b82f6` |
| Epic | 9% | Deep purple `#8b5cf6` |
| Legendary | 1% | Molten gold `#f59e0b` |

## Implementation Notes

This will be implemented after the slot machine is complete. It will follow the same architecture pattern and reuse shared utilities.
