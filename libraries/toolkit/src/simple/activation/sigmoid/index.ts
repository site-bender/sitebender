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
 * // Common values
 * sigmoid(0)
 * // 0.5 (midpoint)
 * 
 * sigmoid(1)
 * // 0.731... (e/(1+e))
 * 
 * sigmoid(-1)
 * // 0.268... (1/(1+e))
 * 
 * sigmoid(2)
 * // 0.880...
 * 
 * sigmoid(-2)
 * // 0.119...
 * 
 * // Large positive values approach 1
 * sigmoid(10)
 * // 0.99995...
 * 
 * sigmoid(100)
 * // ~1 (very close to 1)
 * 
 * // Large negative values approach 0
 * sigmoid(-10)
 * // 0.0000453...
 * 
 * sigmoid(-100)
 * // ~0 (very close to 0)
 * 
 * // Symmetric property: σ(-x) = 1 - σ(x)
 * sigmoid(3)
 * // 0.952...
 * 
 * 1 - sigmoid(-3)
 * // 0.952... (same)
 * 
 * // Invalid inputs return NaN
 * sigmoid(null)
 * // NaN
 * 
 * sigmoid("5")
 * // NaN
 * 
 * sigmoid(undefined)
 * // NaN
 * 
 * // Practical examples
 * 
 * // Binary classification probability
 * const classifyProbability = (logit: number) =>
 *   sigmoid(logit)
 * classifyProbability(2.5)   // 0.924 (92.4% probability)
 * classifyProbability(-1.5)  // 0.182 (18.2% probability)
 * 
 * // Neural network activation
 * const neuronOutput = (weightedSum: number) =>
 *   sigmoid(weightedSum)
 * neuronOutput(0.8)   // 0.689
 * neuronOutput(-0.3)  // 0.425
 * 
 * // Logistic regression
 * const logisticPredict = (coefficients: number[], features: number[]) => {
 *   const logit = coefficients.reduce((sum, coef, i) => 
 *     sum + coef * features[i], 0)
 *   return sigmoid(logit)
 * }
 * logisticPredict([0.5, -0.3, 0.8], [1, 2, 1])  // Probability
 * 
 * // Smooth thresholding
 * const smoothThreshold = (value: number, center: number, steepness: number) =>
 *   sigmoid((value - center) * steepness)
 * smoothThreshold(5, 3, 2)   // 0.982 (value 5, threshold 3)
 * smoothThreshold(2, 3, 2)   // 0.119 (below threshold)
 * 
 * // Gradient for backpropagation
 * const sigmoidGradient = (x: number) => {
 *   const s = sigmoid(x)
 *   return s * (1 - s)  // Derivative: σ'(x) = σ(x)(1 - σ(x))
 * }
 * sigmoidGradient(0)   // 0.25 (maximum gradient)
 * sigmoidGradient(2)   // 0.104...
 * sigmoidGradient(-2)  // 0.104... (symmetric)
 * ```
 * @property Pure - Always returns same result for same input
 * @property Safe - Returns NaN for invalid inputs
 * @property Bounded - Output always between 0 and 1
 * @property Smooth - Continuously differentiable
 * @property Monotonic - Strictly increasing function
 */
const sigmoid = (
	x: number | null | undefined
): number => {
	if (x == null || typeof x !== 'number') {
		return NaN
	}
	
	return 1 / (1 + Math.exp(-x))
}

export default sigmoid