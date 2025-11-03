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
