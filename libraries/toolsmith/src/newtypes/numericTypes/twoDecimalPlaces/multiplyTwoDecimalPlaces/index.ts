import type { Result } from "@sitebender/toolsmith/types/fp/result/index.ts"
import type { ValidationError } from "@sitebender/toolsmith/types/validation/index.ts"
import type { TwoDecimalPlaces } from "@sitebender/toolsmith/types/branded/index.ts"

import twoDecimalPlaces from "@sitebender/toolsmith/newtypes/twoDecimalPlaces/index.ts"
import unwrapTwoDecimalPlaces from "@sitebender/toolsmith/newtypes/twoDecimalPlaces/unwrapTwoDecimalPlaces/index.ts"

//++ Multiplies two TwoDecimalPlaces values using scaled integer arithmetic to avoid floating point errors
//++ Returns Result with error if the result cannot be represented as TwoDecimalPlaces
export default function multiplyTwoDecimalPlaces(
	multiplicand: TwoDecimalPlaces,
): (multiplier: TwoDecimalPlaces) => Result<ValidationError, TwoDecimalPlaces> {
	return function multiplyWithMultiplicand(
		multiplier: TwoDecimalPlaces,
	): Result<ValidationError, TwoDecimalPlaces> {
		const SCALE_FACTOR = 100
		const multiplicandRaw = unwrapTwoDecimalPlaces(multiplicand)
		const multiplierRaw = unwrapTwoDecimalPlaces(multiplier)

		const multiplicandScaled = Math.round(multiplicandRaw * SCALE_FACTOR)
		const multiplierScaled = Math.round(multiplierRaw * SCALE_FACTOR)
		const resultScaled = multiplicandScaled * multiplierScaled
		const resultRaw = resultScaled / (SCALE_FACTOR * SCALE_FACTOR)

		return twoDecimalPlaces(resultRaw)
	}
}
