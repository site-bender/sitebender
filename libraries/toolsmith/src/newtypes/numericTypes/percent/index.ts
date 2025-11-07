import type { Result } from "@sitebender/toolsmith/types/fp/result/index.ts"
import type { ValidationError } from "@sitebender/toolsmith/types/fp/validation/index.ts"
import type { Percent } from "@sitebender/toolsmith/types/branded/index.ts"

import error from "@sitebender/toolsmith/monads/result/error/index.ts"
import ok from "@sitebender/toolsmith/monads/result/ok/index.ts"
import unsafePercent from "@sitebender/toolsmith/newtypes/numericTypes/percent/unsafePercent/index.ts"

//++ Smart constructor that validates and creates a Percent value - returns Result with helpful error on failure
//++ Validates number is in range 0-1 with at most 4 decimal places (0.0000 to 1.0000)
export default function percent(
	n: number,
): Result<ValidationError, Percent> {
	//++ [EXCEPTION] Number.isFinite and ! permitted in Toolsmith for performance - provides Percent validation wrapper
	if (!Number.isFinite(n)) {
		return error({
			code: "PERCENT_NOT_FINITE",
			field: "percent",
			messages: [
				"The system needs a finite number to represent a percentage.",
			],
			received: n,
			expected: "Finite number in range 0-1 with at most 4 decimal places",
			suggestion:
				"Use a finite number between 0 and 1 like 0.5 (50%) or 0.25 (25%). Infinity and NaN are not valid.",
			severity: "requirement",
		})
	}

	//++ [EXCEPTION] < permitted in Toolsmith for performance - provides Percent validation wrapper
	if (n < 0) {
		return error({
			code: "PERCENT_BELOW_MINIMUM",
			field: "percent",
			messages: [
				"The system needs a percentage in the range 0-1 (0% to 100%).",
			],
			received: n,
			expected: "Number between 0 and 1",
			suggestion:
				"Use a non-negative number. Percentages must be at least 0 (0%).",
			constraints: { minimum: 0, maximum: 1 },
			severity: "requirement",
		})
	}

	//++ [EXCEPTION] > permitted in Toolsmith for performance - provides Percent validation wrapper
	if (n > 1) {
		return error({
			code: "PERCENT_ABOVE_MAXIMUM",
			field: "percent",
			messages: [
				"The system needs a percentage in the range 0-1 (0% to 100%).",
			],
			received: n,
			expected: "Number between 0 and 1",
			suggestion:
				"Use a number at most 1. Percentages must be at most 1 (100%). If you need values greater than 100%, consider using a different numeric type.",
			constraints: { minimum: 0, maximum: 1 },
			severity: "requirement",
		})
	}

	//++ [EXCEPTION] Math.round, *, and / permitted in Toolsmith for performance - provides Percent validation wrapper
	const SCALE_FACTOR = 10000
	const scaled = Math.round(n * SCALE_FACTOR)
	const reconstructed = scaled / SCALE_FACTOR

	//++ [EXCEPTION] Math.abs, -, >, and Number.EPSILON permitted in Toolsmith for performance - provides Percent validation wrapper
	if (Math.abs(n - reconstructed) > Number.EPSILON) {
		return error({
			code: "PERCENT_PRECISION_EXCEEDED",
			field: "percent",
			messages: [
				"The system needs a percentage with at most 4 decimal places.",
			],
			received: n,
			expected: "Number with at most 4 decimal places",
			suggestion:
				"Use a number with at most 4 decimal places (e.g., 0.1234, 0.5000, 0.0825 for 8.25%). Round to 4 decimal places if needed.",
			constraints: { decimalPlaces: 4 },
			severity: "requirement",
		})
	}

	return ok(unsafePercent(n))
}
