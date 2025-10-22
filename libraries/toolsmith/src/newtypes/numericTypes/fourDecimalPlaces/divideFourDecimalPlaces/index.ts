import type { Result } from "@sitebender/toolsmith/types/fp/result/index.ts"
import type { ValidationError } from "@sitebender/toolsmith/types/fp/validation/index.ts"
import type { FourDecimalPlaces } from "@sitebender/toolsmith/types/branded/index.ts"

import fourDecimalPlaces from "@sitebender/toolsmith/newtypes/numericTypes/fourDecimalPlaces/index.ts"
import unwrapFourDecimalPlaces from "@sitebender/toolsmith/newtypes/numericTypes/fourDecimalPlaces/unwrapFourDecimalPlaces/index.ts"

//++ Divides two FourDecimalPlaces values using scaled integer arithmetic to avoid floating point errors
//++ Returns Result with error if divisor is zero or result cannot be represented as FourDecimalPlaces
export default function divideFourDecimalPlaces(
	dividend: FourDecimalPlaces,
): (divisor: FourDecimalPlaces) => Result<ValidationError, FourDecimalPlaces> {
	return function divideWithDividend(
		divisor: FourDecimalPlaces,
	): Result<ValidationError, FourDecimalPlaces> {
		const SCALE_FACTOR = 10000
		const dividendRaw = unwrapFourDecimalPlaces(dividend)
		const divisorRaw = unwrapFourDecimalPlaces(divisor)

		const dividendScaled = Math.round(dividendRaw * SCALE_FACTOR)
		const divisorScaled = Math.round(divisorRaw * SCALE_FACTOR)
		const resultRaw = dividendScaled / divisorScaled

		return fourDecimalPlaces(resultRaw)
	}
}
