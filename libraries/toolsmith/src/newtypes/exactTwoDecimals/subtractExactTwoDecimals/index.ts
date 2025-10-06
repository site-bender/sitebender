import type { Result } from "@sitebender/toolsmith/types/fp/result/index.ts"
import type { ValidationError } from "@sitebender/toolsmith/types/ValidationError/index.ts"
import type { ExactTwoDecimals } from "@sitebender/toolsmith/types/branded/index.ts"

import exactTwoDecimals from "@sitebender/toolsmith/newtypes/exactTwoDecimals/index.ts"
import unwrapExactTwoDecimals from "@sitebender/toolsmith/newtypes/exactTwoDecimals/unwrapExactTwoDecimals/index.ts"

//++ Subtracts two ExactTwoDecimals values using scaled integer arithmetic to avoid floating point errors
//++ Returns Result with error if the result cannot be represented as ExactTwoDecimals
export default function subtractExactTwoDecimals(
	minuend: ExactTwoDecimals,
): (subtrahend: ExactTwoDecimals) => Result<ValidationError, ExactTwoDecimals> {
	return function subtractFromMinuend(
		subtrahend: ExactTwoDecimals,
	): Result<ValidationError, ExactTwoDecimals> {
		const SCALE_FACTOR = 100
		const minuendRaw = unwrapExactTwoDecimals(minuend)
		const subtrahendRaw = unwrapExactTwoDecimals(subtrahend)

		const minuendScaled = Math.round(minuendRaw * SCALE_FACTOR)
		const subtrahendScaled = Math.round(subtrahendRaw * SCALE_FACTOR)
		const resultScaled = minuendScaled - subtrahendScaled
		const resultRaw = resultScaled / SCALE_FACTOR

		return exactTwoDecimals(resultRaw)
	}
}
