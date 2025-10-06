import type { Result } from "@sitebender/toolsmith/types/fp/result/index.ts"
import type { ValidationError } from "@sitebender/toolsmith/types/ValidationError/index.ts"
import type { ExactTwoDecimals } from "@sitebender/toolsmith/types/branded/index.ts"

import exactTwoDecimals from "@sitebender/toolsmith/newtypes/exactTwoDecimals/index.ts"
import unwrapExactTwoDecimals from "@sitebender/toolsmith/newtypes/exactTwoDecimals/unwrapExactTwoDecimals/index.ts"

//++ Multiplies two ExactTwoDecimals values using scaled integer arithmetic to avoid floating point errors
//++ Returns Result with error if the result cannot be represented as ExactTwoDecimals
export default function multiplyExactTwoDecimals(
	multiplicand: ExactTwoDecimals,
): (multiplier: ExactTwoDecimals) => Result<ValidationError, ExactTwoDecimals> {
	return function multiplyWithMultiplicand(
		multiplier: ExactTwoDecimals,
	): Result<ValidationError, ExactTwoDecimals> {
		const SCALE_FACTOR = 100
		const multiplicandRaw = unwrapExactTwoDecimals(multiplicand)
		const multiplierRaw = unwrapExactTwoDecimals(multiplier)

		const multiplicandScaled = Math.round(multiplicandRaw * SCALE_FACTOR)
		const multiplierScaled = Math.round(multiplierRaw * SCALE_FACTOR)
		const resultScaled = multiplicandScaled * multiplierScaled
		const resultRaw = resultScaled / (SCALE_FACTOR * SCALE_FACTOR)

		return exactTwoDecimals(resultRaw)
	}
}
