import isNullish from "../../validation/isNullish/index.ts"

/**
 * Calculates the hyperbolic sine of a number
 *
 * Computes sinh(x) = (e^x - e^(-x)) / 2, where e is Euler's number.
 * The hyperbolic sine function is the odd part of the exponential
 * function and appears in solutions to differential equations,
 * special relativity, and hanging chain problems (catenary curves).
 * Returns NaN for invalid inputs.
 *
 * @param x - The input value in radians
 * @returns Hyperbolic sine of x, or NaN if invalid
 * @pure
 * @safe
 * @example
 * ```typescript
 * // Basic values
 * hyperbolicSine(0)  // 0
 * hyperbolicSine(1)  // 1.175...
 * hyperbolicSine(-1) // -1.175... (odd function)
 * hyperbolicSine(2)  // 3.626...
 *
 * // Special values
 * hyperbolicSine(Infinity)  // Infinity
 * hyperbolicSine(-Infinity) // -Infinity
 *
 * // Edge cases
 * hyperbolicSine(NaN)  // NaN
 * hyperbolicSine(null) // NaN
 *
 * // Exponential form
 * const sinhExp = (x: number) =>
 *   (Math.exp(x) - Math.exp(-x)) / 2
 * ```
 */
const hyperbolicSine = (
	x: number | null | undefined,
): number => {
	if (isNullish(x) || typeof x !== "number") {
		return NaN
	}

	// Use built-in Math.sinh for accuracy and performance
	// Fallback to manual calculation if not available
	if (typeof Math.sinh === "function") {
		return Math.sinh(x)
	}

	// Manual calculation: sinh(x) = (e^x - e^(-x)) / 2
	// For large |x|, e^(-x) becomes negligible
	if (Math.abs(x) > 20) {
		const sign = x < 0 ? -1 : 1
		return sign * Math.exp(Math.abs(x)) / 2
	}

	return (Math.exp(x) - Math.exp(-x)) / 2
}

export default hyperbolicSine
