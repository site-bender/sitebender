import gt from "../../validation/gt/index.ts"
import isNumber from "../../validation/isNumber/index.ts"

//++ Leaky ReLU activation with configurable negative slope
export default function leakyRectifiedLinearUnit(
	alpha: number | null | undefined,
): (x: number | null | undefined) => number {
	return function leakyRectifiedLinearUnitWithAlpha(
		x: number | null | undefined,
	): number {
		if (isNumber(alpha) && isNumber(x)) {
			return gt(0)(x) ? x : alpha * x
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
 | // Partial application
 | const leakyRelu = leakyRectifiedLinearUnit(0.01)
 | leakyRelu(-100)  // -1
 | ```
 */
