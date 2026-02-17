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

  // ── Visual ──
  symbolSize: 80,            // symbol height in pixels
  animationEasing: 'easeOut',

  // ── Audio ──
  audio: {
    // Mixing strategy: how to handle overlapping sounds (reel stops + win sounds)
    // Options: 'interrupt' | 'queue-fade' | 'duck'
    // Selected: 'queue-fade' — reel stops fade out over 100ms when win detected,
    // win sound starts immediately. Balances immediacy with smoothness.
    mixingStrategy: 'queue-fade',
    fadeOutDuration: 100,    // fade-out time in ms for queue-fade strategy
    duckVolume: 0.3,         // reduced volume for duck strategy (0.0-1.0)
    volume: 0.7,             // global volume (0.0-1.0)
    muted: false,            // whether audio is muted by default

    // Sound priorities (higher = more important)
    // Used by mixing strategy to determine which sounds take precedence
    priorities: {
      jackpot: 100,
      big_win: 80,
      medium_win: 60,
      small_win: 40,
      reel_stop: 20,
      spin_start: 10,
      ambient: 5,
    },

    // Sound file paths (to be populated when assets are available)
    sounds: {
      spin_start: '/assets/sounds/spin-start.mp3',
      reel_stop: '/assets/sounds/reel-stop.mp3',
      small_win: '/assets/sounds/win-small.mp3',
      medium_win: '/assets/sounds/win-medium.mp3',
      big_win: '/assets/sounds/win-big.mp3',
      jackpot: '/assets/sounds/jackpot.mp3',
      ambient: '/assets/sounds/ambient.mp3',
    },
  },

  // ── State machine ──
  states: {
    IDLE: 'idle',
    SPINNING: 'spinning',
    EVALUATING: 'evaluating',
    CELEBRATING: 'celebrating',
    COOLDOWN: 'cooldown',
  },
};
