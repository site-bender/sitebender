import type { Result } from "@sitebender/toolsmith/types/fp/result/index.ts"
import type { ValidationError } from "@sitebender/toolsmith/types/fp/validation/index.ts"
import type { ThreeDecimalPlaces } from "@sitebender/toolsmith/types/branded/index.ts"

import threeDecimalPlaces from "@sitebender/toolsmith/newtypes/numericTypes/threeDecimalPlaces/index.ts"
import unwrapThreeDecimalPlaces from "@sitebender/toolsmith/newtypes/numericTypes/threeDecimalPlaces/unwrapThreeDecimalPlaces/index.ts"

//++ Adds two ThreeDecimalPlaces values using scaled integer arithmetic to avoid floating point errors
//++ Returns Result with error if the result cannot be represented as ThreeDecimalPlaces
export default function addThreeDecimalPlaces(
	augend: ThreeDecimalPlaces,
): (addend: ThreeDecimalPlaces) => Result<ValidationError, ThreeDecimalPlaces> {
	return function addToAugend(
		addend: ThreeDecimalPlaces,
	): Result<ValidationError, ThreeDecimalPlaces> {
		const SCALE_FACTOR = 1000
		const augendRaw = unwrapThreeDecimalPlaces(augend)
		const addendRaw = unwrapThreeDecimalPlaces(addend)

		const augendScaled = Math.round(augendRaw * SCALE_FACTOR)
		const addendScaled = Math.round(addendRaw * SCALE_FACTOR)
		const resultScaled = augendScaled + addendScaled
		const resultRaw = resultScaled / SCALE_FACTOR

		return threeDecimalPlaces(resultRaw)
	}
}
