# Slot Machine Game

A classic 3-reel slot machine that plays automatically.

## Features

- Auto-spin every few seconds
- Weighted random symbols
- Win detection and payout calculation
- Smooth spinning animations
- Sound effects
- Credit system

## Symbols and Payouts

| Symbol | Weight | Payout (3 match) |
|--------|--------|------------------|
| Cherry | 40% | 2x |
| Lemon | 30% | 3x |
| Orange | 20% | 5x |
| Seven | 9% | 10x |
| Jackpot | 1% | 100x |

## Configuration

Edit `config.js` to customize:
- Spin duration and interval
- Symbol weights and payouts
- Initial credits
- Spin cost
- Visual settings

## Files

- `index.html` - Game page
- `game.js` - Game logic and state management
- `styles.css` - Visual styling
- `config.js` - Game configuration
- `README.md` - This file

## How It Works

1. **Initialization**: Set up reels with random starting positions
2. **Auto-play Loop**: Every N seconds, trigger a spin
3. **Spin**: Animate reels independently with staggered timing
4. **Stop**: Reels stop at random positions (weighted)
5. **Check Win**: Compare reel symbols, calculate payout
6. **Display Result**: Show win animation or continue
7. **Repeat**: Loop back to step 2

## Usage

```javascript
import { SlotMachine } from './game.js';

const game = new SlotMachine('game-container', {
  spinInterval: 3000,
  autoPlay: true
});

game.start();
```

## Future Enhancements

- [ ] Multiple paylines
- [ ] Bonus rounds
- [ ] Progressive jackpot
- [ ] Sound effects
- [ ] Particle effects on wins
- [ ] Mobile touch controls
