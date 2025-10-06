import type { Result } from "@sitebender/toolsmith/types/fp/result/index.ts"
import type { ValidationError } from "@sitebender/toolsmith/types/ValidationError/index.ts"
import type { ExactFourDecimals } from "@sitebender/toolsmith/types/branded/index.ts"

import exactFourDecimals from "@sitebender/toolsmith/newtypes/exactFourDecimals/index.ts"
import unwrapExactFourDecimals from "@sitebender/toolsmith/newtypes/exactFourDecimals/unwrapExactFourDecimals/index.ts"

//++ Divides two ExactFourDecimals values using scaled integer arithmetic to avoid floating point errors
//++ Returns Result with error if divisor is zero or result cannot be represented as ExactFourDecimals
export default function divideExactFourDecimals(
	dividend: ExactFourDecimals,
): (divisor: ExactFourDecimals) => Result<ValidationError, ExactFourDecimals> {
	return function divideWithDividend(
		divisor: ExactFourDecimals,
	): Result<ValidationError, ExactFourDecimals> {
		const SCALE_FACTOR = 10000
		const dividendRaw = unwrapExactFourDecimals(dividend)
		const divisorRaw = unwrapExactFourDecimals(divisor)

		const dividendScaled = Math.round(dividendRaw * SCALE_FACTOR)
		const divisorScaled = Math.round(divisorRaw * SCALE_FACTOR)
		const resultRaw = dividendScaled / divisorScaled

		return exactFourDecimals(resultRaw)
	}
}
