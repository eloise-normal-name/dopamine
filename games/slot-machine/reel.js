/**
 * Reel — single-reel rendering with physics-based animation.
 * 
 * Each Reel instance manages one column of the slot machine,
 * handling symbol display, spin animation via requestAnimationFrame,
 * and the deceleration → bounce → settle stop sequence.
 */

import { ease, animate } from '../../shared/utils/animation.js';
import { weightedRandom } from '../../shared/utils/random.js';

/**
 * @typedef {Object} ReelState
 * @property {number} index — reel position (0-based)
 * @property {Array<{name:string, displayName:string}>} strip — ordered symbol strip
 * @property {number} position — current scroll offset (px)
 * @property {number} targetPosition — final stop position (px)
 * @property {'idle'|'spinning'|'decelerating'|'bouncing'|'stopped'} phase
 */

class Reel {
  /**
   * @param {HTMLElement} containerEl — DOM element for this reel
   * @param {number} index — reel position (0-based)
   * @param {Object} config — game configuration
   */
  constructor(containerEl, index, config) {
    this.container = containerEl;
    this.index = index;
    this.config = config;
    this.phase = 'idle';
    this.position = 0;
    this.speed = 0;
    this.strip = [];
    this.symbolElements = [];
    this._spinAnimation = null;
    this._stopAnimation = null;
    this._result = null;

    this._buildStrip();
  }

  /**
   * Populate the reel strip with weighted random symbols.
   */
  _buildStrip() {
    this.container.innerHTML = '';
    this.strip = [];
    this.symbolElements = [];

    const count = this.config.symbolsPerReel * 3;
    for (let i = 0; i < count; i++) {
      const symbol = weightedRandom(this.config.symbols, (s) => s.weight);
      this.strip.push(symbol);

      const el = document.createElement('div');
      el.className = 'symbol';
      el.textContent = symbol.name;
      el.setAttribute('aria-label', symbol.displayName);
      this.container.appendChild(el);
      this.symbolElements.push(el);
    }
  }

  /**
   * Start the spin animation.
   * Accelerates from 0 to full speed over the configured acceleration time.
   */
  spin() {
    if (this.phase === 'spinning') return;

    this.phase = 'spinning';
    this._result = null;
    this.container.classList.add('spinning');

    const maxSpeed = this.config.symbolSize / 16; // px per frame (~60fps)
    const accelDuration = this.config.spinAcceleration || 200;

    this._spinAnimation = animate({
      duration: accelDuration,
      easing: ease.easeInQuad,
      onUpdate: (progress) => {
        this.speed = maxSpeed * progress;
      },
      onComplete: () => {
        this.speed = maxSpeed;
      },
    });

    this._runSpinLoop();
  }

  /**
   * Continuous rAF loop during spinning phase.
   */
  _runSpinLoop() {
    if (this.phase !== 'spinning' && this.phase !== 'decelerating') return;

    this.position -= this.speed;

    // Wrap position to prevent overflow
    const totalHeight = this.strip.length * this.config.symbolSize;
    if (Math.abs(this.position) >= totalHeight) {
      this.position += totalHeight;
    }

    this._applyTransform();
    this._rafId = requestAnimationFrame(() => this._runSpinLoop());
  }

  /**
   * Stop the reel on the given symbol with deceleration → bounce → settle.
   * @param {Object} symbol — target symbol to land on
   * @param {Function} [onComplete] — called when settle animation finishes
   */
  stopAt(symbol, onComplete) {
    const stopStartTime = performance.now();
    console.log(`[Reel ${this.index}] Stop sequence started for ${symbol.displayName} at ${stopStartTime.toFixed(2)}ms`);
    
    this._result = symbol;
    this.phase = 'decelerating';

    if (this._spinAnimation) {
      this._spinAnimation.cancel();
      this._spinAnimation = null;
    }

    // Cancel the continuous spin loop
    if (this._rafId) {
      cancelAnimationFrame(this._rafId);
      this._rafId = null;
    }

    this.container.classList.remove('spinning');

    // Update the center symbol to show the result
    const centerIndex = Math.floor(this.symbolElements.length / 2);
    if (this.symbolElements[centerIndex]) {
      this.symbolElements[centerIndex].textContent = symbol.name;
      this.symbolElements[centerIndex].setAttribute('aria-label', symbol.displayName);
    }

    // Bounce animation
    const bounceDuration = this.config.decelerationBounce || 150;
    const settleDuration = this.config.symbolSettle || 100;
    const overshoot = this.config.symbolSize * 0.15;

    // Phase 1: Overshoot down
    this._stopAnimation = animate({
      duration: bounceDuration,
      easing: ease.easeOutCubic,
      onUpdate: (t) => {
        const bounceOffset = overshoot * Math.sin(t * Math.PI);
        this._applyTransform(bounceOffset);
      },
      onComplete: () => {
        // Phase 2: Settle
        this.phase = 'bouncing';
        this._stopAnimation = animate({
          duration: settleDuration,
          easing: ease.easeOutQuad,
          onUpdate: (t) => {
            const settleOffset = overshoot * 0.3 * (1 - t) * Math.sin(t * Math.PI * 2);
            this._applyTransform(settleOffset);
          },
          onComplete: () => {
            this.phase = 'stopped';
            this._applyTransform(0);
            console.log(`[Reel ${this.index}] Stop complete (total: ${(performance.now() - stopStartTime).toFixed(2)}ms)`);
            if (onComplete) onComplete();
          },
        });
      },
    });
  }

  /**
   * Apply CSS transform to scroll the reel.
   * @param {number} [extraOffset=0] — additional offset for bounce/settle
   */
  _applyTransform(extraOffset = 0) {
    const y = this.position + extraOffset;
    this.container.style.transform = `translateY(${y}px)`;
  }

  /**
   * Get the currently visible center symbol.
   * @returns {Object|null} symbol at center position
   */
  getVisibleSymbol() {
    return this._result;
  }

  /**
   * Adapt reel size for multi-reel layouts.
   * @param {number} symbolSize — new symbol height in px
   */
  resize(symbolSize) {
    this.config = { ...this.config, symbolSize };
    this.symbolElements.forEach((el) => {
      el.style.height = `${symbolSize}px`;
      el.style.fontSize = `${Math.floor(symbolSize * 0.6)}px`;
    });
  }

  /**
   * Clean up timers and animation frames.
   */
  destroy() {
    if (this._spinAnimation) this._spinAnimation.cancel();
    if (this._stopAnimation) this._stopAnimation.cancel();
    if (this._rafId) cancelAnimationFrame(this._rafId);
    this.container.innerHTML = '';
  }
}

export { Reel };
