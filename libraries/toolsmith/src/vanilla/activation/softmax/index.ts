import isNumber from "../../validation/isNumber/index.ts"
import _normalize from "./_normalize/index.ts"
import _shiftAndExp from "./_shiftAndExp/index.ts"
import isNotEmpty from "../../array/isNotEmpty/index.ts"
import hasLength from "../../array/hasLength/index.ts"
import all from "../../array/all/index.ts"
import max from "../../array/max/index.ts"
import map from "../../array/map/index.ts"
import sum from "../../math/sum/index.ts"

//++ Softmax activation for multi-class probability distribution
export default function softmax(
	numbers: Array<number> | null | undefined,
): Array<number> {
	if (isNotEmpty(numbers) && all(isNumber)(numbers as Array<number>)) {
		if (hasLength(1)(numbers)) {
			return [1]
		}

		const maximumValue = max(numbers) as number

		const exponentialValues = map(_shiftAndExp(maximumValue))(numbers)

		const sumOfExponentialValues = sum(exponentialValues)

		return map(_normalize(sumOfExponentialValues))(exponentialValues)
	}

	return []
}
