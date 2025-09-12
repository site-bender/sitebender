import isNullish from "../../validation/isNullish/index.ts"

/**
 * Divides the first number by the second
 *
 * Performs division with curried application for functional composition.
 * Returns the quotient of dividend divided by divisor. Returns NaN for
 * invalid inputs or division by zero, enabling safe error propagation
 * in functional pipelines.
 *
 * @param dividend - Number to be divided (numerator)
 * @param divisor - Number to divide by (denominator)
 * @returns Quotient of dividend/divisor, or NaN if invalid
 * @example
 * ```typescript
 * // Basic division
 * divide(10)(2)
 * // 5
 *
 * divide(7)(2)
 * // 3.5
 *
 * // Division by zero returns NaN
 * divide(10)(0)
 * // NaN
 *
 * // Negative numbers
 * divide(-10)(2)
 * // -5
 *
 * divide(-10)(-2)
 * // 5
 *
 * // Special values
 * divide(Infinity)(2)
 * // Infinity
 *
 * // Partial application
 * const halfOf = (n: number) => divide(n)(2)
 * halfOf(10)
 * // 5
 *
 * const reciprocal = divide(1)
 * reciprocal(4)
 * // 0.25
 *
 * // Array operations
 * const numbers = [100, 50, 25, 10]
 * const halved = numbers.map(n => divide(n)(2))
 * // [50, 25, 12.5, 5]
 * ```
 * @pure Always returns same result for same inputs
 * @curried Enables partial application and composition
 * @safe Returns NaN for invalid inputs or division by zero
 */
const divide = (
	dividend: number | null | undefined,
) =>
(
	divisor: number | null | undefined,
): number => {
	if (isNullish(dividend) || typeof dividend !== "number") {
		return NaN
	}

	if (isNullish(divisor) || typeof divisor !== "number") {
		return NaN
	}

	// Division by zero returns NaN
	if (divisor === 0) {
		return NaN
	}

	return dividend / divisor
}

export default divide
