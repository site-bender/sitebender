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
