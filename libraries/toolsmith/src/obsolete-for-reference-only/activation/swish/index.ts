import isNumber from "../../validation/isNumber/index.ts"
import sigmoid from "../sigmoid/index.ts"

//++ Self-gated activation with configurable smoothness
export default function swish(
	beta: number | null | undefined,
): (x: number | null | undefined) => number {
	return function swishWithBeta(
		x: number | null | undefined,
	): number {
		if (isNumber(beta)) {
			if (isNumber(x)) {
				// Swish: f(x) = x × sigmoid(βx)
				return x * sigmoid(beta * x)
			}

			return NaN
		}

		return NaN
	}
}
