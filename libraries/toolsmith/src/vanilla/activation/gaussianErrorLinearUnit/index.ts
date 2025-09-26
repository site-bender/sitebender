import not from "../../logic/not/index.ts"
import divide from "../../math/divide/index.ts"
import squareRoot from "../../math/squareRoot/index.ts"
import hyperbolicTangent from "../../trigonometry/hyperbolicTangent/index.ts"
import isNumber from "../../validation/isNumber/index.ts"

/*++
 | Gaussian Error Linear Unit (GELU) activation function
 |
 | Computes the GELU activation using the approximation:
 | GELU(x) ≈ 0.5 * x * (1 + tanh(√(2/π) * (x + 0.044715 * x³)))
 | This smooth activation function is widely used in transformer models
 | like BERT and GPT. It provides a smooth, differentiable alternative
 | to ReLU that allows small negative values to pass through based on
 | their magnitude, acting as a stochastic regularizer.
 */
export default function gaussianErrorLinearUnit(
	x: number | null | undefined,
): number {
	if (not(isNumber(x))) {
		return NaN
	}

	// Constants for the approximation
	const sqrt2OverPi = squareRoot(divide(2)(Math.PI)) // ≈ 0.7978845608
	const coefficient = 0.044715

	// Compute the inner expression: √(2/π) * (x + 0.044715 * x³)
	const xCubed = x * x * x
	const coefficientTimesXCubed = coefficient * xCubed
	const xPlusCoefficientXCubed = x + coefficientTimesXCubed
	const inner = sqrt2OverPi * xPlusCoefficientXCubed

	// Apply tanh
	const tanhValue = hyperbolicTangent(inner)

	// Compute GELU: 0.5 * x * (1 + tanh(...))
	return 0.5 * x * (1 + tanhValue)
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
