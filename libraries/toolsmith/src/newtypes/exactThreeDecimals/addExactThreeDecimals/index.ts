import type { Result } from "@sitebender/toolsmith/types/fp/result/index.ts"
import type { ValidationError } from "@sitebender/toolsmith/types/ValidationError/index.ts"
import type { ExactThreeDecimals } from "@sitebender/toolsmith/types/branded/index.ts"

import exactThreeDecimals from "@sitebender/toolsmith/newtypes/exactThreeDecimals/index.ts"
import unwrapExactThreeDecimals from "@sitebender/toolsmith/newtypes/exactThreeDecimals/unwrapExactThreeDecimals/index.ts"

//++ Adds two ExactThreeDecimals values using scaled integer arithmetic to avoid floating point errors
//++ Returns Result with error if the result cannot be represented as ExactThreeDecimals
export default function addExactThreeDecimals(
	augend: ExactThreeDecimals,
): (addend: ExactThreeDecimals) => Result<ValidationError, ExactThreeDecimals> {
	return function addToAugend(
		addend: ExactThreeDecimals,
	): Result<ValidationError, ExactThreeDecimals> {
		const SCALE_FACTOR = 1000
		const augendRaw = unwrapExactThreeDecimals(augend)
		const addendRaw = unwrapExactThreeDecimals(addend)

		const augendScaled = Math.round(augendRaw * SCALE_FACTOR)
		const addendScaled = Math.round(addendRaw * SCALE_FACTOR)
		const resultScaled = augendScaled + addendScaled
		const resultRaw = resultScaled / SCALE_FACTOR

		return exactThreeDecimals(resultRaw)
	}
}
