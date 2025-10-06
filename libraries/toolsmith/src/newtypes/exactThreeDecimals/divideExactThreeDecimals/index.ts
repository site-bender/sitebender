import type { Result } from "@sitebender/toolsmith/types/fp/result/index.ts"
import type { ValidationError } from "@sitebender/toolsmith/types/ValidationError/index.ts"
import type { ExactThreeDecimals } from "@sitebender/toolsmith/types/branded/index.ts"

import exactThreeDecimals from "@sitebender/toolsmith/newtypes/exactThreeDecimals/index.ts"
import unwrapExactThreeDecimals from "@sitebender/toolsmith/newtypes/exactThreeDecimals/unwrapExactThreeDecimals/index.ts"

//++ Divides two ExactThreeDecimals values using scaled integer arithmetic to avoid floating point errors
//++ Returns Result with error if divisor is zero or result cannot be represented as ExactThreeDecimals
export default function divideExactThreeDecimals(
	dividend: ExactThreeDecimals,
): (divisor: ExactThreeDecimals) => Result<ValidationError, ExactThreeDecimals> {
	return function divideWithDividend(
		divisor: ExactThreeDecimals,
	): Result<ValidationError, ExactThreeDecimals> {
		const SCALE_FACTOR = 1000
		const dividendRaw = unwrapExactThreeDecimals(dividend)
		const divisorRaw = unwrapExactThreeDecimals(divisor)

		const dividendScaled = Math.round(dividendRaw * SCALE_FACTOR)
		const divisorScaled = Math.round(divisorRaw * SCALE_FACTOR)
		const resultRaw = dividendScaled / divisorScaled

		return exactThreeDecimals(resultRaw)
	}
}
