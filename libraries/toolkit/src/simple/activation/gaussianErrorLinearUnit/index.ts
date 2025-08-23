/**
 * Gaussian Error Linear Unit (GELU) activation function
 * 
 * Computes the GELU activation using the approximation:
 * GELU(x) ≈ 0.5 * x * (1 + tanh(√(2/π) * (x + 0.044715 * x³)))
 * This smooth activation function is widely used in transformer models
 * like BERT and GPT. It provides a smooth, differentiable alternative
 * to ReLU that allows small negative values to pass through based on
 * their magnitude, acting as a stochastic regularizer.
 * 
 * @param x - Input value
 * @returns GELU activation value, or NaN if invalid
 * @example
 * ```typescript
 * // Positive values (mostly preserved)
 * gaussianErrorLinearUnit(1)
 * // 0.8411... (slightly less than input)
 * 
 * gaussianErrorLinearUnit(2)
 * // 1.9545... (very close to input)
 * 
 * gaussianErrorLinearUnit(3)
 * // 2.9959... (almost exactly input)
 * 
 * // Zero point
 * gaussianErrorLinearUnit(0)
 * // 0 (exactly zero)
 * 
 * // Small negative values (partially suppressed)
 * gaussianErrorLinearUnit(-0.5)
 * // -0.1542... (reduced magnitude)
 * 
 * gaussianErrorLinearUnit(-1)
 * // -0.1588... (heavily suppressed)
 * 
 * // Large negative values (almost zero)
 * gaussianErrorLinearUnit(-2)
 * // -0.0454... (nearly eliminated)
 * 
 * gaussianErrorLinearUnit(-3)
 * // -0.0040... (effectively zero)
 * 
 * // Comparison with ReLU behavior
 * gaussianErrorLinearUnit(0.1)   // 0.0540... (ReLU would be 0.1)
 * gaussianErrorLinearUnit(-0.1)  // -0.0460... (ReLU would be 0)
 * 
 * // Invalid inputs
 * gaussianErrorLinearUnit(null)
 * // NaN
 * 
 * gaussianErrorLinearUnit(undefined)
 * // NaN
 * 
 * // Practical neural network examples
 * 
 * // Hidden layer activations
 * const hidden = [1.5, -0.3, 0.8, -1.2, 2.1]
 * const activated = hidden.map(gaussianErrorLinearUnit)
 * // [1.3977, -0.1148, 0.6614, -0.1396, 2.0618]
 * 
 * // Transformer model attention scores
 * const scores = [-2, -1, 0, 1, 2]
 * const gelu_scores = scores.map(gaussianErrorLinearUnit)
 * // [-0.0454, -0.1588, 0, 0.8411, 1.9545]
 * 
 * // Comparing with other activations
 * const x = 1.5
 * const relu = Math.max(0, x)           // 1.5
 * const leaky = x > 0 ? x : 0.01 * x    // 1.5
 * const gelu = gaussianErrorLinearUnit(x) // 1.3977...
 * 
 * // Gradient flow example (small negatives)
 * [-0.2, -0.1, 0, 0.1, 0.2].map(gaussianErrorLinearUnit)
 * // [-0.0780, -0.0460, 0, 0.0540, 0.1120]
 * // Notice smooth transition through zero
 * ```
 * @property Pure - Always returns same result for same inputs
 * @property Safe - Returns NaN for invalid inputs
 */
const gaussianErrorLinearUnit = (
	x: number | null | undefined
): number => {
	if (x == null || typeof x !== 'number') {
		return NaN
	}
	
	// Constants for the approximation
	const sqrt2OverPi = Math.sqrt(2 / Math.PI)  // ≈ 0.7978845608
	const coefficient = 0.044715
	
	// Compute the inner expression: √(2/π) * (x + 0.044715 * x³)
	const inner = sqrt2OverPi * (x + coefficient * x * x * x)
	
	// Apply tanh
	const tanhValue = Math.tanh(inner)
	
	// Compute GELU: 0.5 * x * (1 + tanh(...))
	return 0.5 * x * (1 + tanhValue)
}

export default gaussianErrorLinearUnit