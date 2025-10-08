import type { Result } from "@sitebender/toolsmith/types/fp/result/index.ts"
import type { ValidationError } from "@sitebender/toolsmith/types/validation/index.ts"
import type { EightDecimalPlaces } from "@sitebender/toolsmith/types/branded/index.ts"

import error from "@sitebender/toolsmith/monads/result/error/index.ts"
import eightDecimalPlaces from "@sitebender/toolsmith/newtypes/eightDecimalPlaces/index.ts"
import unwrapEightDecimalPlaces from "@sitebender/toolsmith/newtypes/eightDecimalPlaces/unwrapEightDecimalPlaces/index.ts"

//++ Divides one EightDecimalPlaces number by another using scaled integer arithmetic for exact precision
//++ Returns Result with error if divisor is zero or result cannot be represented with 8 decimal places
export default function divideEightDecimalPlaces(
	dividend: EightDecimalPlaces,
): (divisor: EightDecimalPlaces) => Result<ValidationError, EightDecimalPlaces> {
	return function divideByDivisor(
		divisor: EightDecimalPlaces,
	): Result<ValidationError, EightDecimalPlaces> {
		const divisorRaw = unwrapEightDecimalPlaces(divisor)

		if (divisorRaw === 0) {
			return error({
				code: "EIGHT_DECIMAL_PLACES_DIVISION_BY_ZERO",
				field: "divisor",
				messages: ["The system cannot divide by zero."],
				received: divisorRaw,
				expected: "Non-zero EightDecimalPlaces value",
				suggestion: "Provide a non-zero divisor for the division operation.",
				severity: "requirement",
			})
		}

		const SCALE_FACTOR = 100000000
		const dividendRaw = unwrapEightDecimalPlaces(dividend)

		const dividendScaled = Math.round(dividendRaw * SCALE_FACTOR)
		const divisorScaled = Math.round(divisorRaw * SCALE_FACTOR)
		const resultScaled = (dividendScaled * SCALE_FACTOR) / divisorScaled
		const resultRaw = resultScaled / SCALE_FACTOR

		return eightDecimalPlaces(resultRaw)
	}
}
