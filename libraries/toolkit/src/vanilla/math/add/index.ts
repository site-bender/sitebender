import isNullish from "../../validation/isNullish/index.ts"

/**
 * Adds two numbers together
 *
 * Performs addition of two numbers with curried application for
 * functional composition. Returns the sum of the augend and addend.
 * Returns NaN if either input is not a valid number, enabling safe
 * error propagation in functional pipelines.
 *
 * @param augend - First number (the number to be added to)
 * @param addend - Second number (the number being added)
 * @returns Sum of the two numbers, or NaN if invalid
 * @example
 * ```typescript
 * // Basic addition
 * add(2)(3)      // 5
 * add(-5)(3)     // -2
 * add(1.5)(2.3)  // 3.8
 *
 * // Partial application
 * const increment = add(1)
 * increment(5)   // 6
 *
 * const add10 = add(10)
 * add10(32)      // 42
 *
 * // Array operations
 * const numbers = [1, 2, 3, 4, 5]
 * numbers.map(add(10))  // [11, 12, 13, 14, 15]
 *
 * // Running total
 * const expenses = [10.50, 25.00, 8.75]
 * expenses.reduce((sum, expense) => add(sum)(expense), 0)  // 44.25
 *
 * // Edge cases
 * add(Infinity)(1)         // Infinity
 * add(-Infinity)(Infinity) // NaN
 * add(null)(5)             // NaN
 * ```
 * @pure
 * @curried
 * @safe
 * @commutative
 * @associative
 */
const add = (
	augend: number | null | undefined,
) =>
(
	addend: number | null | undefined,
): number => {
	if (isNullish(augend) || typeof augend !== "number") {
		return NaN
	}

	if (isNullish(addend) || typeof addend !== "number") {
		return NaN
	}

	return augend + addend
}

export default add
