import type { Result } from "@sitebender/toolsmith/types/fp/result/index.ts"
import type { ValidationError } from "@sitebender/toolsmith/types/ValidationError/index.ts"
import type { ExactTwoDecimals } from "@sitebender/toolsmith/types/branded/index.ts"

import exactTwoDecimals from "@sitebender/toolsmith/newtypes/exactTwoDecimals/index.ts"
import unwrapExactTwoDecimals from "@sitebender/toolsmith/newtypes/exactTwoDecimals/unwrapExactTwoDecimals/index.ts"

//++ Adds two ExactTwoDecimals values using scaled integer arithmetic to avoid floating point errors
//++ Returns Result with error if the result cannot be represented as ExactTwoDecimals
export default function addExactTwoDecimals(
	augend: ExactTwoDecimals,
): (addend: ExactTwoDecimals) => Result<ValidationError, ExactTwoDecimals> {
	return function addToAugend(
		addend: ExactTwoDecimals,
	): Result<ValidationError, ExactTwoDecimals> {
		const SCALE_FACTOR = 100
		const augendRaw = unwrapExactTwoDecimals(augend)
		const addendRaw = unwrapExactTwoDecimals(addend)

		const augendScaled = Math.round(augendRaw * SCALE_FACTOR)
		const addendScaled = Math.round(addendRaw * SCALE_FACTOR)
		const resultScaled = augendScaled + addendScaled
		const resultRaw = resultScaled / SCALE_FACTOR

		return exactTwoDecimals(resultRaw)
	}
}
