/**
 * Rounds a number down to the nearest integer
 *
 * Returns the largest integer less than or equal to the given number.
 * This is the floor function that always rounds toward negative infinity.
 * For positive numbers, it rounds down; for negative numbers, it rounds
 * away from zero. Returns NaN for non-numeric inputs to support safe
 * error handling.
 *
 * @param n - Number to round down
 * @returns Largest integer <= n, or NaN if invalid
 * @example
 * ```typescript
 * floor(4.9)
 * // 4
 *
 * floor(-4.1)
 * // -5
 *
 * floor(0)
 * // 0
 *
 * floor(Infinity)
 * // Infinity
 *
 * floor(-Infinity)
 * // -Infinity
 *
 * floor(NaN)
 * // NaN
 *
 * floor(null)
 * // NaN
 * ```
 * @pure - Always returns same result for same input
 * @safe - Returns NaN for invalid inputs
 * @idempotent - floor(floor(x)) === floor(x)
 */
const floor = (
	n: number | null | undefined,
): number => {
	if (n == null || typeof n !== "number") {
		return NaN
	}

	return Math.floor(n)
}

export default floor
