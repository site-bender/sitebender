import isNullish from "../../validation/isNullish/index.ts"

/**
 * Finds the maximum of two values
 *
 * Returns the larger of two numbers. If either value is NaN, returns NaN.
 * Handles special values like Infinity correctly. Uses curried application
 * for functional composition. Returns NaN for non-numeric inputs to support
 * safe error handling in functional pipelines.
 *
 * @param a - First value to compare
 * @param b - Second value to compare
 * @returns The larger value, or NaN if invalid
 * @example
 * ```typescript
 * // Basic comparisons
 * max(5)(3)
 * // 5
 *
 * max(-5)(-3)
 * // -3
 *
 * max(-10)(10)
 * // 10
 *
 * // Decimal numbers
 * max(3.14)(2.71)
 * // 3.14
 *
 * // Special values
 * max(Infinity)(100)
 * // Infinity
 *
 * max(NaN)(5)
 * // NaN
 *
 * // Invalid inputs
 * max(null)(5)
 * // NaN
 *
 * // Partial application
 * const atLeast0 = max(0)
 * atLeast0(-5)
 * // 0
 *
 * // Array reduction
 * const numbers = [1, 5, 3, 9, 2]
 * const maxValue = numbers.reduce((acc, n) => max(acc)(n))
 * // 9
 * ```
 * @pure Always returns same result for same inputs
 * @curried Enables partial application and composition
 * @safe Returns NaN for invalid inputs
 */
const max = (
	a: number | null | undefined,
) =>
(
	b: number | null | undefined,
): number => {
	if (isNullish(a) || typeof a !== "number") {
		return NaN
	}

	if (isNullish(b) || typeof b !== "number") {
		return NaN
	}

	// Math.max handles NaN, Infinity, and -0 vs 0 correctly
	return Math.max(a, b)
}

export default max
