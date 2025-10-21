import type { Result } from "@sitebender/toolsmith/types/fp/result/index.ts"
import type { ValidationError } from "@sitebender/toolsmith/types/validation/index.ts"
import type { ThreeDecimalPlaces } from "@sitebender/toolsmith/types/branded/index.ts"

import ok from "@sitebender/toolsmith/monads/result/ok/index.ts"
import error from "@sitebender/toolsmith/monads/result/error/index.ts"
import isThreeDecimalPlaces from "@sitebender/toolsmith/validation/isThreeDecimalPlaces/index.ts"

//++ Smart constructor that validates and creates a ThreeDecimalPlaces - returns Result with helpful error on failure
export default function threeDecimalPlaces(
	n: number,
): Result<ValidationError, ThreeDecimalPlaces> {
	if (!Number.isFinite(n)) {
		return error({
			code: "THREE_DECIMAL_PLACES_NOT_FINITE",
			field: "threeDecimalPlaces",
			messages: [
				"The system needs a finite number with at most 3 decimal places.",
			],
			received: n,
			expected: "Finite number with at most 3 decimal places",
			suggestion:
				"Use a finite number like 123.456, 0.123, or -99.999. Infinity and NaN are not valid ThreeDecimalPlaces values",
			severity: "requirement",
		})
	}

	if (isThreeDecimalPlaces(n)) {
		return ok(n as ThreeDecimalPlaces)
	}

	return error({
		code: "THREE_DECIMAL_PLACES_PRECISION_EXCEEDED",
		field: "threeDecimalPlaces",
		messages: ["The system needs a number with at most 3 decimal places."],
		received: n,
		expected: "Number with at most 3 decimal places",
		suggestion:
			"Round your value to 3 decimal places. For example: 1.234 instead of 1.23456",
		severity: "requirement",
	})
}
