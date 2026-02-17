/**
 * Slot Machine Game
 * 
 * Auto-playing slot machine with state-machine architecture,
 * physics-based reels, and event-driven module communication.
 */

import { config } from './config.js';
import { Reel } from './reel.js';
import { EventBus } from '../../shared/utils/events.js';
import { weightedRandom } from '../../shared/utils/random.js';
import { delay } from '../../shared/utils/animation.js';

class SlotMachine {
  // Mobile breakpoint constant
  static MOBILE_BREAKPOINT = 768;
  
  constructor(containerId, options = {}) {
    this.container = document.getElementById(containerId);
    this.config = { ...config, ...options };
    this.bus = new EventBus();
    this.state = {
      phase: this.config.states.IDLE,
      running: false,
      credits: this.config.initialCredits,
      lastWin: 0,
      totalSpins: 0,
      reels: [],
    };
    
    this.elements = {
      credits: document.getElementById('credits'),
      lastWin: document.getElementById('last-win'),
      status: document.getElementById('status'),
      startBtn: document.getElementById('start-btn'),
      stopBtn: document.getElementById('stop-btn'),
      resetBtn: document.getElementById('reset-btn'),
      reelContainers: [],
    };
    
    this.reelModules = [];
    this.autoPlayTimer = null;
    this.lastMobileTapTime = 0;
    this.resizeTimeout = null;
    this.init();
  }
  
  init() {
    // Initialize reel modules
    for (let i = 0; i < this.config.reelCount; i++) {
      const containerEl = document.getElementById(`reel-${i}`);
      this.elements.reelContainers[i] = containerEl;
      this.reelModules[i] = new Reel(containerEl, i, this.config);
    }
    
    // Bind event handlers
    this.handleStart = () => this.start();
    this.handleStop = () => this.stop();
    this.handleReset = () => this.reset();
    this.handleKeydown = (e) => this._onKeydown(e);
    this.handleMobileToggle = (e) => this._onMobileToggle(e);
    this.handleResize = () => {
      // Debounce resize handler to avoid excessive updates
      clearTimeout(this.resizeTimeout);
      this.resizeTimeout = setTimeout(() => {
        this._updateStatusForDevice();
      }, 250);
    };
    
    // Set up event listeners
    this.elements.startBtn.addEventListener('click', this.handleStart);
    this.elements.stopBtn.addEventListener('click', this.handleStop);
    this.elements.resetBtn.addEventListener('click', this.handleReset);
    document.addEventListener('keydown', this.handleKeydown);
    window.addEventListener('resize', this.handleResize);
    
    // Mobile tap-anywhere toggle (both touch and click for mobile viewports)
    this.container.addEventListener('touchstart', this.handleMobileToggle);
    this.container.addEventListener('click', this.handleMobileToggle);

    // Wire up event bus logging for state transitions
    this.bus.on('state:change', ({ from, to }) => {
      console.log(`[SlotMachine] ${from} → ${to}`);
    });
    
    this.render();
    this._updateStatusForDevice();
  }

  /**
   * Transition to a new state, emitting an event.
   * @param {string} newPhase
   */
  _setState(newPhase) {
    const from = this.state.phase;
    this.state.phase = newPhase;
    this.bus.emit('state:change', { from, to: newPhase });
  }

  /**
   * Handle keyboard shortcuts (AC-3.1, AC-3.2).
   * @param {KeyboardEvent} e
   */
  _onKeydown(e) {
    if (e.key === ' ' || e.key === 'Spacebar') {
      e.preventDefault();
      if (!this.state.running) {
        this.start();
      }
    } else if (e.key === 'Escape') {
      this.stop();
    }
  }

  /**
   * Handle mobile tap-anywhere toggle.
   * On mobile, tapping anywhere on the game container toggles auto-play on/off.
   * Debounced to prevent double-firing from touch + click events.
   * @param {TouchEvent|MouseEvent} e
   */
  _onMobileToggle(e) {
    // Only handle on mobile viewports (where buttons are hidden)
    if (window.innerWidth > SlotMachine.MOBILE_BREAKPOINT) return;
    
    // Don't handle if clicking/touching the reset button
    if (e.target.id === 'reset-btn' || e.target.closest('#reset-btn')) {
      return;
    }
    
    // Debounce to prevent double-firing from touch + click events
    const now = Date.now();
    if (now - this.lastMobileTapTime < 300) {
      return;
    }
    this.lastMobileTapTime = now;
    
    // Only prevent default on touch events when actually toggling
    // This preserves scroll behavior
    if (e.type === 'touchstart') {
      e.preventDefault();
    }
    
    // Toggle auto-play
    if (this.state.running) {
      this.stop();
    } else {
      this.start();
    }
  }

  /**
   * Update status text based on device type.
   * Shows different instructions for mobile vs desktop.
   * Called on init and window resize to adapt to viewport changes.
   */
  _updateStatusForDevice() {
    if (window.innerWidth <= SlotMachine.MOBILE_BREAKPOINT) {
      this.updateStatus('Tap anywhere to start/stop');
    } else {
      this.updateStatus('Press Start to begin (Space to start, Escape to stop)');
    }
  }
  
  start() {
    if (this.state.running) return;
    
    this.state.running = true;
    this.elements.startBtn.disabled = true;
    this.elements.stopBtn.disabled = false;
    this.updateStatus('Auto-playing...');
    this.bus.emit('game:start');
    
    this.autoPlay();
  }
  
  stop() {
    this.state.running = false;
    this._setState(this.config.states.IDLE);
    this.elements.startBtn.disabled = false;
    this.elements.stopBtn.disabled = true;
    this.updateStatus('Stopped');
    this.bus.emit('game:stop');
    
    if (this.autoPlayTimer) {
      clearTimeout(this.autoPlayTimer);
      this.autoPlayTimer = null;
    }
  }
  
  reset() {
    this.stop();
    this.state.credits = this.config.initialCredits;
    this.state.lastWin = 0;
    this.state.totalSpins = 0;

    // Rebuild reel strips
    this.reelModules.forEach((reel) => reel.destroy());
    this.reelModules = [];
    for (let i = 0; i < this.config.reelCount; i++) {
      this.reelModules[i] = new Reel(this.elements.reelContainers[i], i, this.config);
    }

    this.render();
    this.updateStatus('Reset - Press Start to begin');
    this.bus.emit('game:reset');
  }
  
  autoPlay() {
    if (!this.state.running) return;
    
    this.spin();
    
    this.autoPlayTimer = setTimeout(() => {
      this.autoPlay();
    }, this.config.spinDuration + this.config.spinInterval);
  }
  
  async spin() {
    if (this.state.phase === this.config.states.SPINNING) return;
    
    // Check if player has credits
    if (this.state.credits < this.config.spinCost) {
      this.updateStatus('Out of credits! Reset to continue.');
      this.stop();
      return;
    }

    // IDLE → SPINNING
    this._setState(this.config.states.SPINNING);
    this.state.credits -= this.config.spinCost;
    this.state.totalSpins++;
    this.updateStatus('Spinning...');
    this.render();
    this.bus.emit('spin:start', { totalSpins: this.state.totalSpins });
    
    // Select winning symbols
    const results = [];
    for (let i = 0; i < this.config.reelCount; i++) {
      results.push(weightedRandom(this.config.symbols, (s) => s.weight));
    }
    
    // Start all reels spinning
    this.reelModules.forEach((reel) => reel.spin());
    
    // Stagger reel stops
    const stopPromises = this.reelModules.map((reel, index) => {
      return new Promise((resolve) => {
        setTimeout(() => {
          reel.stopAt(results[index], () => {
            this.bus.emit('reel:stopped', { index, symbol: results[index] });
            resolve();
          });
        }, this.config.spinDuration + index * this.config.reelStopDelay);
      });
    });

    // Wait for all reels to stop
    await Promise.all(stopPromises);
    this.bus.emit('reels:allStopped');

    // SPINNING → EVALUATING
    this._setState(this.config.states.EVALUATING);
    await delay(this.config.patternDetection);

    // Check for wins
    const win = this.checkWin(results);

    if (win) {
      // EVALUATING → CELEBRATING
      this._setState(this.config.states.CELEBRATING);
      this.bus.emit('win', { amount: this.state.lastWin, symbols: results });
      
      // Add win glow animation to slot machine
      this.container.querySelector('.slot-machine').classList.add('winning');
      setTimeout(() => {
        this.container.querySelector('.slot-machine').classList.remove('winning');
      }, 1800); // 3 iterations × 600ms
      
      await delay(this.config.cooldownDelay);
    }

    // → COOLDOWN → IDLE
    this._setState(this.config.states.COOLDOWN);
    await delay(this.config.patternDetection);
    this._setState(this.config.states.IDLE);
  }
  
  /**
   * Check for matching symbols.
   * @param {Object[]} results — array of symbol objects
   * @returns {boolean} true if win detected
   */
  checkWin(results) {
    // Check if all symbols match
    const firstSymbol = results[0];
    const allMatch = results.every(r => r.name === firstSymbol.name);
    
    if (allMatch) {
      const winAmount = firstSymbol.payout * this.config.spinCost;
      const oldCredits = this.state.credits;
      this.state.credits += winAmount;
      this.state.lastWin = winAmount;
      this.updateStatus(`🎉 WIN! ${firstSymbol.displayName} - ${winAmount} credits!`);
      
      // Animate credit counter
      this.animateCredits(oldCredits, this.state.credits);
      
      return true;
    } else {
      this.state.lastWin = 0;
      this.updateStatus('No match - Try again!');
      this.render();
      return false;
    }
  }
  
  /**
   * Animate credit counter from old value to new value.
   * @param {number} from - Starting credit value
   * @param {number} to - Ending credit value
   */
  animateCredits(from, to) {
    const duration = 300; // ms
    const startTime = performance.now();
    
    const animate = (currentTime) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      
      // Ease out cubic
      const easeProgress = 1 - Math.pow(1 - progress, 3);
      
      const currentValue = Math.floor(from + (to - from) * easeProgress);
      this.elements.credits.textContent = currentValue;
      
      if (progress < 1) {
        requestAnimationFrame(animate);
      } else {
        this.elements.credits.textContent = to;
        this.elements.lastWin.textContent = this.state.lastWin;
      }
    };
    
    requestAnimationFrame(animate);
  }
  
  updateStatus(message) {
    this.elements.status.textContent = message;
  }
  
  render() {
    this.elements.credits.textContent = this.state.credits;
    this.elements.lastWin.textContent = this.state.lastWin;
  }
  
  delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
  
  destroy() {
    this.stop();
    // Clean up event listeners
    this.elements.startBtn.removeEventListener('click', this.handleStart);
    this.elements.stopBtn.removeEventListener('click', this.handleStop);
    this.elements.resetBtn.removeEventListener('click', this.handleReset);
    document.removeEventListener('keydown', this.handleKeydown);
    window.removeEventListener('resize', this.handleResize);
    this.container.removeEventListener('touchstart', this.handleMobileToggle);
    this.container.removeEventListener('click', this.handleMobileToggle);
    // Clean up timeouts
    if (this.resizeTimeout) {
      clearTimeout(this.resizeTimeout);
    }
    // Clean up reel modules
    this.reelModules.forEach((reel) => reel.destroy());
    // Clean up event bus
    this.bus.clear();
  }
}

// Auto-initialize if on the slot machine page
if (document.getElementById('game-container')) {
  const game = new SlotMachine('game-container');
  window.slotMachine = game; // Make available globally for debugging
}

export { SlotMachine };
