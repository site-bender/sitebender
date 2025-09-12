import isNullish from "../../validation/isNullish/index.ts"

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
 * @pure
 * @safe
 * @example
 * ```typescript
 * // Basic values
 * hyperbolicTangent(0)  // 0
 * hyperbolicTangent(1)  // 0.761...
 * hyperbolicTangent(-1) // -0.761... (odd function)
 * hyperbolicTangent(2)  // 0.964...
 *
 * // Approaches ±1 for large values
 * hyperbolicTangent(5)         // 0.9999...
 * hyperbolicTangent(Infinity)  // 1
 * hyperbolicTangent(-Infinity) // -1
 *
 * // Edge cases
 * hyperbolicTangent(NaN)  // NaN
 * hyperbolicTangent(null) // NaN
 *
 * // Neural network activation
 * const tanhActivation = (x: number) =>
 *   hyperbolicTangent(x) // Maps to (-1, 1)
 * ```
 */
const hyperbolicTangent = (
	x: number | null | undefined,
): number => {
	if (isNullish(x) || typeof x !== "number") {
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
