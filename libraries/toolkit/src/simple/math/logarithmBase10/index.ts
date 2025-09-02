import isNullish from "../../validation/isNullish/index.ts"

/**
 * Calculates the base-10 (common) logarithm of a number
 *
 * Computes log₁₀(x), the power to which 10 must be raised to get x.
 * Commonly used in scientific notation, pH calculations, decibels,
 * and order of magnitude comparisons. Input must be positive.
 * Returns NaN for non-positive or invalid inputs.
 *
 * @param x - Positive number
 * @returns Base-10 logarithm of x, or NaN if invalid
 * @example
 * ```typescript
 * // Powers of 10
 * logarithmBase10(100)
 * // 2
 *
 * logarithmBase10(1000)
 * // 3
 *
 * logarithmBase10(0.01)
 * // -2
 *
 * // Common values
 * logarithmBase10(2)
 * // 0.301...
 *
 * logarithmBase10(1000000)
 * // 6
 *
 * // Invalid inputs
 * logarithmBase10(0)
 * // NaN
 *
 * logarithmBase10(-10)
 * // NaN
 *
 * logarithmBase10(null)
 * // NaN
 *
 * // pH calculation
 * const pH = (concentration: number) => -logarithmBase10(concentration)
 * pH(1e-7)
 * // 7
 * ```
 * @pure Always returns same result for same input
 * @safe Returns NaN for invalid inputs
 */
const logarithmBase10 = (
	x: number | null | undefined,
): number => {
	if (isNullish(x) || typeof x !== "number") {
		return NaN
	}

	if (x <= 0) {
		return NaN
	}

	return Math.log10(x)
}

export default logarithmBase10
