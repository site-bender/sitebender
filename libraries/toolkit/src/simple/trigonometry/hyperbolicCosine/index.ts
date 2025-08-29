/**
 * Calculates the hyperbolic cosine of a number
 *
 * Computes cosh(x) = (e^x + e^(-x)) / 2, where e is Euler's number.
 * The hyperbolic cosine function is the even part of the exponential
 * function and describes the shape of a hanging chain (catenary).
 * Always returns values ≥ 1. Returns NaN for invalid inputs.
 *
 * @param x - The input value in radians
 * @returns Hyperbolic cosine of x, or NaN if invalid
 * @pure
 * @safe
 * @example
 * ```typescript
 * // Basic values
 * hyperbolicCosine(0)  // 1 (minimum)
 * hyperbolicCosine(1)  // 1.543...
 * hyperbolicCosine(-1) // 1.543... (even function)
 * hyperbolicCosine(2)  // 3.762...
 *
 * // Special values
 * hyperbolicCosine(Infinity)  // Infinity
 * hyperbolicCosine(-Infinity) // Infinity
 *
 * // Edge cases
 * hyperbolicCosine(NaN)  // NaN
 * hyperbolicCosine(null) // NaN
 *
 * // Catenary curve (hanging chain)
 * const catenary = (x: number, a: number = 1) =>
 *   a * hyperbolicCosine(x / a)
 * ```
 */
const hyperbolicCosine = (
	x: number | null | undefined,
): number => {
	if (x == null || typeof x !== "number") {
		return NaN
	}

	// Use built-in Math.cosh for accuracy and performance
	// Fallback to manual calculation if not available
	if (typeof Math.cosh === "function") {
		return Math.cosh(x)
	}

	// Manual calculation: cosh(x) = (e^x + e^(-x)) / 2
	// For large |x|, e^(-x) becomes negligible
	if (Math.abs(x) > 20) {
		return Math.exp(Math.abs(x)) / 2
	}

	return (Math.exp(x) + Math.exp(-x)) / 2
}

export default hyperbolicCosine
