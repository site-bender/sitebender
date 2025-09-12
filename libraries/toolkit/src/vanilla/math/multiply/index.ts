import isNullish from "../../validation/isNullish/index.ts"

/**
 * Multiplies two numbers together
 *
 * Performs multiplication of two numbers with curried application for
 * functional composition. Returns the product of the multiplicand and
 * multiplier. Returns NaN if either input is not a valid number,
 * enabling safe error propagation in functional pipelines.
 *
 * @curried (multiplicand) => (multiplier) => product
 * @param multiplicand - First number (the number to be multiplied)
 * @param multiplier - Second number (the number to multiply by)
 * @returns Product of the two numbers, or NaN if invalid
 * @example
 * ```typescript
 * multiply(2)(3)
 * // 6
 *
 * multiply(-5)(3)
 * // -15
 *
 * multiply(0.5)(0.5)
 * // 0.25
 *
 * multiply(0)(5)
 * // 0 (annihilator)
 *
 * multiply(1)(5)
 * // 5 (identity)
 *
 * multiply(Infinity)(2)
 * // Infinity
 *
 * // Partial application
 * const double = multiply(2)
 * double(5)
 * // 10
 *
 * // Array operations
 * const numbers = [1, 2, 3]
 * numbers.map(multiply(10))
 * // [10, 20, 30]
 * ```
 * @pure Always returns same result for same inputs
 * @curried Enables partial application and composition
 * @safe Returns NaN for invalid inputs
 * @commutative multiply(a)(b) === multiply(b)(a)
 * @associative multiply(multiply(a)(b))(c) === multiply(a)(multiply(b)(c))
 * @identity multiply(n)(1) === n
 * @annihilator multiply(n)(0) === 0
 */
const multiply = (
	multiplicand: number | null | undefined,
) =>
(
	multiplier: number | null | undefined,
): number => {
	if (isNullish(multiplicand) || typeof multiplicand !== "number") {
		return NaN
	}

	if (isNullish(multiplier) || typeof multiplier !== "number") {
		return NaN
	}

	return multiplicand * multiplier
}

export default multiply
