import type { Result } from "@sitebender/toolsmith/types/fp/result/index.ts"
import type { ValidationError } from "@sitebender/toolsmith/types/ValidationError/index.ts"
import type { ThreeDecimalPlaces } from "@sitebender/toolsmith/types/branded/index.ts"

import threeDecimalPlaces from "@sitebender/toolsmith/newtypes/threeDecimalPlaces/index.ts"
import unwrapThreeDecimalPlaces from "@sitebender/toolsmith/newtypes/threeDecimalPlaces/unwrapThreeDecimalPlaces/index.ts"

//++ Subtracts two ThreeDecimalPlaces values using scaled integer arithmetic to avoid floating point errors
//++ Returns Result with error if the result cannot be represented as ThreeDecimalPlaces
export default function subtractThreeDecimalPlaces(
	minuend: ThreeDecimalPlaces,
): (subtrahend: ThreeDecimalPlaces) => Result<ValidationError, ThreeDecimalPlaces> {
	return function subtractFromMinuend(
		subtrahend: ThreeDecimalPlaces,
	): Result<ValidationError, ThreeDecimalPlaces> {
		const SCALE_FACTOR = 1000
		const minuendRaw = unwrapThreeDecimalPlaces(minuend)
		const subtrahendRaw = unwrapThreeDecimalPlaces(subtrahend)

		const minuendScaled = Math.round(minuendRaw * SCALE_FACTOR)
		const subtrahendScaled = Math.round(subtrahendRaw * SCALE_FACTOR)
		const resultScaled = minuendScaled - subtrahendScaled
		const resultRaw = resultScaled / SCALE_FACTOR

		return threeDecimalPlaces(resultRaw)
	}
}
