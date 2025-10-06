import type { Result } from "@sitebender/toolsmith/types/fp/result/index.ts"
import type { ValidationError } from "@sitebender/toolsmith/types/ValidationError/index.ts"
import type { ExactTwoDecimals } from "@sitebender/toolsmith/types/branded/index.ts"

import exactTwoDecimals from "@sitebender/toolsmith/newtypes/exactTwoDecimals/index.ts"
import unwrapExactTwoDecimals from "@sitebender/toolsmith/newtypes/exactTwoDecimals/unwrapExactTwoDecimals/index.ts"

//++ Divides two ExactTwoDecimals values using scaled integer arithmetic to avoid floating point errors
//++ Returns Result with error if divisor is zero or result cannot be represented as ExactTwoDecimals
export default function divideExactTwoDecimals(
	dividend: ExactTwoDecimals,
): (divisor: ExactTwoDecimals) => Result<ValidationError, ExactTwoDecimals> {
	return function divideByDivisor(
		divisor: ExactTwoDecimals,
	): Result<ValidationError, ExactTwoDecimals> {
		const SCALE_FACTOR = 100
		const dividendRaw = unwrapExactTwoDecimals(dividend)
		const divisorRaw = unwrapExactTwoDecimals(divisor)

		const dividendScaled = Math.round(dividendRaw * SCALE_FACTOR)
		const divisorScaled = Math.round(divisorRaw * SCALE_FACTOR)
		const resultRaw = dividendScaled / divisorScaled

		return exactTwoDecimals(resultRaw)
	}
}
