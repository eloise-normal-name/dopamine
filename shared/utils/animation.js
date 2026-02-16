/**
 * Animation utilities — easing functions and requestAnimationFrame helpers.
 * 
 * Provides standard easing curves and a managed animation loop
 * used by reel physics, particle systems, and UI transitions.
 * 
 * @example
 * import { ease, animate } from '../../shared/utils/animation.js';
 * 
 * animate({
 *   duration: 300,
 *   easing: ease.easeOutBounce,
 *   onUpdate: (t) => { element.style.transform = `translateY(${t * 100}px)`; },
 *   onComplete: () => console.log('done'),
 * });
 */

/**
 * Standard easing functions.
 * Each takes a progress value t ∈ [0, 1] and returns an eased value.
 */
const ease = {
  linear: (t) => t,

  easeInQuad: (t) => t * t,
  easeOutQuad: (t) => t * (2 - t),
  easeInOutQuad: (t) => (t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t),

  easeInCubic: (t) => t * t * t,
  easeOutCubic: (t) => (--t) * t * t + 1,
  easeInOutCubic: (t) =>
    t < 0.5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1,

  easeOutBack: (t) => {
    const c = 1.70158;
    return 1 + (c + 1) * Math.pow(t - 1, 3) + c * Math.pow(t - 1, 2);
  },

  easeOutBounce: (t) => {
    if (t < 1 / 2.75) {
      return 7.5625 * t * t;
    } else if (t < 2 / 2.75) {
      return 7.5625 * (t -= 1.5 / 2.75) * t + 0.75;
    } else if (t < 2.5 / 2.75) {
      return 7.5625 * (t -= 2.25 / 2.75) * t + 0.9375;
    } else {
      return 7.5625 * (t -= 2.625 / 2.75) * t + 0.984375;
    }
  },

  easeOutElastic: (t) => {
    if (t === 0 || t === 1) return t;
    return Math.pow(2, -10 * t) * Math.sin((t - 0.1) * 5 * Math.PI) + 1;
  },
};

/**
 * Run a timed animation using requestAnimationFrame.
 * @param {Object} options
 * @param {number} options.duration — animation length in ms
 * @param {Function} [options.easing=ease.linear] — easing function (t → t)
 * @param {(progress: number) => void} options.onUpdate — called each frame with eased progress [0,1]
 * @param {() => void} [options.onComplete] — called when animation finishes
 * @returns {{ cancel: () => void }} handle to cancel the animation
 */
function animate({ duration, easing = ease.linear, onUpdate, onComplete }) {
  let startTime = null;
  let rafId = null;
  let cancelled = false;

  function frame(timestamp) {
    if (cancelled) return;

    if (startTime === null) startTime = timestamp;
    const elapsed = timestamp - startTime;
    const rawProgress = Math.min(elapsed / duration, 1);
    const easedProgress = easing(rawProgress);

    onUpdate(easedProgress);

    if (rawProgress < 1) {
      rafId = requestAnimationFrame(frame);
    } else if (onComplete) {
      onComplete();
    }
  }

  rafId = requestAnimationFrame(frame);

  return {
    cancel() {
      cancelled = true;
      if (rafId !== null) {
        cancelAnimationFrame(rafId);
      }
    },
  };
}

/**
 * Returns a promise that resolves after the given ms.
 * @param {number} ms
 * @returns {Promise<void>}
 */
function delay(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export { ease, animate, delay };
