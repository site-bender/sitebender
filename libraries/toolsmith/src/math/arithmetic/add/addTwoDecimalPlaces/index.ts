import type { Result } from "@sitebender/toolsmith/types/fp/result/index.ts"
import type { ValidationError } from "@sitebender/toolsmith/types/fp/validation/index.ts"
import type { TwoDecimalPlaces } from "@sitebender/toolsmith/types/branded/index.ts"

import twoDecimalPlaces from "@sitebender/toolsmith/newtypes/numericTypes/twoDecimalPlaces/index.ts"
import unwrapTwoDecimalPlaces from "@sitebender/toolsmith/newtypes/numericTypes/twoDecimalPlaces/unwrapTwoDecimalPlaces/index.ts"

//++ Adds two TwoDecimalPlaces values using scaled integer arithmetic to avoid floating point errors
//++ Returns Result with error if the result cannot be represented as TwoDecimalPlaces
export default function addTwoDecimalPlaces(
	augend: TwoDecimalPlaces,
): (addend: TwoDecimalPlaces) => Result<ValidationError, TwoDecimalPlaces> {
	return function addToAugend(
		addend: TwoDecimalPlaces,
	): Result<ValidationError, TwoDecimalPlaces> {
		const SCALE_FACTOR = 100
		const augendRaw = unwrapTwoDecimalPlaces(augend)
		const addendRaw = unwrapTwoDecimalPlaces(addend)

		const augendScaled = Math.round(augendRaw * SCALE_FACTOR)
		const addendScaled = Math.round(addendRaw * SCALE_FACTOR)
		const resultScaled = augendScaled + addendScaled
		const resultRaw = resultScaled / SCALE_FACTOR

		return twoDecimalPlaces(resultRaw)
	}
}
