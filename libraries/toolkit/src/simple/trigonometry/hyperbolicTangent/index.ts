/**
 * Calculates the hyperbolic tangent of a number
 *
 * Computes tanh(x) = sinh(x) / cosh(x) = (e^x - e^(-x)) / (e^x + e^(-x)).
 * The hyperbolic tangent function maps all real numbers to the range (-1, 1)
 * and is commonly used as an activation function in neural networks.
 * Returns NaN for invalid inputs.
 *
 * @param x - The input value in radians
 * @returns Hyperbolic tangent of x, or NaN if invalid
 * @example
 * ```typescript
 * // Basic values
 * hyperbolicTangent(0)
 * // 0
 *
 * hyperbolicTangent(1)
 * // 0.7615... (tanh(1))
 *
 * hyperbolicTangent(-1)
 * // -0.7615... (odd function)
 *
 * hyperbolicTangent(2)
 * // 0.9640...
 *
 * // Small values (approximately x for small x)
 * hyperbolicTangent(0.1)
 * // 0.0996...
 *
 * hyperbolicTangent(0.01)
 * // 0.00999...
 *
 * // Large values (approaches ±1)
 * hyperbolicTangent(5)
 * // 0.9999...
 *
 * hyperbolicTangent(10)
 * // 0.99999999...
 *
 * hyperbolicTangent(-5)
 * // -0.9999...
 *
 * // Special values
 * hyperbolicTangent(Math.LN2)
 * // 0.6 (tanh(ln(2)) = 3/5)
 *
 * hyperbolicTangent(Infinity)
 * // 1
 *
 * hyperbolicTangent(-Infinity)
 * // -1
 *
 * // Invalid inputs
 * hyperbolicTangent(NaN)
 * // NaN
 *
 * hyperbolicTangent(null)
 * // NaN
 *
 * hyperbolicTangent("1")
 * // NaN
 *
 * // Practical examples
 *
 * // Neural network activation function
 * function tanhActivation(x: number): number {
 *   return hyperbolicTangent(x)
 * }
 * // Maps any input to range (-1, 1)
 *
 * // Logistic growth model
 * function logisticGrowth(t: number, k: number = 1): number {
 *   return (1 + hyperbolicTangent(k * t)) / 2
 * }
 * // Maps to range (0, 1)
 *
 * // Velocity in special relativity
 * function rapidityToVelocity(rapidity: number, c: number = 1): number {
 *   return c * hyperbolicTangent(rapidity)
 * }
 * // Velocity never exceeds c
 *
 * // Inverse relation: atanh(tanh(x)) = x
 * const x = 0.5
 * const y = hyperbolicTangent(x)
 * const inverse = Math.atanh(y)
 * // inverse ≈ 0.5
 *
 * // Sigmoid relation: tanh(x) = 2·sigmoid(2x) - 1
 * function tanhFromSigmoid(x: number): number {
 *   const sigmoid = 1 / (1 + Math.exp(-2 * x))
 *   return 2 * sigmoid - 1
 * }
 * // Equivalent to hyperbolicTangent
 *
 * // Series expansion for small x
 * function tanhSeries(x: number, terms: number = 4): number {
 *   // tanh(x) = x - x³/3 + 2x⁵/15 - 17x⁷/315 + ...
 *   const coeffs = [1, -1/3, 2/15, -17/315]
 *   let sum = 0
 *   for (let n = 0; n < terms && n < coeffs.length; n++) {
 *     sum += coeffs[n] * Math.pow(x, 2 * n + 1)
 *   }
 *   return sum
 * }
 *
 * // Addition formula: tanh(x+y) = (tanh(x) + tanh(y)) / (1 + tanh(x)tanh(y))
 * const a = 0.5, b = 0.7
 * const direct = hyperbolicTangent(a + b)
 * const formula = (hyperbolicTangent(a) + hyperbolicTangent(b)) /
 *                (1 + hyperbolicTangent(a) * hyperbolicTangent(b))
 * // direct ≈ formula
 *
 * // Gradient for backpropagation
 * function tanhDerivative(x: number): number {
 *   const t = hyperbolicTangent(x)
 *   return 1 - t * t
 * }
 * // d/dx tanh(x) = 1 - tanh²(x)
 * ```
 * @property Pure - Always returns same result for same input
 * @property Safe - Returns NaN for invalid inputs
 * @property Odd - tanh(-x) = -tanh(x)
 * @property Bounded - Range is (-1, 1)
 */
const hyperbolicTangent = (
	x: number | null | undefined,
): number => {
	if (x == null || typeof x !== "number") {
		return NaN
	}

	// Use built-in Math.tanh for accuracy and performance
	// Fallback to manual calculation if not available
	if (typeof Math.tanh === "function") {
		return Math.tanh(x)
	}

	// Manual calculation: tanh(x) = (e^x - e^(-x)) / (e^x + e^(-x))
	// For large |x|, approaches ±1
	if (x > 20) {
		return 1
	}
	if (x < -20) {
		return -1
	}

	const expX = Math.exp(x)
	const expNegX = Math.exp(-x)
	return (expX - expNegX) / (expX + expNegX)
}

export default hyperbolicTangent
