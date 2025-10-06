import type { Result } from "@sitebender/toolsmith/types/fp/result/index.ts"
import type { ValidationError } from "@sitebender/toolsmith/types/ValidationError/index.ts"
import type { ExactOneDecimal } from "@sitebender/toolsmith/types/branded/index.ts"

import exactOneDecimal from "@sitebender/toolsmith/newtypes/exactOneDecimal/index.ts"
import unwrapExactOneDecimal from "@sitebender/toolsmith/newtypes/exactOneDecimal/unwrapExactOneDecimal/index.ts"

//++ Divides two ExactOneDecimal values using scaled integer arithmetic to avoid floating point errors
//++ Returns Result with error if divisor is zero or result cannot be represented as ExactOneDecimal
export default function divideExactOneDecimal(
	dividend: ExactOneDecimal,
): (divisor: ExactOneDecimal) => Result<ValidationError, ExactOneDecimal> {
	return function divideWithDividend(
		divisor: ExactOneDecimal,
	): Result<ValidationError, ExactOneDecimal> {
		const SCALE_FACTOR = 10
		const dividendRaw = unwrapExactOneDecimal(dividend)
		const divisorRaw = unwrapExactOneDecimal(divisor)

		const dividendScaled = Math.round(dividendRaw * SCALE_FACTOR)
		const divisorScaled = Math.round(divisorRaw * SCALE_FACTOR)
		const resultRaw = dividendScaled / divisorScaled

		return exactOneDecimal(resultRaw)
	}
}
