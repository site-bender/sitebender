import type { Result } from "@sitebender/toolsmith/types/fp/result/index.ts"
import type { ValidationError } from "@sitebender/toolsmith/types/validation/index.ts"
import type { ThreeDecimalPlaces } from "@sitebender/toolsmith/types/branded/index.ts"

import threeDecimalPlaces from "@sitebender/toolsmith/newtypes/threeDecimalPlaces/index.ts"
import unwrapThreeDecimalPlaces from "@sitebender/toolsmith/newtypes/threeDecimalPlaces/unwrapThreeDecimalPlaces/index.ts"

//++ Divides two ThreeDecimalPlaces values using scaled integer arithmetic to avoid floating point errors
//++ Returns Result with error if divisor is zero or result cannot be represented as ThreeDecimalPlaces
export default function divideThreeDecimalPlaces(
	dividend: ThreeDecimalPlaces,
): (
	divisor: ThreeDecimalPlaces,
) => Result<ValidationError, ThreeDecimalPlaces> {
	return function divideWithDividend(
		divisor: ThreeDecimalPlaces,
	): Result<ValidationError, ThreeDecimalPlaces> {
		const SCALE_FACTOR = 1000
		const dividendRaw = unwrapThreeDecimalPlaces(dividend)
		const divisorRaw = unwrapThreeDecimalPlaces(divisor)

		const dividendScaled = Math.round(dividendRaw * SCALE_FACTOR)
		const divisorScaled = Math.round(divisorRaw * SCALE_FACTOR)
		const resultRaw = dividendScaled / divisorScaled

		return threeDecimalPlaces(resultRaw)
	}
}
