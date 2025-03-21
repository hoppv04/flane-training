/**
 * Generates a random delay time in milliseconds.
 *
 * @returns {number} A random delay time between 2000ms and 4000ms
 */

export const randomDelay = (): number =>
  Math.floor(Math.random() * 2000) + 2000;
