import type { Result } from "@sitebender/toolsmith/types/fp/result/index.ts"
import type { ValidationError } from "@sitebender/toolsmith/types/validation/index.ts"
import type { OneDecimalPlace } from "@sitebender/toolsmith/types/branded/index.ts"

import oneDecimalPlace from "@sitebender/toolsmith/newtypes/oneDecimalPlace/index.ts"
import unwrapOneDecimalPlace from "@sitebender/toolsmith/newtypes/oneDecimalPlace/unwrapOneDecimalPlace/index.ts"

//++ Multiplies two OneDecimalPlace values using scaled integer arithmetic to avoid floating point errors
//++ Returns Result with error if the result cannot be represented as OneDecimalPlace
export default function multiplyOneDecimalPlace(
	multiplicand: OneDecimalPlace,
): (multiplier: OneDecimalPlace) => Result<ValidationError, OneDecimalPlace> {
	return function multiplyWithMultiplicand(
		multiplier: OneDecimalPlace,
	): Result<ValidationError, OneDecimalPlace> {
		const SCALE_FACTOR = 10
		const multiplicandRaw = unwrapOneDecimalPlace(multiplicand)
		const multiplierRaw = unwrapOneDecimalPlace(multiplier)

		const multiplicandScaled = Math.round(multiplicandRaw * SCALE_FACTOR)
		const multiplierScaled = Math.round(multiplierRaw * SCALE_FACTOR)
		const resultScaled = multiplicandScaled * multiplierScaled
		const resultRaw = resultScaled / (SCALE_FACTOR * SCALE_FACTOR)

		return oneDecimalPlace(resultRaw)
	}
}
