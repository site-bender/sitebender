import type { Result } from "@sitebender/toolsmith/types/fp/result/index.ts"
import type { ValidationError } from "@sitebender/toolsmith/types/validation/index.ts"
import type { OneDecimalPlace } from "@sitebender/toolsmith/types/branded/index.ts"

import error from "@sitebender/toolsmith/monads/result/error/index.ts"
import ok from "@sitebender/toolsmith/monads/result/ok/index.ts"
import _isOneDecimalPlace from "@sitebender/toolsmith/newtypes/oneDecimalPlace/_isOneDecimalPlace/index.ts"

//++ Smart constructor that validates and creates an OneDecimalPlace value - returns Result with helpful error on failure
export default function oneDecimalPlace(
	n: number,
): Result<ValidationError, OneDecimalPlace> {
	if (!Number.isFinite(n)) {
		return error({
			code: "ONE_DECIMAL_PLACE_NOT_FINITE",
			field: "oneDecimalPlace",
			messages: [
				"The system needs a finite number with at most 1 decimal place.",
			],
			received: n,
			expected: "Finite number with at most 1 decimal place",
			suggestion:
				"Use a finite number like 10.5, 0.1, or -19.9. Infinity and NaN are not valid.",
			severity: "requirement",
		})
	}

	if (_isOneDecimalPlace(n)) {
		return ok(n as OneDecimalPlace)
	}

	return error({
		code: "ONE_DECIMAL_PLACE_PRECISION_EXCEEDED",
		field: "oneDecimalPlace",
		messages: ["The system needs a number with at most 1 decimal place."],
		received: n,
		expected: "Number with at most 1 decimal place",
		suggestion:
			"Round your value to 1 decimal place. For example: 10.5 instead of 10.55",
		severity: "requirement",
	})
}
