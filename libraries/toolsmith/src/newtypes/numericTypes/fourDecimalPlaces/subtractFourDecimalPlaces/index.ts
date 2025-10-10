import type { Result } from "@sitebender/toolsmith/types/fp/result/index.ts"
import type { ValidationError } from "@sitebender/toolsmith/types/validation/index.ts"
import type { FourDecimalPlaces } from "@sitebender/toolsmith/types/branded/index.ts"

import fourDecimalPlaces from "@sitebender/toolsmith/newtypes/numericTypes/fourDecimalPlaces/index.ts"
import unwrapFourDecimalPlaces from "@sitebender/toolsmith/newtypes/numericTypes/fourDecimalPlaces/unwrapFourDecimalPlaces/index.ts"

//++ Subtracts two FourDecimalPlaces values using scaled integer arithmetic to avoid floating point errors
//++ Returns Result with error if the result cannot be represented as FourDecimalPlaces
export default function subtractFourDecimalPlaces(
	minuend: FourDecimalPlaces,
): (
	subtrahend: FourDecimalPlaces,
) => Result<ValidationError, FourDecimalPlaces> {
	return function subtractFromMinuend(
		subtrahend: FourDecimalPlaces,
	): Result<ValidationError, FourDecimalPlaces> {
		const SCALE_FACTOR = 10000
		const minuendRaw = unwrapFourDecimalPlaces(minuend)
		const subtrahendRaw = unwrapFourDecimalPlaces(subtrahend)

		const minuendScaled = Math.round(minuendRaw * SCALE_FACTOR)
		const subtrahendScaled = Math.round(subtrahendRaw * SCALE_FACTOR)
		const resultScaled = minuendScaled - subtrahendScaled
		const resultRaw = resultScaled / SCALE_FACTOR

		return fourDecimalPlaces(resultRaw)
	}
}
