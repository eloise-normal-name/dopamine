/**
 * Lightweight pub/sub event bus for inter-module communication.
 * 
 * All game modules communicate through the event bus rather than
 * direct references, keeping modules decoupled and testable.
 * 
 * @example
 * import { EventBus } from '../../shared/utils/events.js';
 * 
 * const bus = new EventBus();
 * bus.on('spin:start', (data) => console.log('Spinning!', data));
 * bus.emit('spin:start', { reelCount: 3 });
 */

class EventBus {
  constructor() {
    /** @type {Map<string, Set<Function>>} */
    this._listeners = new Map();
  }

  /**
   * Subscribe to an event.
   * @param {string} event — event name (e.g., 'spin:start')
   * @param {Function} callback — handler function
   * @returns {Function} unsubscribe function
   */
  on(event, callback) {
    if (!this._listeners.has(event)) {
      this._listeners.set(event, new Set());
    }
    this._listeners.get(event).add(callback);

    return () => this.off(event, callback);
  }

  /**
   * Subscribe to an event, but only fire once.
   * @param {string} event
   * @param {Function} callback
   * @returns {Function} unsubscribe function
   */
  once(event, callback) {
    const wrapper = (...args) => {
      this.off(event, wrapper);
      callback(...args);
    };
    return this.on(event, wrapper);
  }

  /**
   * Unsubscribe from an event.
   * @param {string} event
   * @param {Function} callback
   */
  off(event, callback) {
    const listeners = this._listeners.get(event);
    if (listeners) {
      listeners.delete(callback);
      if (listeners.size === 0) {
        this._listeners.delete(event);
      }
    }
  }

  /**
   * Emit an event to all subscribers.
   * @param {string} event
   * @param {*} [data] — optional payload
   */
  emit(event, data) {
    const listeners = this._listeners.get(event);
    if (listeners) {
      for (const callback of listeners) {
        callback(data);
      }
    }
  }

  /**
   * Remove all listeners, optionally for a specific event.
   * @param {string} [event] — if omitted, clears all events
   */
  clear(event) {
    if (event) {
      this._listeners.delete(event);
    } else {
      this._listeners.clear();
    }
  }
}

export { EventBus };
