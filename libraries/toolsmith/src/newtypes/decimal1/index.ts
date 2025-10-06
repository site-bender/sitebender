import type { Result } from "@sitebender/toolsmith/types/fp/result/index.ts"
import type { ValidationError } from "@sitebender/toolsmith/types/ValidationError/index.ts"
import type { Decimal1 } from "@sitebender/toolsmith/types/branded/index.ts"

import ok from "@sitebender/toolsmith/monads/result/ok/index.ts"
import error from "@sitebender/toolsmith/monads/result/error/index.ts"
import _isDecimal1 from "@sitebender/toolsmith/newtypes/decimal1/_isDecimal1/index.ts"

//++ Smart constructor that validates and creates a Decimal1 - returns Result with helpful error on failure
export default function decimal1(n: number): Result<ValidationError, Decimal1> {
	if (!Number.isFinite(n)) {
		return error({
			code: "DECIMAL1_NOT_FINITE",
			field: "decimal1",
			messages: ["The system needs a finite number with at most 1 decimal place."],
			received: n,
			expected: "Finite number with at most 1 decimal place",
			suggestion:
				"Use a finite number like 10.5, 0.1, or -19.9. Infinity and NaN are not valid Decimal1 values",
			severity: "requirement",
		})
	}

	if (_isDecimal1(n)) {
		return ok(n as Decimal1)
	}

	return error({
		code: "DECIMAL1_PRECISION_EXCEEDED",
		field: "decimal1",
		messages: ["The system needs a number with at most 1 decimal place."],
		received: n,
		expected: "Number with at most 1 decimal place",
		suggestion:
			"Round your value to 1 decimal place. For example: 10.5 instead of 10.55",
		severity: "requirement",
	})
}
