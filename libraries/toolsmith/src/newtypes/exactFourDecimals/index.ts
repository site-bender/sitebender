import type { Result } from "@sitebender/toolsmith/types/fp/result/index.ts"
import type { ValidationError } from "@sitebender/toolsmith/types/ValidationError/index.ts"
import type { ExactFourDecimals } from "@sitebender/toolsmith/types/branded/index.ts"

import error from "@sitebender/toolsmith/monads/result/error/index.ts"
import ok from "@sitebender/toolsmith/monads/result/ok/index.ts"
import _isExactFourDecimals from "@sitebender/toolsmith/newtypes/exactFourDecimals/_isExactFourDecimals/index.ts"

//++ Smart constructor that validates and creates an ExactFourDecimals value - returns Result with helpful error on failure
export default function exactFourDecimals(
	n: number,
): Result<ValidationError, ExactFourDecimals> {
	if (!Number.isFinite(n)) {
		return error({
			code: "EXACT_FOUR_DECIMALS_NOT_FINITE",
			field: "exactFourDecimals",
			messages: [
				"The system needs a finite number with exactly 4 decimal places.",
			],
			received: n,
			expected: "Finite number with at most 4 decimal places",
			suggestion:
				"Use a finite number like 19.9999 or 0.0001. Infinity and NaN are not valid. For exact arithmetic with 4 decimal places.",
			severity: "requirement",
		})
	}

	if (_isExactFourDecimals(n)) {
		return ok(n as ExactFourDecimals)
	}

	return error({
		code: "EXACT_FOUR_DECIMALS_PRECISION_EXCEEDED",
		field: "exactFourDecimals",
		messages: [
			"The system needs a number with at most 4 decimal places.",
		],
		received: n,
		expected: "Number with at most 4 decimal places",
		suggestion:
			"Use a number with at most 4 decimal places (e.g., 19.9999, 10.543, 100). For 8 decimal places, use ExactEightDecimals instead.",
		severity: "requirement",
	})
}
