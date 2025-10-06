import type { Result } from "@sitebender/toolsmith/types/fp/result/index.ts"
import type { ValidationError } from "@sitebender/toolsmith/types/ValidationError/index.ts"
import type { ExactOneDecimal } from "@sitebender/toolsmith/types/branded/index.ts"

import exactOneDecimal from "@sitebender/toolsmith/newtypes/exactOneDecimal/index.ts"
import unwrapExactOneDecimal from "@sitebender/toolsmith/newtypes/exactOneDecimal/unwrapExactOneDecimal/index.ts"

//++ Subtracts two ExactOneDecimal values using scaled integer arithmetic to avoid floating point errors
//++ Returns Result with error if the result cannot be represented as ExactOneDecimal
export default function subtractExactOneDecimal(
	minuend: ExactOneDecimal,
): (subtrahend: ExactOneDecimal) => Result<ValidationError, ExactOneDecimal> {
	return function subtractFromMinuend(
		subtrahend: ExactOneDecimal,
	): Result<ValidationError, ExactOneDecimal> {
		const SCALE_FACTOR = 10
		const minuendRaw = unwrapExactOneDecimal(minuend)
		const subtrahendRaw = unwrapExactOneDecimal(subtrahend)

		const minuendScaled = Math.round(minuendRaw * SCALE_FACTOR)
		const subtrahendScaled = Math.round(subtrahendRaw * SCALE_FACTOR)
		const resultScaled = minuendScaled - subtrahendScaled
		const resultRaw = resultScaled / SCALE_FACTOR

		return exactOneDecimal(resultRaw)
	}
}
