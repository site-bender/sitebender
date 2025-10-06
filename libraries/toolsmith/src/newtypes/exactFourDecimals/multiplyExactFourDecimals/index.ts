import type { Result } from "@sitebender/toolsmith/types/fp/result/index.ts"
import type { ValidationError } from "@sitebender/toolsmith/types/ValidationError/index.ts"
import type { ExactFourDecimals } from "@sitebender/toolsmith/types/branded/index.ts"

import exactFourDecimals from "@sitebender/toolsmith/newtypes/exactFourDecimals/index.ts"
import unwrapExactFourDecimals from "@sitebender/toolsmith/newtypes/exactFourDecimals/unwrapExactFourDecimals/index.ts"

//++ Multiplies two ExactFourDecimals values using scaled integer arithmetic to avoid floating point errors
//++ Returns Result with error if the result cannot be represented as ExactFourDecimals
export default function multiplyExactFourDecimals(
	multiplicand: ExactFourDecimals,
): (multiplier: ExactFourDecimals) => Result<ValidationError, ExactFourDecimals> {
	return function multiplyWithMultiplicand(
		multiplier: ExactFourDecimals,
	): Result<ValidationError, ExactFourDecimals> {
		const SCALE_FACTOR = 10000
		const multiplicandRaw = unwrapExactFourDecimals(multiplicand)
		const multiplierRaw = unwrapExactFourDecimals(multiplier)

		const multiplicandScaled = Math.round(multiplicandRaw * SCALE_FACTOR)
		const multiplierScaled = Math.round(multiplierRaw * SCALE_FACTOR)
		const resultScaled = multiplicandScaled * multiplierScaled
		const resultRaw = resultScaled / (SCALE_FACTOR * SCALE_FACTOR)

		return exactFourDecimals(resultRaw)
	}
}
