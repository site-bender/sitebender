import isNullish from "../../validation/isNullish/index.ts"
import isNumber from "../../validation/isNumber/index.ts"
import sigmoid from "../sigmoid/index.ts"

/**
 * Swish activation function (self-gated)
 *
 * Computes f(x) = x × sigmoid(βx) where β is a trainable parameter
 * (typically 1). Swish is a smooth, non-monotonic function that has
 * shown superior performance in deep networks. When β = 1, it becomes
 * the SiLU (Sigmoid Linear Unit) function. Returns NaN for invalid inputs.
 * @param beta - Scaling parameter for sigmoid (typically 1)
 * @param x - Input value
 * @returns Activated value, or NaN if invalid
 * @pure
 * @curried
 * @safe
 * @example
 * ```typescript
 * // Standard Swish (β = 1)
 * swish(1)(0)    // 0 (0 × sigmoid(0) = 0 × 0.5)
 * swish(1)(1)    // 0.731... (1 × sigmoid(1))
 * swish(1)(2)    // 1.761... (2 × sigmoid(2))
 * swish(1)(-1)   // -0.268... (-1 × sigmoid(-1))
 *
 * // Different beta values
 * swish(0.5)(2)  // 1.462... (smoother curve)
 * swish(2)(2)    // 1.964... (sharper curve)
 * swish(0)(4)    // 2 (β=0 gives f(x) = x/2)
 *
 * // Neural network layer activation
 * const inputs = [-3, -2, -1, 0, 1, 2, 3]
 * const activated = inputs.map(swish(1))
 * // [-0.142, -0.238, -0.268, 0, 0.731, 1.761, 2.857]
 *
 * // Partial application for fixed beta
 * const swish1 = swish(1)    // Standard
 * const swish05 = swish(0.5)  // Smoother
 * const swish2 = swish(2)     // Sharper
 *
 * // Edge cases
 * swish(1)(10)   // 9.999... (approaches x for large x)
 * swish(1)(-10)  // -0.00045... (approaches 0)
 * swish(1)(NaN)  // NaN
 * ```
 */
export default function swish(
	beta: number | null | undefined,
): (x: number | null | undefined) => number {
	return function swishWithBeta(
		x: number | null | undefined,
	): number {
		if (!isNumber(beta)) {
			return NaN
		}

		if (!isNumber(x)) {
			return NaN
		}

		// Swish: f(x) = x × sigmoid(βx)
		return x * sigmoid(beta * x)
	}
}
