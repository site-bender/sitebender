/**
 * Calculates the Rectified Linear Unit (ReLU) activation function
 *
 * Computes the ReLU function: f(x) = max(0, x), which returns x if x > 0,
 * otherwise returns 0. This is the most widely used activation function
 * in deep learning due to its simplicity and effectiveness in avoiding
 * vanishing gradients. Returns NaN for invalid inputs.
 *
 * @param x - Input value
 * @returns max(0, x), or NaN if invalid
 * @example
 * ```typescript
 * // Positive values pass through unchanged
 * rectifiedLinearUnit(5)
 * // 5
 *
 * rectifiedLinearUnit(0.5)
 * // 0.5
 *
 * rectifiedLinearUnit(100)
 * // 100
 *
 * // Zero returns zero
 * rectifiedLinearUnit(0)
 * // 0
 *
 * // Negative values become zero
 * rectifiedLinearUnit(-1)
 * // 0
 *
 * rectifiedLinearUnit(-0.5)
 * // 0
 *
 * rectifiedLinearUnit(-100)
 * // 0
 *
 * // Very small positive values
 * rectifiedLinearUnit(0.0001)
 * // 0.0001
 *
 * rectifiedLinearUnit(1e-10)
 * // 1e-10
 *
 * // Very small negative values
 * rectifiedLinearUnit(-0.0001)
 * // 0
 *
 * rectifiedLinearUnit(-1e-10)
 * // 0
 *
 * // Invalid inputs return NaN
 * rectifiedLinearUnit(null)
 * // NaN
 *
 * rectifiedLinearUnit("5")
 * // NaN
 *
 * rectifiedLinearUnit(undefined)
 * // NaN
 *
 * // Practical examples
 *
 * // Neural network activation
 * const neuronActivation = (weightedSum: number) =>
 *   rectifiedLinearUnit(weightedSum)
 * neuronActivation(2.5)   // 2.5 (positive activation)
 * neuronActivation(-0.8)  // 0 (no activation)
 *
 * // Feature detection
 * const featureStrength = (score: number) =>
 *   rectifiedLinearUnit(score - 0.5)  // Threshold at 0.5
 * featureStrength(0.8)  // 0.3 (above threshold)
 * featureStrength(0.3)  // 0 (below threshold)
 *
 * // Image processing (clamping negatives)
 * const processPixel = (value: number) =>
 *   rectifiedLinearUnit(value) / 255  // Normalize to [0, 1]
 * processPixel(128)   // 0.502
 * processPixel(-50)   // 0
 *
 * // Gradient computation (derivative)
 * const reluGradient = (x: number) =>
 *   x > 0 ? 1 : 0  // Derivative is 1 for x > 0, else 0
 * reluGradient(5)    // 1
 * reluGradient(-3)   // 0
 * reluGradient(0)    // 0 (technically undefined at 0)
 *
 * // Batch processing
 * const activations = [-2, -1, 0, 1, 2, 3].map(rectifiedLinearUnit)
 * // [0, 0, 0, 1, 2, 3]
 *
 * // Dead neuron detection
 * const isDead = (weights: number[]) =>
 *   weights.every(w => rectifiedLinearUnit(w) === 0)
 * isDead([-1, -2, -0.5])  // true (all negative)
 * isDead([-1, 0.1, -2])   // false (has positive weight)
 *
 * // Sparse activation pattern
 * const sparsity = (values: number[]) => {
 *   const activated = values.map(rectifiedLinearUnit)
 *   const nonZero = activated.filter(v => v > 0).length
 *   return nonZero / values.length
 * }
 * sparsity([-1, 2, -3, 4, -5])  // 0.4 (40% active)
 * ```
 * @property Pure - Always returns same result for same input
 * @property Safe - Returns NaN for invalid inputs
 * @property Non-linear - Introduces non-linearity for deep learning
 * @property Sparse - Produces sparse outputs (many zeros)
 * @property Unbounded - No upper limit on positive values
 */
const rectifiedLinearUnit = (
	x: number | null | undefined,
): number => {
	if (x == null || typeof x !== "number") {
		return NaN
	}

	return Math.max(0, x)
}

export default rectifiedLinearUnit
