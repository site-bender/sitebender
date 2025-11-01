import type { Result } from "@sitebender/toolsmith/types/fp/result/index.ts"
import type { ValidationError } from "@sitebender/toolsmith/types/fp/validation/index.ts"
import type { TwoDecimalPlaces } from "@sitebender/toolsmith/types/branded/index.ts"

import twoDecimalPlaces from "@sitebender/toolsmith/newtypes/numericTypes/twoDecimalPlaces/index.ts"
import unwrapTwoDecimalPlaces from "@sitebender/toolsmith/newtypes/numericTypes/twoDecimalPlaces/unwrapTwoDecimalPlaces/index.ts"

//++ Subtracts two TwoDecimalPlaces values using scaled integer arithmetic to avoid floating point errors
//++ Returns Result with error if the result cannot be represented as TwoDecimalPlaces
export default function subtractTwoDecimalPlaces(
	minuend: TwoDecimalPlaces,
): (subtrahend: TwoDecimalPlaces) => Result<ValidationError, TwoDecimalPlaces> {
	return function subtractFromMinuend(
		subtrahend: TwoDecimalPlaces,
	): Result<ValidationError, TwoDecimalPlaces> {
		const SCALE_FACTOR = 100
		const minuendRaw = unwrapTwoDecimalPlaces(minuend)
		const subtrahendRaw = unwrapTwoDecimalPlaces(subtrahend)

		//++ [EXCEPTION] Math.round, *, -, / permitted in Toolsmith for performance - provides scaled integer arithmetic
		const minuendScaled = Math.round(minuendRaw * SCALE_FACTOR)
		const subtrahendScaled = Math.round(subtrahendRaw * SCALE_FACTOR)
		const resultScaled = minuendScaled - subtrahendScaled
		const resultRaw = resultScaled / SCALE_FACTOR

		return twoDecimalPlaces(resultRaw)
	}
}
