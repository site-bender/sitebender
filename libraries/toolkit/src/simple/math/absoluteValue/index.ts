/**
 * Returns the absolute value of a number
 *
 * Computes the absolute value of a number, which is its distance from
 * zero on the number line regardless of direction. Positive numbers
 * remain unchanged, negative numbers become positive. Returns NaN for
 * non-numeric inputs to support safe error handling and monadic wrapping.
 *
 * @param n - Number to get absolute value of
 * @returns Absolute value of the number, or NaN if invalid
 * @example
 * ```typescript
 * // Basic usage
 * absoluteValue(5)      // 5
 * absoluteValue(-5)     // 5
 * absoluteValue(0)      // 0
 *
 * // Special values
 * absoluteValue(-Infinity)  // Infinity
 * absoluteValue(NaN)        // NaN
 *
 * // Edge cases
 * absoluteValue(null)       // NaN
 * absoluteValue(undefined)  // NaN
 *
 * // Distance calculation
 * const distance = (a: number, b: number) => absoluteValue(a - b)
 * distance(3, 7)  // 4
 *
 * // Array processing with composition
 * const numbers = [-5, 3, -2, 8, -1]
 * const absolutes = numbers.map(absoluteValue)  // [5, 3, 2, 8, 1]
 *
 * // Finding closest to zero
 * const closest = numbers.reduce((min, val) =>
 *   absoluteValue(val) < absoluteValue(min) ? val : min
 * )  // -1
 * ```
 * @pure
 * @idempotent
 */
const absoluteValue = (
	n: number | null | undefined,
): number => {
	if (n == null || typeof n !== "number") {
		return NaN
	}

	return Math.abs(n)
}

export default absoluteValue
