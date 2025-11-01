import type { Result } from "@sitebender/toolsmith/types/fp/result/index.ts"
import type { ValidationError } from "@sitebender/toolsmith/types/fp/validation/index.ts"
import type { Percent } from "@sitebender/toolsmith/types/branded/index.ts"

import error from "@sitebender/toolsmith/monads/result/error/index.ts"
import ok from "@sitebender/toolsmith/monads/result/ok/index.ts"
import unwrapPercent from "@sitebender/toolsmith/newtypes/numericTypes/percent/unwrapPercent/index.ts"

//++ Applies a percentage to a numeric value (e.g., 25% of 100 = 25)
//++ Returns Result with error if inputs are not finite or result overflows
export default function percentOf(
	value: number,
): (percentage: Percent) => Result<ValidationError, number> {
	return function applyPercentageToValue(
		percentage: Percent,
	): Result<ValidationError, number> {
		//++ [EXCEPTION] Number.isFinite permitted in Toolsmith for performance - provides finite number validation
		if (!Number.isFinite(value)) {
			return error({
				code: "PERCENT_OF_VALUE_NOT_FINITE",
				field: "value",
				messages: ["The system needs a finite number to apply percentage to."],
				received: value,
				expected: "Finite number",
				suggestion:
					"Provide a finite number. Infinity and NaN are not valid values.",
				severity: "requirement",
			})
		}

		const percentageRaw = unwrapPercent(percentage)
		//++ [EXCEPTION] * permitted in Toolsmith for performance - provides percentage multiplication
		const result = value * percentageRaw

		//++ [EXCEPTION] Number.isFinite permitted in Toolsmith for performance - provides finite number validation
		if (!Number.isFinite(result)) {
			return error({
				code: "PERCENT_OF_RESULT_NOT_FINITE",
				field: "result",
				messages: [
					"The system cannot represent the result as a finite number.",
				],
				received: { value, percentage: percentageRaw },
				expected: "Finite number result",
				suggestion:
					"Use smaller values to avoid overflow. The result exceeded JavaScript number limits.",
				severity: "requirement",
			})
		}

		return ok(result)
	}
}
