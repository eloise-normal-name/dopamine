/**
 * Slot Machine Game Configuration
 * 
 * All tunables for timing, symbols, layout, and behavior.
 * Timing values sourced from TR-1 motion timing table.
 */

export const config = {
  // ── Reel setup ──
  reelCount: 3,              // default, range 1-6
  symbolsPerReel: 10,        // strip length

  // ── Symbols (weight determines probability) ──
  symbols: [
    { id: 'cherry',  name: '🍒', displayName: 'Cherry',  weight: 40, payout: 2,   color: '#ef4444' },
    { id: 'lemon',   name: '🍋', displayName: 'Lemon',   weight: 30, payout: 3,   color: '#eab308' },
    { id: 'orange',  name: '🍊', displayName: 'Orange',  weight: 20, payout: 5,   color: '#f97316' },
    { id: 'seven',   name: '7️⃣', displayName: 'Seven',   weight: 9,  payout: 10,  color: '#3b82f6' },
    { id: 'jackpot', name: '💎', displayName: 'Jackpot', weight: 1,  payout: 100, color: '#8b5cf6' },
  ],

  // ── Timing (ms) — sourced from TR-1 ──
  spinAcceleration: 200,     // ramp-up to full speed
  spinDuration: 2000,        // how long reels spin at full speed
  reelStopDelay: 300,        // stagger between each reel stopping
  reelStaggerDelay: 200,     // legacy alias for reel stop stagger
  decelerationBounce: 150,   // bounce overshoot duration
  symbolSettle: 100,         // final settle after bounce
  patternDetection: 200,     // time for pattern evaluation
  cooldownDelay: 2000,       // pause after evaluation before next spin
  spinInterval: 3000,        // time between auto-spins

  // ── Game rules ──
  initialCredits: 100,
  spinCost: 1,
  maxCredits: 99999,         // soft cap triggers overflow celebration
  overflowBehavior: 'celebrate', // 'celebrate' = mega jackpot + reset
  overflowAnimationDelay: 500, // delay between overflow animations (ms)

  // ── Visual ──
  symbolSize: 80,            // symbol height in pixels
  animationEasing: 'easeOut',

  // ── State machine ──
  states: {
    IDLE: 'idle',
    SPINNING: 'spinning',
    EVALUATING: 'evaluating',
    CELEBRATING: 'celebrating',
    COOLDOWN: 'cooldown',
  },
};
