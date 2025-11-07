import type { Result } from "@sitebender/toolsmith/types/fp/result/index.ts"
import type { ValidationError } from "@sitebender/toolsmith/types/fp/validation/index.ts"
import type { Percent } from "@sitebender/toolsmith/types/branded/index.ts"

import percent from "@sitebender/toolsmith/newtypes/numericTypes/percent/index.ts"
import unwrapPercent from "@sitebender/toolsmith/newtypes/numericTypes/percent/unwrapPercent/index.ts"

//++ Subtracts one Percent value from another using scaled integer arithmetic for exact precision
//++ Returns Result with error if difference is negative (below 0%)
export default function subtractPercent(
	minuend: Percent,
): (subtrahend: Percent) => Result<ValidationError, Percent> {
	return function subtractFromMinuend(
		subtrahend: Percent,
	): Result<ValidationError, Percent> {
		const SCALE_FACTOR = 10000
		const minuendRaw = unwrapPercent(minuend)
		const subtrahendRaw = unwrapPercent(subtrahend)

		//++ [EXCEPTION] Math.round, *, -, / permitted in Toolsmith for performance - provides scaled integer arithmetic
		const minuendScaled = Math.round(minuendRaw * SCALE_FACTOR)
		const subtrahendScaled = Math.round(subtrahendRaw * SCALE_FACTOR)
		const resultScaled = minuendScaled - subtrahendScaled
		const resultRaw = resultScaled / SCALE_FACTOR

		return percent(resultRaw)
	}
}
