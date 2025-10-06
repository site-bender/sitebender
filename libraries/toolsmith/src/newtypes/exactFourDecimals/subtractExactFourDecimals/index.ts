import type { Result } from "@sitebender/toolsmith/types/fp/result/index.ts"
import type { ValidationError } from "@sitebender/toolsmith/types/ValidationError/index.ts"
import type { ExactFourDecimals } from "@sitebender/toolsmith/types/branded/index.ts"

import exactFourDecimals from "@sitebender/toolsmith/newtypes/exactFourDecimals/index.ts"
import unwrapExactFourDecimals from "@sitebender/toolsmith/newtypes/exactFourDecimals/unwrapExactFourDecimals/index.ts"

//++ Subtracts two ExactFourDecimals values using scaled integer arithmetic to avoid floating point errors
//++ Returns Result with error if the result cannot be represented as ExactFourDecimals
export default function subtractExactFourDecimals(
	minuend: ExactFourDecimals,
): (subtrahend: ExactFourDecimals) => Result<ValidationError, ExactFourDecimals> {
	return function subtractFromMinuend(
		subtrahend: ExactFourDecimals,
	): Result<ValidationError, ExactFourDecimals> {
		const SCALE_FACTOR = 10000
		const minuendRaw = unwrapExactFourDecimals(minuend)
		const subtrahendRaw = unwrapExactFourDecimals(subtrahend)

		const minuendScaled = Math.round(minuendRaw * SCALE_FACTOR)
		const subtrahendScaled = Math.round(subtrahendRaw * SCALE_FACTOR)
		const resultScaled = minuendScaled - subtrahendScaled
		const resultRaw = resultScaled / SCALE_FACTOR

		return exactFourDecimals(resultRaw)
	}
}
