import add from "../../math/add/index.ts"
import cube from "../../math/cube/index.ts"
import multiply from "../../math/multiply/index.ts"
import hyperbolicTangent from "../../trigonometry/hyperbolicTangent/index.ts"
import isNumber from "../../validation/isNumber/index.ts"
import { GELU_COEFFICIENT, GELU_SCALING_FACTOR } from "./constants/index.ts"

//++ Gaussian Error Linear Unit (GELU) activation function
export default function gaussianErrorLinearUnit(
	x: number | null | undefined,
): number {
	if (isNumber(x)) {
		// GELU(x) ≈ 0.5 * x * (1 + tanh(√(2/π) * (x + 0.044715 * x³)))
		return (multiply(0.5) as (n: number) => number)(
			(multiply(x) as (n: number) => number)(
				(add(1) as (n: number) => number)(
					hyperbolicTangent(
						(multiply(GELU_SCALING_FACTOR) as (n: number) => number)(
							(add(x) as (n: number) => number)(
								(multiply(GELU_COEFFICIENT) as (n: number) => number)(
									cube(x) as number
								)
							)
						)
					)
				)
			)
		)
	}

	return NaN
}

//?? [EXAMPLE] `gaussianErrorLinearUnit(1)     // 0.8411... (slightly less than input)`
//?? [EXAMPLE] `gaussianErrorLinearUnit(-1)    // -0.1588... (heavily suppressed)`
//?? [EXAMPLE] `gaussianErrorLinearUnit(0)     // 0 (exactly zero)`
//?? [EXAMPLE] `gaussianErrorLinearUnit(null)  // NaN`
//?? [EXAMPLE] `gaussianErrorLinearUnit(3)     // 2.9959... (almost exactly input)`
/*??
 | [EXAMPLE]
 | ```ts
 | // Neural network layer activation
 | const hidden = [1.5, -0.3, 0.8, -1.2, 2.1]
 | const activated = hidden.map(gaussianErrorLinearUnit)
 | // [1.3977, -0.1148, 0.6614, -0.1396, 2.0618]
 | ```
 */
