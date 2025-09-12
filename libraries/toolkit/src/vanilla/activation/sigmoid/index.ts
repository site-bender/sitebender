import isNullish from "../../validation/isNullish/index.ts"

/**
 * Calculates the sigmoid (logistic) activation function
 *
 * Computes the sigmoid function: σ(x) = 1 / (1 + e^(-x)), which maps
 * any real value to the range (0, 1). Commonly used in machine learning
 * for binary classification and neural network activation. The output
 * represents a probability-like value. Returns NaN for invalid inputs.
 *
 * @param x - Input value
 * @returns Sigmoid of x (between 0 and 1), or NaN if invalid
 * @example
 * ```typescript
 * // Basic usage
 * sigmoid(0)    // 0.5 (midpoint)
 * sigmoid(1)    // 0.731... (e/(1+e))
 * sigmoid(-1)   // 0.268... (1/(1+e))
 * sigmoid(10)   // 0.99995... (approaches 1)
 *
 * // Binary classification probability
 * const classifyProbability = (logit: number) => sigmoid(logit)
 * classifyProbability(2.5)   // 0.924 (92.4% probability)
 *
 * // Gradient for backpropagation
 * const sigmoidGradient = (x: number) => {
 *   const s = sigmoid(x)
 *   return s * (1 - s)  // Derivative: σ'(x) = σ(x)(1 - σ(x))
 * }
 *
 * // Edge cases
 * sigmoid(null)  // NaN
 * sigmoid(100)   // ~1 (very close to 1)
 * ```
 * @pure
 * @safe
 */
const sigmoid = (
	x: number | null | undefined,
): number => {
	if (isNullish(x) || typeof x !== "number") {
		return NaN
	}

	return 1 / (1 + Math.exp(-x))
}

export default sigmoid
