import type { Result } from "@sitebender/toolsmith/types/fp/result/index.ts"
import type { ValidationError } from "@sitebender/toolsmith/types/ValidationError/index.ts"
import type { ExactThreeDecimals } from "@sitebender/toolsmith/types/branded/index.ts"

import exactThreeDecimals from "@sitebender/toolsmith/newtypes/exactThreeDecimals/index.ts"
import unwrapExactThreeDecimals from "@sitebender/toolsmith/newtypes/exactThreeDecimals/unwrapExactThreeDecimals/index.ts"

//++ Subtracts two ExactThreeDecimals values using scaled integer arithmetic to avoid floating point errors
//++ Returns Result with error if the result cannot be represented as ExactThreeDecimals
export default function subtractExactThreeDecimals(
	minuend: ExactThreeDecimals,
): (subtrahend: ExactThreeDecimals) => Result<ValidationError, ExactThreeDecimals> {
	return function subtractFromMinuend(
		subtrahend: ExactThreeDecimals,
	): Result<ValidationError, ExactThreeDecimals> {
		const SCALE_FACTOR = 1000
		const minuendRaw = unwrapExactThreeDecimals(minuend)
		const subtrahendRaw = unwrapExactThreeDecimals(subtrahend)

		const minuendScaled = Math.round(minuendRaw * SCALE_FACTOR)
		const subtrahendScaled = Math.round(subtrahendRaw * SCALE_FACTOR)
		const resultScaled = minuendScaled - subtrahendScaled
		const resultRaw = resultScaled / SCALE_FACTOR

		return exactThreeDecimals(resultRaw)
	}
}
