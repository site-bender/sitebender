import type { Result } from "@sitebender/toolsmith/types/fp/result/index.ts"
import type { ValidationError } from "@sitebender/toolsmith/types/fp/validation/index.ts"
import type { EightDecimalPlaces } from "@sitebender/toolsmith/types/branded/index.ts"

import eightDecimalPlaces from "@sitebender/toolsmith/newtypes/eightDecimalPlaces/index.ts"
import unwrapEightDecimalPlaces from "@sitebender/toolsmith/newtypes/eightDecimalPlaces/unwrapEightDecimalPlaces/index.ts"

//++ Subtracts one EightDecimalPlaces number from another using scaled integer arithmetic for exact precision
//++ Returns Result with error if result cannot be represented with 8 decimal places
export default function subtractEightDecimalPlaces(
	minuend: EightDecimalPlaces,
): (
	subtrahend: EightDecimalPlaces,
) => Result<ValidationError, EightDecimalPlaces> {
	return function subtractFromMinuend(
		subtrahend: EightDecimalPlaces,
	): Result<ValidationError, EightDecimalPlaces> {
		const SCALE_FACTOR = 100000000
		const minuendRaw = unwrapEightDecimalPlaces(minuend)
		const subtrahendRaw = unwrapEightDecimalPlaces(subtrahend)

		const minuendScaled = Math.round(minuendRaw * SCALE_FACTOR)
		const subtrahendScaled = Math.round(subtrahendRaw * SCALE_FACTOR)
		const resultScaled = minuendScaled - subtrahendScaled
		const resultRaw = resultScaled / SCALE_FACTOR

		return eightDecimalPlaces(resultRaw)
	}
}
