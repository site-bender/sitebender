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
 * @example
 * ```typescript
 * // Basic values
 * hyperbolicCosine(0)
 * // 1 (minimum value)
 *
 * hyperbolicCosine(1)
 * // 1.5430... (cosh(1))
 *
 * hyperbolicCosine(-1)
 * // 1.5430... (even function)
 *
 * hyperbolicCosine(2)
 * // 3.7621...
 *
 * // Small values (approximately 1 + x²/2 for small x)
 * hyperbolicCosine(0.1)
 * // 1.0050...
 *
 * hyperbolicCosine(0.01)
 * // 1.00005...
 *
 * // Large values (approximately e^x/2)
 * hyperbolicCosine(5)
 * // 74.2099...
 *
 * hyperbolicCosine(10)
 * // 11013.2329...
 *
 * // Negative values (even function)
 * hyperbolicCosine(-2)
 * // 3.7621...
 *
 * hyperbolicCosine(-5)
 * // 74.2099...
 *
 * // Special values
 * hyperbolicCosine(Math.LN2)
 * // 1.25 (cosh(ln(2)) = 5/4)
 *
 * hyperbolicCosine(Infinity)
 * // Infinity
 *
 * hyperbolicCosine(-Infinity)
 * // Infinity
 *
 * // Invalid inputs
 * hyperbolicCosine(NaN)
 * // NaN
 *
 * hyperbolicCosine(null)
 * // NaN
 *
 * hyperbolicCosine("1")
 * // NaN
 *
 * // Practical examples
 *
 * // Catenary curve (shape of hanging chain)
 * function catenary(x: number, a: number = 1): number {
 *   return a * hyperbolicCosine(x / a)
 * }
 * catenary(1, 2) // Height of chain at x=1 with parameter a=2
 *
 * // Length of catenary arc
 * function catenaryArcLength(x: number, a: number = 1): number {
 *   return a * hyperbolicSine(x / a)
 * }
 *
 * // Time dilation in special relativity
 * function timeDilation(velocity: number, c: number = 1): number {
 *   const beta = velocity / c
 *   return 1 / Math.sqrt(1 - beta * beta)
 *   // Related to cosh through rapidity
 * }
 *
 * // Inverse relation: acosh(cosh(x)) = |x|
 * const x = 2
 * const y = hyperbolicCosine(x)
 * const inverse = Math.acosh(y)
 * // inverse ≈ 2
 *
 * // Exponential representation
 * function coshFromExp(x: number): number {
 *   return (Math.exp(x) + Math.exp(-x)) / 2
 * }
 * // Equivalent to hyperbolicCosine
 *
 * // Series expansion for small x
 * function coshSeries(x: number, terms: number = 5): number {
 *   let sum = 0
 *   for (let n = 0; n < terms; n++) {
 *     const term = Math.pow(x, 2 * n) / factorial(2 * n)
 *     sum += term
 *   }
 *   return sum
 * }
 * // cosh(x) = 1 + x²/2! + x⁴/4! + ...
 *
 * // Hyperbolic identity: cosh²(x) - sinh²(x) = 1
 * const angle = 1.5
 * const cosh = hyperbolicCosine(angle)
 * const sinh = hyperbolicSine(angle)
 * const identity = cosh * cosh - sinh * sinh
 * // identity ≈ 1
 *
 * // Addition formula: cosh(x+y) = cosh(x)cosh(y) + sinh(x)sinh(y)
 * const a = 1, b = 2
 * const direct = hyperbolicCosine(a + b)
 * const formula = hyperbolicCosine(a) * hyperbolicCosine(b) +
 *                hyperbolicSine(a) * hyperbolicSine(b)
 * // direct ≈ formula
 * ```
 * @property Pure - Always returns same result for same input
 * @property Safe - Returns NaN for invalid inputs
 * @property Even - cosh(-x) = cosh(x)
 * @property Bounded - Range is [1, ∞)
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
