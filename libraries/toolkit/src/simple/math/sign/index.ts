/**
 * Returns the sign of a number (-1, 0, or 1)
 *
 * Determines whether a number is positive, negative, or zero.
 * Returns 1 for positive numbers, -1 for negative numbers, and
 * 0 for zero (including both +0 and -0). Returns NaN for NaN
 * or invalid inputs.
 *
 * @param n - The number to get the sign of
 * @returns -1, 0, or 1 based on sign, or NaN if invalid
 * @example
 * ```typescript
 * // Basic signs
 * sign(5)
 * // 1
 *
 * sign(-5)
 * // -1
 *
 * sign(0)
 * // 0
 *
 * // Array operations
 * const numbers = [-3, -1, 0, 1, 3]
 * numbers.map(sign)
 * // [-1, -1, 0, 1, 1]
 *
 * // Comparison helper
 * const compare = (a: number, b: number) => sign(a - b)
 * compare(5, 3)
 * // 1 (a > b)
 *
 * // Absolute value implementation
 * const abs = (n: number) => n * sign(n)
 * abs(-10)
 * // 10
 * ```
 * @pure Always returns same result for same input
 * @safe Returns NaN for invalid inputs
 */
const sign = (
	n: number | null | undefined,
): number => {
	if (n == null || typeof n !== "number") {
		return NaN
	}

	return Math.sign(n)
}

export default sign
