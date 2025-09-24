import isNullish from "../../validation/isNullish/index.ts"

/**
 * Raises a number to a power (exponentiation)
 *
 * Calculates base raised to the exponent power using JavaScript's
 * Math.pow function. Handles fractional and negative exponents.
 * Returns NaN for invalid inputs or mathematically undefined results.
 *
 * @curried (exponent) => (base) => result
 * @param exponent - The power to raise to
 * @param base - The number to be raised
 * @returns Base raised to the exponent power, or NaN if invalid
 * @example
 * ```typescript
 * power(2)(3)
 * // 9 (3^2)
 *
 * power(0)(5)
 * // 1 (any number^0)
 *
 * power(-1)(2)
 * // 0.5 (1/2)
 *
 * power(0.5)(4)
 * // 2 (square root)
 *
 * power(2)(-3)
 * // 9 (negative base)
 *
 * power(2)(Infinity)
 * // Infinity
 *
 * // Partial application
 * const square = power(2)
 * square(5)
 * // 25
 *
 * const sqrt = power(0.5)
 * sqrt(16)
 * // 4
 *
 * // Circle area from radius
 * const circleArea = (radius: number) => Math.PI * power(2)(radius)
 * circleArea(5)
 * // 78.539...
 * ```
 * @pure Always returns same result for same inputs
 * @curried Enables partial application and composition
 * @safe Returns NaN for invalid inputs
 * @mathematical Follows standard exponentiation rules
 */
const power = (
	exponent: number | null | undefined,
) =>
(
	base: number | null | undefined,
): number => {
	if (isNullish(exponent) || typeof exponent !== "number") {
		return NaN
	}

	if (isNullish(base) || typeof base !== "number") {
		return NaN
	}

	return Math.pow(base, exponent)
}

export default power
