import isNullish from "../../validation/isNullish/index.ts"
import isNumber from "../../validation/isNumber/index.ts"
import max from "../../math/max/index.ts"

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
 * // Basic usage
 * rectifiedLinearUnit(5)    // 5 (positive unchanged)
 * rectifiedLinearUnit(-1)   // 0 (negative becomes zero)
 * rectifiedLinearUnit(0)    // 0
 *
 * // Neural network batch processing
 * const activations = [-2, -1, 0, 1, 2, 3].map(rectifiedLinearUnit)
 * // [0, 0, 0, 1, 2, 3]
 *
 * // Feature detection with threshold
 * const featureStrength = (score: number) =>
 *   rectifiedLinearUnit(score - 0.5)  // Threshold at 0.5
 *
 * // Edge cases
 * rectifiedLinearUnit(null)  // NaN
 * rectifiedLinearUnit(1e-10) // 1e-10 (small positive preserved)
 * ```
 * @pure
 * @safe
 */
export default function rectifiedLinearUnit(
	x: number | null | undefined,
): number {
	if (!isNumber(x)) {
		return NaN
	}

	return max(0)(x)
}
