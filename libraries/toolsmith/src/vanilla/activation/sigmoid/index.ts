import exponential from "../../math/exponential/index.ts"
import isNumber from "../../validation/isNumber/index.ts"

//++ Sigmoid (logistic) activation function
export default function sigmoid(
	x: number | null | undefined,
): number {
	if (isNumber(x)) {
		return 1 / (1 + exponential(-x))
	}

	return NaN
}

//?? [EXAMPLE] `sigmoid(0)    // 0.5 (midpoint)`
//?? [EXAMPLE] `sigmoid(1)    // 0.731... (e/(1+e))`
//?? [EXAMPLE] `sigmoid(-1)   // 0.268... (1/(1+e))`
//?? [EXAMPLE] `sigmoid(10)   // 0.99995... (approaches 1)`
//?? [EXAMPLE] `sigmoid(null)  // NaN`
//?? [EXAMPLE] `sigmoid(100)   // ~1 (very close to 1)`
/*??
 | [EXAMPLE]
 | ```ts
 | // Binary classification probability
 | const classifyProbability = (logit: number) => sigmoid(logit)
 | classifyProbability(2.5)   // 0.924 (92.4% probability)
 | ```
 |
 | [EXAMPLE]
 | ```ts
 | // Gradient for backpropagation
 | const sigmoidGradient = (x: number) => {
 |   const s = sigmoid(x)
 |   return s * (1 - s)  // Derivative: σ'(x) = σ(x)(1 - σ(x))
 | }
 | ```
 */
