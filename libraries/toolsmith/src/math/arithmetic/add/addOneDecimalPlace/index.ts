import type { Result } from "@sitebender/toolsmith/types/fp/result/index.ts"
import type { ValidationError } from "@sitebender/toolsmith/types/fp/validation/index.ts"
import type { OneDecimalPlace } from "@sitebender/toolsmith/types/branded/index.ts"

import oneDecimalPlace from "@sitebender/toolsmith/newtypes/numericTypes/oneDecimalPlace/index.ts"
import unwrapOneDecimalPlace from "@sitebender/toolsmith/newtypes/numericTypes/oneDecimalPlace/unwrapOneDecimalPlace/index.ts"

//++ Adds two OneDecimalPlace values using scaled integer arithmetic to avoid floating point errors
//++ Returns Result with error if the result cannot be represented as OneDecimalPlace
export default function addOneDecimalPlace(
	augend: OneDecimalPlace,
): (addend: OneDecimalPlace) => Result<ValidationError, OneDecimalPlace> {
	return function addToAugend(
		addend: OneDecimalPlace,
	): Result<ValidationError, OneDecimalPlace> {
		const SCALE_FACTOR = 10
		const augendRaw = unwrapOneDecimalPlace(augend)
		const addendRaw = unwrapOneDecimalPlace(addend)

		//++ [EXCEPTION] Math.round, *, +, / permitted in Toolsmith for performance - provides scaled integer arithmetic
		const augendScaled = Math.round(augendRaw * SCALE_FACTOR)
		const addendScaled = Math.round(addendRaw * SCALE_FACTOR)
		const resultScaled = augendScaled + addendScaled
		const resultRaw = resultScaled / SCALE_FACTOR

		return oneDecimalPlace(resultRaw)
	}
}
