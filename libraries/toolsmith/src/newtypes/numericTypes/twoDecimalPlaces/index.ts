import type { Result } from "@sitebender/toolsmith/types/fp/result/index.ts"
import type { ValidationError } from "@sitebender/toolsmith/types/validation/index.ts"
import type { TwoDecimalPlaces } from "@sitebender/toolsmith/types/branded/index.ts"

import error from "@sitebender/toolsmith/monads/result/error/index.ts"
import ok from "@sitebender/toolsmith/monads/result/ok/index.ts"
import _isTwoDecimalPlaces from "@sitebender/toolsmith/newtypes/twoDecimalPlaces/_isTwoDecimalPlaces/index.ts"

//++ Smart constructor that validates and creates an TwoDecimalPlaces value - returns Result with helpful error on failure
//++ Commonly used for monetary amounts but not limited to currency
export default function twoDecimalPlaces(
	n: number,
): Result<ValidationError, TwoDecimalPlaces> {
	if (!Number.isFinite(n)) {
		return error({
			code: "TWO_DECIMAL_PLACES_NOT_FINITE",
			field: "twoDecimalPlaces",
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

	if (_isTwoDecimalPlaces(n)) {
		return ok(n as TwoDecimalPlaces)
	}

	return error({
		code: "TWO_DECIMAL_PLACES_PRECISION_EXCEEDED",
		field: "twoDecimalPlaces",
		messages: [
			"The system needs a number with at most 2 decimal places.",
		],
		received: n,
		expected: "Number with at most 2 decimal places",
		suggestion:
			"Use a number with at most 2 decimal places (e.g., 19.99, 10.5, 100). For 3 decimal places, use ThreeDecimalPlaces instead.",
		severity: "requirement",
	})
}
