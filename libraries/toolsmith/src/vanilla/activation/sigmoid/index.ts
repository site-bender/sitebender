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
