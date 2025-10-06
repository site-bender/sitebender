import type { Result } from "@sitebender/toolsmith/types/fp/result/index.ts"
import type { ValidationError } from "@sitebender/toolsmith/types/ValidationError/index.ts"
import type { ExactOneDecimal } from "@sitebender/toolsmith/types/branded/index.ts"

import exactOneDecimal from "@sitebender/toolsmith/newtypes/exactOneDecimal/index.ts"
import unwrapExactOneDecimal from "@sitebender/toolsmith/newtypes/exactOneDecimal/unwrapExactOneDecimal/index.ts"

//++ Adds two ExactOneDecimal values using scaled integer arithmetic to avoid floating point errors
//++ Returns Result with error if the result cannot be represented as ExactOneDecimal
export default function addExactOneDecimal(
	augend: ExactOneDecimal,
): (addend: ExactOneDecimal) => Result<ValidationError, ExactOneDecimal> {
	return function addToAugend(
		addend: ExactOneDecimal,
	): Result<ValidationError, ExactOneDecimal> {
		const SCALE_FACTOR = 10
		const augendRaw = unwrapExactOneDecimal(augend)
		const addendRaw = unwrapExactOneDecimal(addend)

		const augendScaled = Math.round(augendRaw * SCALE_FACTOR)
		const addendScaled = Math.round(addendRaw * SCALE_FACTOR)
		const resultScaled = augendScaled + addendScaled
		const resultRaw = resultScaled / SCALE_FACTOR

		return exactOneDecimal(resultRaw)
	}
}
