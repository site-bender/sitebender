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
 * @example
 * ```typescript
 * // Basic values
 * hyperbolicSine(0)
 * // 0
 *
 * hyperbolicSine(1)
 * // 1.1752... (sinh(1))
 *
 * hyperbolicSine(-1)
 * // -1.1752... (odd function)
 *
 * hyperbolicSine(2)
 * // 3.6268...
 *
 * // Small values (approximately x for small x)
 * hyperbolicSine(0.1)
 * // 0.1001...
 *
 * hyperbolicSine(0.01)
 * // 0.01000...
 *
 * // Large values (approximately e^x/2)
 * hyperbolicSine(5)
 * // 74.2032...
 *
 * hyperbolicSine(10)
 * // 11013.2328...
 *
 * // Negative values (odd function)
 * hyperbolicSine(-2)
 * // -3.6268...
 *
 * hyperbolicSine(-5)
 * // -74.2032...
 *
 * // Special values
 * hyperbolicSine(Math.LN2)
 * // 0.75 (sinh(ln(2)) = 3/4)
 *
 * hyperbolicSine(Infinity)
 * // Infinity
 *
 * hyperbolicSine(-Infinity)
 * // -Infinity
 *
 * // Invalid inputs
 * hyperbolicSine(NaN)
 * // NaN
 *
 * hyperbolicSine(null)
 * // NaN
 *
 * hyperbolicSine("1")
 * // NaN
 *
 * // Practical examples
 *
 * // Catenary curve (hanging chain)
 * function catenary(x: number, a: number = 1): number {
 *   return a * hyperbolicCosine(x / a)
 * }
 *
 * // Velocity in special relativity
 * function rapidityToVelocity(rapidity: number, c: number = 1): number {
 *   return c * hyperbolicTangent(rapidity)
 * }
 *
 * // Area of hyperbolic sector
 * function hyperbolicSectorArea(angle: number): number {
 *   return angle / 2
 * }
 *
 * // Inverse relation: asinh(sinh(x)) = x
 * const x = 2
 * const y = hyperbolicSine(x)
 * const inverse = Math.asinh(y)
 * // inverse ≈ 2
 *
 * // Exponential representation
 * function sinhFromExp(x: number): number {
 *   return (Math.exp(x) - Math.exp(-x)) / 2
 * }
 * // Equivalent to hyperbolicSine
 *
 * // Series expansion for small x
 * function sinhSeries(x: number, terms: number = 5): number {
 *   let sum = 0
 *   for (let n = 0; n < terms; n++) {
 *     const term = Math.pow(x, 2 * n + 1) / factorial(2 * n + 1)
 *     sum += term
 *   }
 *   return sum
 * }
 * // sinh(x) = x + x³/3! + x⁵/5! + ...
 *
 * // Hyperbolic identity: cosh²(x) - sinh²(x) = 1
 * const angle = 1.5
 * const sinh = hyperbolicSine(angle)
 * const cosh = hyperbolicCosine(angle)
 * const identity = cosh * cosh - sinh * sinh
 * // identity ≈ 1
 * ```
 * @property Pure - Always returns same result for same input
 * @property Safe - Returns NaN for invalid inputs
 * @property Odd - sinh(-x) = -sinh(x)
 * @property Unbounded - Range is (-∞, ∞)
 */
const hyperbolicSine = (
	x: number | null | undefined,
): number => {
	if (x == null || typeof x !== "number") {
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
