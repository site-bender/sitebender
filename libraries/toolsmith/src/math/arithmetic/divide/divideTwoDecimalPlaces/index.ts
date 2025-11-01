import type { Result } from "@sitebender/toolsmith/types/fp/result/index.ts"
import type { ValidationError } from "@sitebender/toolsmith/types/fp/validation/index.ts"
import type { TwoDecimalPlaces } from "@sitebender/toolsmith/types/branded/index.ts"

import twoDecimalPlaces from "@sitebender/toolsmith/newtypes/numericTypes/twoDecimalPlaces/index.ts"
import unwrapTwoDecimalPlaces from "@sitebender/toolsmith/newtypes/numericTypes/twoDecimalPlaces/unwrapTwoDecimalPlaces/index.ts"

//++ Divides two TwoDecimalPlaces values using scaled integer arithmetic to avoid floating point errors
//++ Returns Result with error if divisor is zero or result cannot be represented as TwoDecimalPlaces
export default function divideTwoDecimalPlaces(
	dividend: TwoDecimalPlaces,
): (divisor: TwoDecimalPlaces) => Result<ValidationError, TwoDecimalPlaces> {
	return function divideWithDividend(
		divisor: TwoDecimalPlaces,
	): Result<ValidationError, TwoDecimalPlaces> {
		const SCALE_FACTOR = 100
		const dividendRaw = unwrapTwoDecimalPlaces(dividend)
		const divisorRaw = unwrapTwoDecimalPlaces(divisor)

		//++ [EXCEPTION] Math.round, *, / permitted in Toolsmith for performance - provides scaled integer arithmetic
		const dividendScaled = Math.round(dividendRaw * SCALE_FACTOR)
		const divisorScaled = Math.round(divisorRaw * SCALE_FACTOR)
		const resultRaw = dividendScaled / divisorScaled

		return twoDecimalPlaces(resultRaw)
	}
}
