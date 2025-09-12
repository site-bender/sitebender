/**
 * Rounds a number up to the nearest integer
 *
 * Returns the smallest integer greater than or equal to the given number.
 * This is the ceiling function that always rounds toward positive infinity.
 * For positive numbers, it rounds up; for negative numbers, it rounds
 * toward zero. Returns NaN for non-numeric inputs to support safe error
 * handling.
 *
 * @param n - Number to round up
 * @returns Smallest integer >= n, or NaN if invalid
 * @example
 * ```typescript
 * // Positive decimals round up
 * ceiling(4.1)
 * // 5
 *
 * ceiling(4.9)
 * // 5
 *
 * // Negative decimals round toward zero
 * ceiling(-4.1)
 * // -4
 *
 * ceiling(-0.1)
 * // -0
 *
 * // Integers remain unchanged
 * ceiling(5)
 * // 5
 *
 * // Special values
 * ceiling(Infinity)
 * // Infinity
 *
 * ceiling(NaN)
 * // NaN
 *
 * // Invalid inputs return NaN
 * ceiling(null)
 * // NaN
 *
 * // Pagination calculations
 * ceiling(95 / 10)
 * // 10
 *
 * ceiling(101 / 10)
 * // 11
 * ```
 * @pure Always returns same result for same input
 * @safe Returns NaN for invalid inputs
 * @idempotent ceiling(ceiling(x)) === ceiling(x)
 */
import isNullish from "../../validation/isNullish/index.ts"

const ceiling = (
	n: number | null | undefined,
): number => {
	if (isNullish(n) || typeof n !== "number") {
		return NaN
	}

	return Math.ceil(n)
}

export default ceiling
