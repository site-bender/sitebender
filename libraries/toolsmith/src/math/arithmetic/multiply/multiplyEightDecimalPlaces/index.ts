import type { Result } from "@sitebender/toolsmith/types/fp/result/index.ts"
import type { ValidationError } from "@sitebender/toolsmith/types/fp/validation/index.ts"
import type { EightDecimalPlaces } from "@sitebender/toolsmith/types/branded/index.ts"

import eightDecimalPlaces from "@sitebender/toolsmith/newtypes/numericTypes/eightDecimalPlaces/index.ts"
import unwrapEightDecimalPlaces from "@sitebender/toolsmith/newtypes/numericTypes/eightDecimalPlaces/unwrapEightDecimalPlaces/index.ts"

//++ Multiplies two EightDecimalPlaces numbers using scaled integer arithmetic for exact precision
//++ Returns Result with error if result cannot be represented with 8 decimal places
export default function multiplyEightDecimalPlaces(
	multiplicand: EightDecimalPlaces,
): (
	multiplier: EightDecimalPlaces,
) => Result<ValidationError, EightDecimalPlaces> {
	return function multiplyByMultiplicand(
		multiplier: EightDecimalPlaces,
	): Result<ValidationError, EightDecimalPlaces> {
		const SCALE_FACTOR = 100000000
		const multiplicandRaw = unwrapEightDecimalPlaces(multiplicand)
		const multiplierRaw = unwrapEightDecimalPlaces(multiplier)

		//++ [EXCEPTION] Math.round, *, / permitted in Toolsmith for performance - provides scaled integer arithmetic
		const multiplicandScaled = Math.round(multiplicandRaw * SCALE_FACTOR)
		const multiplierScaled = Math.round(multiplierRaw * SCALE_FACTOR)
		const resultScaled = (multiplicandScaled * multiplierScaled) /
			SCALE_FACTOR
		const resultRaw = resultScaled / SCALE_FACTOR

		return eightDecimalPlaces(resultRaw)
	}
}
