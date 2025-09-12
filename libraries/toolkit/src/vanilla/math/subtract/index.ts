import isNullish from "../../validation/isNullish/index.ts"

/**
 * Subtracts the second number from the first
 *
 * Performs subtraction with curried application for functional
 * composition. Returns the difference between the minuend and
 * subtrahend. Returns NaN if either input is not a valid number,
 * enabling safe error propagation in functional pipelines.
 *
 * @curried (minuend) => (subtrahend) => difference
 * @param minuend - The number to subtract from
 * @param subtrahend - The number to subtract
 * @returns Difference of the two numbers, or NaN if invalid
 * @example
 * ```typescript
 * // Basic subtraction
 * subtract(5)(3)
 * // 2
 *
 * subtract(10)(7)
 * // 3
 *
 * // Negative results
 * subtract(3)(5)
 * // -2
 *
 * // Partial application
 * const fromHundred = subtract(100)
 * fromHundred(25)
 * // 75
 *
 * // Array operations
 * const numbers = [10, 20, 30, 40, 50]
 * numbers.map(subtract(5))
 * // [5, 15, 25, 35, 45]
 *
 * // Budget tracking
 * const budget = 5000
 * const spent = 3200
 * const remaining = subtract(budget)(spent)
 * // 1800
 * ```
 * @pure Always returns same result for same inputs
 * @curried Enables partial application and composition
 * @safe Returns NaN for invalid inputs
 */
const subtract = (
	minuend: number | null | undefined,
) =>
(
	subtrahend: number | null | undefined,
): number => {
	if (isNullish(minuend) || typeof minuend !== "number") {
		return NaN
	}

	if (isNullish(subtrahend) || typeof subtrahend !== "number") {
		return NaN
	}

	return minuend - subtrahend
}

export default subtract
