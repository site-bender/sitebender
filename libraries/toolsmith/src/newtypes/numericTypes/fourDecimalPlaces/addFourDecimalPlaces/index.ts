import type { Result } from "@sitebender/toolsmith/types/fp/result/index.ts"
import type { ValidationError } from "@sitebender/toolsmith/types/validation/index.ts"
import type { FourDecimalPlaces } from "@sitebender/toolsmith/types/branded/index.ts"

import fourDecimalPlaces from "@sitebender/toolsmith/newtypes/numericTypes/fourDecimalPlaces/index.ts"
import unwrapFourDecimalPlaces from "@sitebender/toolsmith/newtypes/numericTypes/fourDecimalPlaces/unwrapFourDecimalPlaces/index.ts"

//++ Adds two FourDecimalPlaces values using scaled integer arithmetic to avoid floating point errors
//++ Returns Result with error if the result cannot be represented as FourDecimalPlaces
export default function addFourDecimalPlaces(
	augend: FourDecimalPlaces,
): (addend: FourDecimalPlaces) => Result<ValidationError, FourDecimalPlaces> {
	return function addToAugend(
		addend: FourDecimalPlaces,
	): Result<ValidationError, FourDecimalPlaces> {
		const SCALE_FACTOR = 10000
		const augendRaw = unwrapFourDecimalPlaces(augend)
		const addendRaw = unwrapFourDecimalPlaces(addend)

		const augendScaled = Math.round(augendRaw * SCALE_FACTOR)
		const addendScaled = Math.round(addendRaw * SCALE_FACTOR)
		const resultScaled = augendScaled + addendScaled
		const resultRaw = resultScaled / SCALE_FACTOR

		return fourDecimalPlaces(resultRaw)
	}
}
