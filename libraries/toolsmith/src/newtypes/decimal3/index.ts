import type { Result } from "@sitebender/toolsmith/types/fp/result/index.ts"
import type { ValidationError } from "@sitebender/toolsmith/types/ValidationError/index.ts"
import type { Decimal3 } from "@sitebender/toolsmith/types/branded/index.ts"

import ok from "@sitebender/toolsmith/monads/result/ok/index.ts"
import error from "@sitebender/toolsmith/monads/result/error/index.ts"
import _isDecimal3 from "@sitebender/toolsmith/newtypes/decimal3/_isDecimal3/index.ts"

//++ Smart constructor that validates and creates a Decimal3 - returns Result with helpful error on failure
export default function decimal3(n: number): Result<ValidationError, Decimal3> {
	if (!Number.isFinite(n)) {
		return error({
			code: "DECIMAL3_NOT_FINITE",
			field: "decimal3",
			messages: ["The system needs a finite number with at most 3 decimal places."],
			received: n,
			expected: "Finite number with at most 3 decimal places",
			suggestion:
				"Use a finite number like 123.456, 0.123, or -99.999. Infinity and NaN are not valid Decimal3 values",
			severity: "requirement",
		})
	}

	if (_isDecimal3(n)) {
		return ok(n as Decimal3)
	}

	return error({
		code: "DECIMAL3_PRECISION_EXCEEDED",
		field: "decimal3",
		messages: ["The system needs a number with at most 3 decimal places."],
		received: n,
		expected: "Number with at most 3 decimal places",
		suggestion:
			"Round your value to 3 decimal places. For example: 1.234 instead of 1.23456",
		severity: "requirement",
	})
}
