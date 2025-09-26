import and from "../../logic/and/index.ts"
import isNumber from "../../validation/isNumber/index.ts"
import sigmoid from "../sigmoid/index.ts"

/*++
 | Swish activation function (self-gated)
 |
 | Computes f(x) = x × sigmoid(βx) where β is a trainable parameter
 | (typically 1). Swish is a smooth, non-monotonic function that has
 | shown superior performance in deep networks. When β = 1, it becomes
 | the SiLU (Sigmoid Linear Unit) function. Returns NaN for invalid inputs.
 */
export default function swish(
	beta: number | null | undefined,
): (x: number | null | undefined) => number {
	return function swishWithBeta(
		x: number | null | undefined,
	): number {
		if (and(isNumber(beta))(isNumber(x))) {
			// Swish: f(x) = x × sigmoid(βx)
			return x * sigmoid(beta * x)
		}

		return NaN
	}
}

//?? [EXAMPLE] `swish(1)(0)    // 0 (0 × sigmoid(0) = 0 × 0.5)`
//?? [EXAMPLE] `swish(1)(1)    // 0.731... (1 × sigmoid(1))`
//?? [EXAMPLE] `swish(1)(2)    // 1.761... (2 × sigmoid(2))`
//?? [EXAMPLE] `swish(1)(-1)   // -0.268... (-1 × sigmoid(-1))`
//?? [EXAMPLE] `swish(0.5)(2)  // 1.462... (smoother curve)`
//?? [EXAMPLE] `swish(2)(2)    // 1.964... (sharper curve)`
//?? [EXAMPLE] `swish(0)(4)    // 2 (β=0 gives f(x) = x/2)`
//?? [EXAMPLE] `swish(1)(10)   // 9.999... (approaches x for large x)`
//?? [EXAMPLE] `swish(1)(-10)  // -0.00045... (approaches 0)`
//?? [EXAMPLE] `swish(1)(NaN)  // NaN`
/*??
 | [EXAMPLE]
 | ```ts
 | // Neural network layer activation
 | const inputs = [-3, -2, -1, 0, 1, 2, 3]
 | const activated = inputs.map(swish(1))
 | // [-0.142, -0.238, -0.268, 0, 0.731, 1.761, 2.857]
 | ```
 |
 | [EXAMPLE]
 | ```ts
 | // Partial application for fixed beta
 | const swish1 = swish(1)    // Standard
 | const swish05 = swish(0.5)  // Smoother
 | const swish2 = swish(2)     // Sharper
 | ```
 */
