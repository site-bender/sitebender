import exponential from "../../math/exponential/index.ts"
import isArray from "../../validation/isArray/index.ts"
import isNotNullish from "../../validation/isNotNullish/index.ts"
import isNullish from "../../validation/isNullish/index.ts"
import isNumber from "../../validation/isNumber/index.ts"

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
 * // Basic usage
 * softmax([1, 2, 3])    // [0.0900..., 0.2447..., 0.6652...] (sums to 1)
 * softmax([0, 0, 0])    // [0.333..., 0.333..., 0.333...] (equal)
 * softmax([10, 0, 0])   // [0.9999..., 0.00002..., 0.00002...]
 *
 * // Neural network output layer
 * const logits = [2.1, 0.5, -1.2, 3.8]  // Raw scores
 * const probabilities = softmax(logits)
 * // [0.1849..., 0.0372..., 0.0068..., 0.7709...]
 *
 * // Multi-class classification
 * const classify = (scores: number[]) => {
 *   const probs = softmax(scores)
 *   const maxIndex = probs.indexOf(Math.max(...probs))
 *   return { class: maxIndex, confidence: probs[maxIndex] }
 * }
 *
 * // Edge cases
 * softmax([])     // []
 * softmax(null)   // []
 * softmax([5])    // [1] (single element)
 * ```
 * @pure
 * @safe
 */
export default function softmax(
	x: number[] | null | undefined,
): number[] {
	if (isNullish(x) || !isArray(x)) {
		return []
	}

	if (x.length === 0) {
		return []
	}

	// Check for non-numeric values
	if (
		!x.every(function isNumberCheck(val: number): boolean {
			return isNumber(val)
		})
	) {
		return []
	}

	// Single element case
	if (x.length === 1) {
		return [1]
	}

	// Numerical stability: subtract max to prevent overflow
	const maxValue = Math.max(...x)

	// Compute exp(x - max) for each element
	const expValues = x.map(function applyExponential(val: number): number {
		return exponential(val - maxValue)
	})

	// Sum of all exponentials
	const sumExp = expValues.reduce(
		function sumReducer(sum: number, val: number): number {
			return sum + val
		},
		0,
	)

	// Normalize to get probabilities
	return expValues.map(function normalizeValue(val: number): number {
		return val / sumExp
	})
}
