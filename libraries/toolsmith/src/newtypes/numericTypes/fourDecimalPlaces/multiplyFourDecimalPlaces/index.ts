import type { Result } from "@sitebender/toolsmith/types/fp/result/index.ts"
import type { ValidationError } from "@sitebender/toolsmith/types/fp/validation/index.ts"
import type { FourDecimalPlaces } from "@sitebender/toolsmith/types/branded/index.ts"

import fourDecimalPlaces from "@sitebender/toolsmith/newtypes/numericTypes/fourDecimalPlaces/index.ts"
import unwrapFourDecimalPlaces from "@sitebender/toolsmith/newtypes/numericTypes/fourDecimalPlaces/unwrapFourDecimalPlaces/index.ts"

//++ Multiplies two FourDecimalPlaces values using scaled integer arithmetic to avoid floating point errors
//++ Returns Result with error if the result cannot be represented as FourDecimalPlaces
export default function multiplyFourDecimalPlaces(
	multiplicand: FourDecimalPlaces,
): (
	multiplier: FourDecimalPlaces,
) => Result<ValidationError, FourDecimalPlaces> {
	return function multiplyWithMultiplicand(
		multiplier: FourDecimalPlaces,
	): Result<ValidationError, FourDecimalPlaces> {
		const SCALE_FACTOR = 10000
		const multiplicandRaw = unwrapFourDecimalPlaces(multiplicand)
		const multiplierRaw = unwrapFourDecimalPlaces(multiplier)

		const multiplicandScaled = Math.round(multiplicandRaw * SCALE_FACTOR)
		const multiplierScaled = Math.round(multiplierRaw * SCALE_FACTOR)
		const resultScaled = multiplicandScaled * multiplierScaled
		const resultRaw = resultScaled / (SCALE_FACTOR * SCALE_FACTOR)

		return fourDecimalPlaces(resultRaw)
	}
}
