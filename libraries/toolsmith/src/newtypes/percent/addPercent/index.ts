import type { Result } from "@sitebender/toolsmith/types/fp/result/index.ts"
import type { ValidationError } from "@sitebender/toolsmith/types/ValidationError/index.ts"
import type { Percent } from "@sitebender/toolsmith/types/branded/index.ts"

import percent from "@sitebender/toolsmith/newtypes/percent/index.ts"
import unwrapPercent from "@sitebender/toolsmith/newtypes/percent/unwrapPercent/index.ts"

//++ Adds two Percent values using scaled integer arithmetic for exact precision
//++ Returns Result with error if sum exceeds 1.0 (100%)
export default function addPercent(
	augend: Percent,
): (addend: Percent) => Result<ValidationError, Percent> {
	return function addToAugend(
		addend: Percent,
	): Result<ValidationError, Percent> {
		const SCALE_FACTOR = 10000
		const augendRaw = unwrapPercent(augend)
		const addendRaw = unwrapPercent(addend)

		const augendScaled = Math.round(augendRaw * SCALE_FACTOR)
		const addendScaled = Math.round(addendRaw * SCALE_FACTOR)
		const resultScaled = augendScaled + addendScaled
		const resultRaw = resultScaled / SCALE_FACTOR

		return percent(resultRaw)
	}
}
