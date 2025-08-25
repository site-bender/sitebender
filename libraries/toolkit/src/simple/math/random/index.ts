/**
 * Generates a random number within a specified range
 *
 * Returns a random floating-point number between min (inclusive) and
 * max (exclusive). Uses Math.random() internally for pseudorandom
 * generation. Returns NaN for invalid inputs or if min >= max.
 *
 * @curried (min) => (max) => random
 * @param min - Lower bound (inclusive)
 * @param max - Upper bound (exclusive)
 * @returns Random number in range [min, max), or NaN if invalid
 * @example
 * ```typescript
 * // Basic ranges
 * random(0)(1)
 * // Random number between 0 and 1
 *
 * random(0)(10)
 * // Random number between 0 and 10
 *
 * // Negative ranges
 * random(-10)(10)
 * // Random number between -10 and 10
 *
 * // Invalid range returns NaN
 * random(10)(5)
 * // NaN
 *
 * // Partial application
 * const randomPercent = random(0)(100)
 * // Random percentage value
 *
 * // Dice rolling helper
 * const d6 = () => Math.floor(random(1)(7))
 * d6()
 * // Random integer from 1 to 6
 *
 * // Random sampling
 * const sample = (min: number, max: number, n: number) =>
 *   Array.from({ length: n }, () => random(min)(max))
 * sample(0, 10, 5)
 * // [2.3, 7.1, 4.5, 9.2, 1.8]
 * ```
 * @impure Returns different results each call (uses Math.random)
 * @curried Enables partial application for range reuse
 * @safe Returns NaN for invalid inputs or invalid range
 */
const random = (
	min: number | null | undefined,
) =>
(
	max: number | null | undefined,
): number => {
	if (min == null || typeof min !== "number") {
		return NaN
	}

	if (max == null || typeof max !== "number") {
		return NaN
	}

	// Check for NaN inputs
	if (isNaN(min) || isNaN(max)) {
		return NaN
	}

	// Validate range
	if (min >= max) {
		return NaN
	}

	// Generate random number in range [min, max)
	return Math.random() * (max - min) + min
}

export default random
