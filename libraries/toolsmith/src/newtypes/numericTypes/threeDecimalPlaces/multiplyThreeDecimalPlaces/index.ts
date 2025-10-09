import type { Result } from "@sitebender/toolsmith/types/fp/result/index.ts"
import type { ValidationError } from "@sitebender/toolsmith/types/validation/index.ts"
import type { ThreeDecimalPlaces } from "@sitebender/toolsmith/types/branded/index.ts"

import threeDecimalPlaces from "@sitebender/toolsmith/newtypes/threeDecimalPlaces/index.ts"
import unwrapThreeDecimalPlaces from "@sitebender/toolsmith/newtypes/threeDecimalPlaces/unwrapThreeDecimalPlaces/index.ts"

//++ Multiplies two ThreeDecimalPlaces values using scaled integer arithmetic to avoid floating point errors
//++ Returns Result with error if the result cannot be represented as ThreeDecimalPlaces
export default function multiplyThreeDecimalPlaces(
	multiplicand: ThreeDecimalPlaces,
): (
	multiplier: ThreeDecimalPlaces,
) => Result<ValidationError, ThreeDecimalPlaces> {
	return function multiplyWithMultiplicand(
		multiplier: ThreeDecimalPlaces,
	): Result<ValidationError, ThreeDecimalPlaces> {
		const SCALE_FACTOR = 1000
		const multiplicandRaw = unwrapThreeDecimalPlaces(multiplicand)
		const multiplierRaw = unwrapThreeDecimalPlaces(multiplier)

		const multiplicandScaled = Math.round(multiplicandRaw * SCALE_FACTOR)
		const multiplierScaled = Math.round(multiplierRaw * SCALE_FACTOR)
		const resultScaled = multiplicandScaled * multiplierScaled
		const resultRaw = resultScaled / (SCALE_FACTOR * SCALE_FACTOR)

		return threeDecimalPlaces(resultRaw)
	}
}
