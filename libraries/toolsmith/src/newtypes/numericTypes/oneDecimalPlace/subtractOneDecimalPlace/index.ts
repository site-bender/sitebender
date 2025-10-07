import type { Result } from "@sitebender/toolsmith/types/fp/result/index.ts"
import type { ValidationError } from "@sitebender/toolsmith/types/ValidationError/index.ts"
import type { OneDecimalPlace } from "@sitebender/toolsmith/types/branded/index.ts"

import oneDecimalPlace from "@sitebender/toolsmith/newtypes/oneDecimalPlace/index.ts"
import unwrapOneDecimalPlace from "@sitebender/toolsmith/newtypes/oneDecimalPlace/unwrapOneDecimalPlace/index.ts"

//++ Subtracts two OneDecimalPlace values using scaled integer arithmetic to avoid floating point errors
//++ Returns Result with error if the result cannot be represented as OneDecimalPlace
export default function subtractOneDecimalPlace(
	minuend: OneDecimalPlace,
): (subtrahend: OneDecimalPlace) => Result<ValidationError, OneDecimalPlace> {
	return function subtractFromMinuend(
		subtrahend: OneDecimalPlace,
	): Result<ValidationError, OneDecimalPlace> {
		const SCALE_FACTOR = 10
		const minuendRaw = unwrapOneDecimalPlace(minuend)
		const subtrahendRaw = unwrapOneDecimalPlace(subtrahend)

		const minuendScaled = Math.round(minuendRaw * SCALE_FACTOR)
		const subtrahendScaled = Math.round(subtrahendRaw * SCALE_FACTOR)
		const resultScaled = minuendScaled - subtrahendScaled
		const resultRaw = resultScaled / SCALE_FACTOR

		return oneDecimalPlace(resultRaw)
	}
}
