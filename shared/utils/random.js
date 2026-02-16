/**
 * Random number generation and weighted selection utilities.
 * 
 * Provides deterministic-friendly random helpers used by all games
 * for symbol selection, particle spawning, and procedural variety.
 * 
 * @example
 * import { weightedRandom, randomInt, shuffle } from '../../shared/utils/random.js';
 * 
 * const symbol = weightedRandom(symbols, s => s.weight);
 * const delay = randomInt(100, 500);
 */

/**
 * Select an item from an array using weighted probability.
 * @template T
 * @param {T[]} items — array of items to choose from
 * @param {(item: T) => number} weightFn — function returning the weight of each item
 * @returns {T} selected item
 */
function weightedRandom(items, weightFn) {
  const totalWeight = items.reduce((sum, item) => sum + weightFn(item), 0);
  let random = Math.random() * totalWeight;

  for (const item of items) {
    random -= weightFn(item);
    if (random <= 0) {
      return item;
    }
  }

  return items[items.length - 1];
}

/**
 * Generate a random integer in [min, max] (inclusive).
 * @param {number} min
 * @param {number} max
 * @returns {number}
 */
function randomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

/**
 * Generate a random float in [min, max).
 * @param {number} min
 * @param {number} max
 * @returns {number}
 */
function randomFloat(min, max) {
  return Math.random() * (max - min) + min;
}

/**
 * Fisher-Yates shuffle (in-place).
 * @template T
 * @param {T[]} array
 * @returns {T[]} the same array, shuffled
 */
function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

/**
 * Pick a random element from an array (uniform).
 * @template T
 * @param {T[]} array
 * @returns {T}
 */
function randomPick(array) {
  return array[Math.floor(Math.random() * array.length)];
}

export { weightedRandom, randomInt, randomFloat, shuffle, randomPick };
