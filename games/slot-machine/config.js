/**
 * Slot Machine Game Configuration
 */

export const config = {
  // Timing (in milliseconds)
  spinDuration: 2000,        // How long reels spin
  spinInterval: 3000,        // Time between auto-spins
  reelStaggerDelay: 200,     // Delay between each reel stopping
  
  // Symbols (weight determines probability)
  symbols: [
    { name: '🍒', displayName: 'Cherry', weight: 40, payout: 2 },
    { name: '🍋', displayName: 'Lemon', weight: 30, payout: 3 },
    { name: '🍊', displayName: 'Orange', weight: 20, payout: 5 },
    { name: '7️⃣', displayName: 'Seven', weight: 9, payout: 10 },
    { name: '💎', displayName: 'Jackpot', weight: 1, payout: 100 }
  ],
  
  // Game rules
  reelCount: 3,
  symbolsPerReel: 10,
  initialCredits: 100,
  spinCost: 1,
  
  // Visual
  animationEasing: 'easeOut',
  symbolSize: 80,  // pixels
};
