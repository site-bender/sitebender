import isNullish from "../../validation/isNullish/index.ts"

/**
 * Calculates e raised to the power of x (e^x)
 *
 * Computes the exponential function with base e (Euler's number ≈ 2.71828).
 * This is the inverse of the natural logarithm. The exponential function
 * grows rapidly for positive values and approaches 0 for negative values.
 * Returns NaN for invalid inputs.
 *
 * @param exponent - The power to raise e to
 * @returns e^exponent, or NaN if invalid
 * @example
 * ```typescript
 * exponential(0)
 * // 1
 *
 * exponential(1)
 * // 2.71828...
 *
 * exponential(-1)
 * // 0.36787...
 *
 * exponential(0.5)
 * // 1.6487...
 *
 * exponential(Math.log(5))
 * // 5
 *
 * exponential(Infinity)
 * // Infinity
 *
 * exponential(-Infinity)
 * // 0
 *
 * exponential(null)
 * // NaN
 * ```
 * @pure - Always returns same result for same input
 * @safe - Returns NaN for invalid inputs
 */
const exponential = (
	exponent: number | null | undefined,
): number => {
	if (isNullish(exponent) || typeof exponent !== "number") {
		return NaN
	}

	return Math.exp(exponent)
}

export default exponential
