import type { Result } from "@sitebender/toolsmith/types/fp/result/index.ts"
import type { ValidationError } from "@sitebender/toolsmith/types/ValidationError/index.ts"
import type { ExactOneDecimal } from "@sitebender/toolsmith/types/branded/index.ts"

import exactOneDecimal from "@sitebender/toolsmith/newtypes/exactOneDecimal/index.ts"
import unwrapExactOneDecimal from "@sitebender/toolsmith/newtypes/exactOneDecimal/unwrapExactOneDecimal/index.ts"

//++ Multiplies two ExactOneDecimal values using scaled integer arithmetic to avoid floating point errors
//++ Returns Result with error if the result cannot be represented as ExactOneDecimal
export default function multiplyExactOneDecimal(
	multiplicand: ExactOneDecimal,
): (multiplier: ExactOneDecimal) => Result<ValidationError, ExactOneDecimal> {
	return function multiplyWithMultiplicand(
		multiplier: ExactOneDecimal,
	): Result<ValidationError, ExactOneDecimal> {
		const SCALE_FACTOR = 10
		const multiplicandRaw = unwrapExactOneDecimal(multiplicand)
		const multiplierRaw = unwrapExactOneDecimal(multiplier)

		const multiplicandScaled = Math.round(multiplicandRaw * SCALE_FACTOR)
		const multiplierScaled = Math.round(multiplierRaw * SCALE_FACTOR)
		const resultScaled = multiplicandScaled * multiplierScaled
		const resultRaw = resultScaled / (SCALE_FACTOR * SCALE_FACTOR)

		return exactOneDecimal(resultRaw)
	}
}
