import type { Result } from "@sitebender/toolsmith/types/fp/result/index.ts"
import type { ValidationError } from "@sitebender/toolsmith/types/ValidationError/index.ts"
import type { ExactTwoDecimals } from "@sitebender/toolsmith/types/branded/index.ts"

import error from "@sitebender/toolsmith/monads/result/error/index.ts"
import ok from "@sitebender/toolsmith/monads/result/ok/index.ts"
import _isExactTwoDecimals from "@sitebender/toolsmith/newtypes/exactTwoDecimals/_isExactTwoDecimals/index.ts"

//++ Smart constructor that validates and creates an ExactTwoDecimals value - returns Result with helpful error on failure
//++ Commonly used for monetary amounts but not limited to currency
export default function exactTwoDecimals(
	n: number,
): Result<ValidationError, ExactTwoDecimals> {
	if (!Number.isFinite(n)) {
		return error({
			code: "EXACT_TWO_DECIMALS_NOT_FINITE",
			field: "exactTwoDecimals",
			messages: [
				"The system needs a finite number with exactly 2 decimal places.",
			],
			received: n,
			expected: "Finite number with at most 2 decimal places",
			suggestion:
				"Use a finite number like 19.99 or 0.01. Infinity and NaN are not valid. For exact arithmetic with 2 decimal places.",
			severity: "requirement",
		})
	}

	if (_isExactTwoDecimals(n)) {
		return ok(n as ExactTwoDecimals)
	}

	return error({
		code: "EXACT_TWO_DECIMALS_PRECISION_EXCEEDED",
		field: "exactTwoDecimals",
		messages: [
			"The system needs a number with at most 2 decimal places.",
		],
		received: n,
		expected: "Number with at most 2 decimal places",
		suggestion:
			"Use a number with at most 2 decimal places (e.g., 19.99, 10.5, 100). For 3 decimal places, use ExactThreeDecimals instead.",
		severity: "requirement",
	})
}
