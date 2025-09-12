import isNullish from "../../validation/isNullish/index.ts"

/**
 * Leaky Rectified Linear Unit (Leaky ReLU) activation function
 *
 * A variant of ReLU that allows a small gradient when the input is negative,
 * preventing "dying ReLU" problem. Uses f(x) = x for x > 0 and f(x) = αx
 * for x ≤ 0, where α is the leak coefficient (typically 0.01).
 * Returns NaN for invalid inputs.
 *
 * @curried
 * @param alpha - Leak coefficient for negative values (typically 0.01)
 * @param x - Input value
 * @returns Activated value, or NaN if invalid
 * @example
 * ```typescript
 * // Basic usage
 * leakyRectifiedLinearUnit(0.01)(5)   // 5 (positive unchanged)
 * leakyRectifiedLinearUnit(0.01)(-5)  // -0.05 (negative × 0.01)
 * leakyRectifiedLinearUnit(0.01)(0)   // 0
 *
 * // Neural network layer activation
 * const neurons = [-2, -1, 0, 1, 2, 3]
 * const activated = neurons.map(leakyRectifiedLinearUnit(0.01))
 * // [-0.02, -0.01, 0, 1, 2, 3]
 *
 * // Partial application
 * const leakyRelu = leakyRectifiedLinearUnit(0.01)
 * leakyRelu(-100)  // -1
 *
 * // Edge cases
 * leakyRectifiedLinearUnit(null)(5)    // NaN
 * leakyRectifiedLinearUnit(0.01)(null) // NaN
 * ```
 * @pure
 * @curried
 * @safe
 */
const leakyRectifiedLinearUnit = (
	alpha: number | null | undefined,
) =>
(
	x: number | null | undefined,
): number => {
	if (isNullish(alpha) || typeof alpha !== "number") {
		return NaN
	}

	if (isNullish(x) || typeof x !== "number") {
		return NaN
	}

	// Leaky ReLU: f(x) = x if x > 0, else α × x
	return x > 0 ? x : alpha * x
}

export default leakyRectifiedLinearUnit
