import and from "../../logic/and/index.ts"
import isNumber from "../../validation/isNumber/index.ts"

/*++
 | Leaky Rectified Linear Unit (Leaky ReLU) activation function
 |
 | A variant of ReLU that allows a small gradient when the input is negative,
 | preventing "dying ReLU" problem. Uses f(x) = x for x > 0 and f(x) = αx
 | for x ≤ 0, where α is the leak coefficient (typically 0.01).
 | Returns NaN for invalid inputs.
 */
export default function leakyRectifiedLinearUnit(
	alpha: number | null | undefined,
): (x: number | null | undefined) => number {
	return function leakyRectifiedLinearUnitWithAlpha(
		x: number | null | undefined,
	): number {
		if (and(isNumber(alpha))(isNumber(x))) {
			// Leaky ReLU: f(x) = x if x > 0, else α × x
			return x > 0 ? x : alpha * x
		}

		return NaN
	}
}

//?? [EXAMPLE] `leakyRectifiedLinearUnit(0.01)(5)    // 5 (positive unchanged)`
//?? [EXAMPLE] `leakyRectifiedLinearUnit(0.01)(-5)   // -0.05 (negative × 0.01)`
//?? [EXAMPLE] `leakyRectifiedLinearUnit(0.01)(0)    // 0`
//?? [EXAMPLE] `leakyRectifiedLinearUnit(null)(5)    // NaN`
//?? [EXAMPLE] `leakyRectifiedLinearUnit(0.01)(null) // NaN`
/*??
 | [EXAMPLE]
 | ```ts
 | // Neural network layer activation
 | const neurons = [-2, -1, 0, 1, 2, 3]
 | const activated = neurons.map(leakyRectifiedLinearUnit(0.01))
 | // [-0.02, -0.01, 0, 1, 2, 3]
 | ```
 |
 | [EXAMPLE]
 | ```ts
 | // Partial applicationts
 | // Partial application
 | const leakyRelu = leakyRectifiedLinearUnit(0.01)
 | leakyRelu(-100)  // -1
 | ```
 */
