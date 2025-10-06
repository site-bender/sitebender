import type { Result } from "@sitebender/toolsmith/types/fp/result/index.ts"
import type { ValidationError } from "@sitebender/toolsmith/types/ValidationError/index.ts"
import type { ExactFourDecimals } from "@sitebender/toolsmith/types/branded/index.ts"

import exactFourDecimals from "@sitebender/toolsmith/newtypes/exactFourDecimals/index.ts"
import unwrapExactFourDecimals from "@sitebender/toolsmith/newtypes/exactFourDecimals/unwrapExactFourDecimals/index.ts"

//++ Adds two ExactFourDecimals values using scaled integer arithmetic to avoid floating point errors
//++ Returns Result with error if the result cannot be represented as ExactFourDecimals
export default function addExactFourDecimals(
	augend: ExactFourDecimals,
): (addend: ExactFourDecimals) => Result<ValidationError, ExactFourDecimals> {
	return function addToAugend(
		addend: ExactFourDecimals,
	): Result<ValidationError, ExactFourDecimals> {
		const SCALE_FACTOR = 10000
		const augendRaw = unwrapExactFourDecimals(augend)
		const addendRaw = unwrapExactFourDecimals(addend)

		const augendScaled = Math.round(augendRaw * SCALE_FACTOR)
		const addendScaled = Math.round(addendRaw * SCALE_FACTOR)
		const resultScaled = augendScaled + addendScaled
		const resultRaw = resultScaled / SCALE_FACTOR

		return exactFourDecimals(resultRaw)
	}
}
