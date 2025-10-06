import type { Result } from "@sitebender/toolsmith/types/fp/result/index.ts"
import type { ValidationError } from "@sitebender/toolsmith/types/ValidationError/index.ts"
import type { ExactThreeDecimals } from "@sitebender/toolsmith/types/branded/index.ts"

import ok from "@sitebender/toolsmith/monads/result/ok/index.ts"
import error from "@sitebender/toolsmith/monads/result/error/index.ts"
import _isExactThreeDecimals from "@sitebender/toolsmith/newtypes/exactThreeDecimals/_isExactThreeDecimals/index.ts"

//++ Smart constructor that validates and creates a ExactThreeDecimals - returns Result with helpful error on failure
export default function exactThreeDecimals(n: number): Result<ValidationError, ExactThreeDecimals> {
	if (!Number.isFinite(n)) {
		return error({
			code: "EXACT_THREE_DECIMALS_NOT_FINITE",
			field: "exactThreeDecimals",
			messages: ["The system needs a finite number with at most 3 decimal places."],
			received: n,
			expected: "Finite number with at most 3 decimal places",
			suggestion:
				"Use a finite number like 123.456, 0.123, or -99.999. Infinity and NaN are not valid ExactThreeDecimals values",
			severity: "requirement",
		})
	}

	if (_isExactThreeDecimals(n)) {
		return ok(n as ExactThreeDecimals)
	}

	return error({
		code: "EXACT_THREE_DECIMALS_PRECISION_EXCEEDED",
		field: "exactThreeDecimals",
		messages: ["The system needs a number with at most 3 decimal places."],
		received: n,
		expected: "Number with at most 3 decimal places",
		suggestion:
			"Round your value to 3 decimal places. For example: 1.234 instead of 1.23456",
		severity: "requirement",
	})
}
