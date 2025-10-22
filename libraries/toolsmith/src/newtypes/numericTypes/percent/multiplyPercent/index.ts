import type { Result } from "@sitebender/toolsmith/types/fp/result/index.ts"
import type { ValidationError } from "@sitebender/toolsmith/types/fp/validation/index.ts"
import type { Percent } from "@sitebender/toolsmith/types/branded/index.ts"

import percent from "@sitebender/toolsmith/newtypes/percent/index.ts"
import unwrapPercent from "@sitebender/toolsmith/newtypes/percent/unwrapPercent/index.ts"

//++ Multiplies two Percent values using scaled integer arithmetic for exact precision
//++ Represents "percent of a percent" (e.g., 50% × 20% = 10%)
export default function multiplyPercent(
	multiplicand: Percent,
): (multiplier: Percent) => Result<ValidationError, Percent> {
	return function multiplyByMultiplicand(
		multiplier: Percent,
	): Result<ValidationError, Percent> {
		const SCALE_FACTOR = 10000
		const multiplicandRaw = unwrapPercent(multiplicand)
		const multiplierRaw = unwrapPercent(multiplier)

		const multiplicandScaled = Math.round(multiplicandRaw * SCALE_FACTOR)
		const multiplierScaled = Math.round(multiplierRaw * SCALE_FACTOR)
		const resultScaled = (multiplicandScaled * multiplierScaled) / SCALE_FACTOR
		const resultRaw = resultScaled / SCALE_FACTOR

		return percent(resultRaw)
	}
}
