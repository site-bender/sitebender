import type { Result } from "@sitebender/toolsmith/types/fp/result/index.ts"
import type { ValidationError } from "@sitebender/toolsmith/types/ValidationError/index.ts"
import type { ExactThreeDecimals } from "@sitebender/toolsmith/types/branded/index.ts"

import exactThreeDecimals from "@sitebender/toolsmith/newtypes/exactThreeDecimals/index.ts"
import unwrapExactThreeDecimals from "@sitebender/toolsmith/newtypes/exactThreeDecimals/unwrapExactThreeDecimals/index.ts"

//++ Multiplies two ExactThreeDecimals values using scaled integer arithmetic to avoid floating point errors
//++ Returns Result with error if the result cannot be represented as ExactThreeDecimals
export default function multiplyExactThreeDecimals(
	multiplicand: ExactThreeDecimals,
): (multiplier: ExactThreeDecimals) => Result<ValidationError, ExactThreeDecimals> {
	return function multiplyWithMultiplicand(
		multiplier: ExactThreeDecimals,
	): Result<ValidationError, ExactThreeDecimals> {
		const SCALE_FACTOR = 1000
		const multiplicandRaw = unwrapExactThreeDecimals(multiplicand)
		const multiplierRaw = unwrapExactThreeDecimals(multiplier)

		const multiplicandScaled = Math.round(multiplicandRaw * SCALE_FACTOR)
		const multiplierScaled = Math.round(multiplierRaw * SCALE_FACTOR)
		const resultScaled = multiplicandScaled * multiplierScaled
		const resultRaw = resultScaled / (SCALE_FACTOR * SCALE_FACTOR)

		return exactThreeDecimals(resultRaw)
	}
}
