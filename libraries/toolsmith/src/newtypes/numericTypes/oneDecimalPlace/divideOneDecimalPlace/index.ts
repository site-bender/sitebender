import type { Result } from "@sitebender/toolsmith/types/fp/result/index.ts"
import type { ValidationError } from "@sitebender/toolsmith/types/ValidationError/index.ts"
import type { OneDecimalPlace } from "@sitebender/toolsmith/types/branded/index.ts"

import oneDecimalPlace from "@sitebender/toolsmith/newtypes/oneDecimalPlace/index.ts"
import unwrapOneDecimalPlace from "@sitebender/toolsmith/newtypes/oneDecimalPlace/unwrapOneDecimalPlace/index.ts"

//++ Divides two OneDecimalPlace values using scaled integer arithmetic to avoid floating point errors
//++ Returns Result with error if divisor is zero or result cannot be represented as OneDecimalPlace
export default function divideOneDecimalPlace(
	dividend: OneDecimalPlace,
): (divisor: OneDecimalPlace) => Result<ValidationError, OneDecimalPlace> {
	return function divideWithDividend(
		divisor: OneDecimalPlace,
	): Result<ValidationError, OneDecimalPlace> {
		const SCALE_FACTOR = 10
		const dividendRaw = unwrapOneDecimalPlace(dividend)
		const divisorRaw = unwrapOneDecimalPlace(divisor)

		const dividendScaled = Math.round(dividendRaw * SCALE_FACTOR)
		const divisorScaled = Math.round(divisorRaw * SCALE_FACTOR)
		const resultRaw = dividendScaled / divisorScaled

		return oneDecimalPlace(resultRaw)
	}
}
