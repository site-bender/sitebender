import type { Result } from "@sitebender/toolsmith/types/fp/result/index.ts"
import type { ValidationError } from "@sitebender/toolsmith/types/ValidationError/index.ts"
import type { Percent } from "@sitebender/toolsmith/types/branded/index.ts"

import error from "@sitebender/toolsmith/monads/result/error/index.ts"
import percent from "@sitebender/toolsmith/newtypes/percent/index.ts"
import unwrapPercent from "@sitebender/toolsmith/newtypes/percent/unwrapPercent/index.ts"

//++ Divides one Percent value by another using scaled integer arithmetic for exact precision
//++ Returns Result with error if divisor is zero or result exceeds 1.0 (100%)
export default function dividePercent(
	dividend: Percent,
): (divisor: Percent) => Result<ValidationError, Percent> {
	return function divideByDivisor(
		divisor: Percent,
	): Result<ValidationError, Percent> {
		const divisorRaw = unwrapPercent(divisor)

		if (divisorRaw === 0) {
			return error({
				code: "PERCENT_DIVISION_BY_ZERO",
				field: "divisor",
				messages: ["The system cannot divide by zero."],
				received: divisorRaw,
				expected: "Non-zero Percent value",
				suggestion: "Provide a non-zero divisor for the division operation.",
				severity: "requirement",
			})
		}

		const SCALE_FACTOR = 10000
		const dividendRaw = unwrapPercent(dividend)

		const dividendScaled = Math.round(dividendRaw * SCALE_FACTOR)
		const divisorScaled = Math.round(divisorRaw * SCALE_FACTOR)
		const resultScaled = (dividendScaled * SCALE_FACTOR) / divisorScaled
		const resultRaw = resultScaled / SCALE_FACTOR

		return percent(resultRaw)
	}
}
