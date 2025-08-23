/**
 * Calculates the softmax activation function for a vector
 * 
 * Transforms a vector of values into a probability distribution where all
 * outputs sum to 1. Each output represents the probability of that class.
 * Uses numerical stability trick by subtracting the maximum value before
 * exponentiation to prevent overflow. Returns empty array for invalid inputs.
 * 
 * @param x - Array of input values
 * @returns Probability distribution (sums to 1), or empty array if invalid
 * @example
 * ```typescript
 * // Basic softmax
 * softmax([1, 2, 3])
 * // [0.0900..., 0.2447..., 0.6652...]
 * // (sums to 1)
 * 
 * softmax([0, 0, 0])
 * // [0.333..., 0.333..., 0.333...]
 * // (equal probabilities)
 * 
 * softmax([1, 1, 1])
 * // [0.333..., 0.333..., 0.333...]
 * // (same relative values)
 * 
 * // Large differences
 * softmax([10, 0, 0])
 * // [0.9999..., 0.00002..., 0.00002...]
 * // (heavily favors first class)
 * 
 * softmax([-10, 0, 0])
 * // [0.00002..., 0.4999..., 0.4999...]
 * // (suppresses first class)
 * 
 * // Two classes (binary)
 * softmax([2, 1])
 * // [0.731..., 0.268...]
 * // (73% vs 27% probability)
 * 
 * softmax([5, 5])
 * // [0.5, 0.5]
 * // (equal probability)
 * 
 * // Multiple classes
 * softmax([1, 2, 3, 4, 5])
 * // [0.0116..., 0.0316..., 0.0861..., 0.2341..., 0.6364...]
 * 
 * // Negative values
 * softmax([-1, -2, -3])
 * // [0.6652..., 0.2447..., 0.0900...]
 * 
 * // Mixed positive and negative
 * softmax([-2, 0, 2])
 * // [0.0179..., 0.1319..., 0.8501...]
 * 
 * // Single element (always 1)
 * softmax([5])
 * // [1]
 * 
 * softmax([-10])
 * // [1]
 * 
 * // Empty array
 * softmax([])
 * // []
 * 
 * // Invalid inputs
 * softmax(null)
 * // []
 * 
 * softmax([1, "2", 3])
 * // []
 * 
 * // Practical examples
 * 
 * // Neural network output layer
 * const logits = [2.1, 0.5, -1.2, 3.8]  // Raw scores
 * const probabilities = softmax(logits)
 * // [0.1849..., 0.0372..., 0.0068..., 0.7709...]
 * // Class 3 has 77% probability
 * 
 * // Multi-class classification
 * const classify = (scores: number[]) => {
 *   const probs = softmax(scores)
 *   const maxIndex = probs.indexOf(Math.max(...probs))
 *   return { class: maxIndex, confidence: probs[maxIndex] }
 * }
 * classify([1, 5, 2])  // { class: 1, confidence: 0.936... }
 * 
 * // Temperature scaling
 * const softmaxWithTemp = (x: number[], temp: number) => {
 *   const scaled = x.map(v => v / temp)
 *   return softmax(scaled)
 * }
 * softmaxWithTemp([1, 2, 3], 0.5)  // More peaked distribution
 * softmaxWithTemp([1, 2, 3], 2.0)  // Smoother distribution
 * 
 * // Attention weights
 * const attentionScores = [0.9, 0.1, 0.3, 0.7]
 * const attentionWeights = softmax(attentionScores)
 * // [0.3775..., 0.1703..., 0.2061..., 0.2459...]
 * 
 * // Policy distribution (reinforcement learning)
 * const actionValues = [10, 12, 8, 11]
 * const policy = softmax(actionValues)
 * // [0.1193..., 0.3244..., 0.1606..., 0.3955...]
 * // Action 1 most likely (32%)
 * 
 * // Ensemble model voting
 * const modelOutputs = [
 *   [0.8, 0.1, 0.1],  // Model 1
 *   [0.7, 0.2, 0.1],  // Model 2
 *   [0.9, 0.05, 0.05] // Model 3
 * ]
 * const averaged = [0, 1, 2].map(i =>
 *   modelOutputs.reduce((sum, m) => sum + m[i], 0) / 3
 * )
 * const ensemble = softmax(averaged)
 * // Final ensemble probabilities
 * 
 * // Check sum to 1
 * const probs = softmax([1, 2, 3, 4])
 * const sum = probs.reduce((a, b) => a + b, 0)
 * // 1.0 (within floating point precision)
 * ```
 * @property Pure - Always returns same result for same input
 * @property Safe - Returns empty array for invalid inputs
 * @property Normalized - Output sums to 1
 * @property Stable - Uses max-subtraction for numerical stability
 * @property Differentiable - Smooth gradient for backpropagation
 */
const softmax = (
	x: number[] | null | undefined
): number[] => {
	if (x == null || !Array.isArray(x)) {
		return []
	}
	
	if (x.length === 0) {
		return []
	}
	
	// Check for non-numeric values
	for (const val of x) {
		if (val == null || typeof val !== 'number') {
			return []
		}
	}
	
	// Single element case
	if (x.length === 1) {
		return [1]
	}
	
	// Numerical stability: subtract max to prevent overflow
	const max = Math.max(...x)
	
	// Compute exp(x - max) for each element
	const expValues = x.map(val => Math.exp(val - max))
	
	// Sum of all exponentials
	const sumExp = expValues.reduce((sum, val) => sum + val, 0)
	
	// Normalize to get probabilities
	return expValues.map(val => val / sumExp)
}

export default softmax