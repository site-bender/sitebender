import type { Result } from "@sitebender/toolsmith/types/fp/result/index.ts"
import type { ValidationError } from "@sitebender/toolsmith/types/fp/validation/index.ts"
import type { EightDecimalPlaces } from "@sitebender/toolsmith/types/branded/index.ts"

import eightDecimalPlaces from "@sitebender/toolsmith/newtypes/numericTypes/eightDecimalPlaces/index.ts"
import unwrapEightDecimalPlaces from "@sitebender/toolsmith/newtypes/numericTypes/eightDecimalPlaces/unwrapEightDecimalPlaces/index.ts"

//++ Adds two EightDecimalPlaces numbers using scaled integer arithmetic for exact precision
//++ Returns Result with error if result cannot be represented with 8 decimal places
export default function addEightDecimalPlaces(
	augend: EightDecimalPlaces,
): (addend: EightDecimalPlaces) => Result<ValidationError, EightDecimalPlaces> {
	return function addToAugend(
		addend: EightDecimalPlaces,
	): Result<ValidationError, EightDecimalPlaces> {
		const SCALE_FACTOR = 100000000
		const augendRaw = unwrapEightDecimalPlaces(augend)
		const addendRaw = unwrapEightDecimalPlaces(addend)

		const augendScaled = Math.round(augendRaw * SCALE_FACTOR)
		const addendScaled = Math.round(addendRaw * SCALE_FACTOR)
		const resultScaled = augendScaled + addendScaled
		const resultRaw = resultScaled / SCALE_FACTOR

		return eightDecimalPlaces(resultRaw)
	}
}
