import isNullish from "../../validation/isNullish/index.ts"

/**
 * Generates a random integer within a specified range
 *
 * Returns a random integer between min (inclusive) and max (exclusive).
 * Uses Math.random() internally with proper flooring for integer generation.
 * Returns NaN for invalid inputs, non-integer bounds, or if min >= max.
 *
 * @curried (min) => (max) => randomInteger
 * @param min - Lower bound (inclusive, must be integer)
 * @param max - Upper bound (exclusive, must be integer)
 * @returns Random integer in range [min, max), or NaN if invalid
 * @example
 * ```typescript
 * // Basic integer ranges
 * randomInteger(0)(10)
 * // Random integer from 0 to 9
 *
 * randomInteger(1)(7)
 * // Random integer from 1 to 6 (dice roll)
 *
 * // Negative ranges
 * randomInteger(-10)(10)
 * // Random integer from -10 to 9
 *
 * // Non-integer bounds return NaN
 * randomInteger(1.5)(10)
 * // NaN
 *
 * // Partial application
 * const d6 = randomInteger(1)(7)
 * const d20 = randomInteger(1)(21)
 * const coinFlip = randomInteger(0)(2)
 *
 * // Array index selection
 * const randomIndex = (arr: Array<unknown>) =>
 *   randomInteger(0)(arr.length)
 *
 * // Random RGB color component
 * const randomRGB = randomInteger(0)(256)
 * const color = { r: randomRGB, g: randomRGB, b: randomRGB }
 * ```
 * @impure Returns different results each call (uses Math.random)
 * @curried Enables partial application for range reuse
 * @safe Returns NaN for invalid inputs or invalid range
 */
export default function randomInteger(
	min: number | null | undefined,
) {
	return function generateRandomUpTo(
		max: number | null | undefined,
	): number {
		if (isNullish(min) || typeof min !== "number") {
			return NaN
		}

		if (isNullish(max) || typeof max !== "number") {
			return NaN
		}

		// Check for NaN inputs
		if (isNaN(min) || isNaN(max)) {
			return NaN
		}

		// Check if bounds are integers
		if (!Number.isInteger(min) || !Number.isInteger(max)) {
			return NaN
		}

		// Validate range
		if (min >= max) {
			return NaN
		}

		// Generate random integer in range [min, max)
		return Math.floor(Math.random() * (max - min)) + min
	}
}
