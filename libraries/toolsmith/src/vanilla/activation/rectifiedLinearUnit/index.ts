import max from "../../math/max/index.ts"
import isNumber from "../../validation/isNumber/index.ts"

//++ Rectified Linear Unit (ReLU) activation function
export default function rectifiedLinearUnit(
	x: number | null | undefined,
): number {
	if (isNumber(x)) {
		return max(0)(x)
	}

	return NaN
}

//?? [EXAMPLE] `rectifiedLinearUnit(5)     // 5 (positive unchanged)`
//?? [EXAMPLE] `rectifiedLinearUnit(-1)    // 0 (negative becomes zero)`
//?? [EXAMPLE] `rectifiedLinearUnit(0)     // 0`
//?? [EXAMPLE] `rectifiedLinearUnit(null)  // NaN`
//?? [EXAMPLE] `rectifiedLinearUnit(1e-10) // 1e-10 (small positive preserved)`
/*??
 | [EXAMPLE]
 | ```ts
 | // Neural network batch processing
 | const activations = [-2, -1, 0, 1, 2, 3].map(rectifiedLinearUnit)
 | // [0, 0, 0, 1, 2, 3]
 | ```
 |
 | [EXAMPLE]
 | ```ts
 | // Feature detection with threshold
 | const featureStrength = (score: number) =>
 |   rectifiedLinearUnit(score - 0.5)  // Threshold at 0.5
 | ```
 */
