import type { Result } from "@sitebender/toolsmith/types/fp/result/index.ts"
import type { ValidationError } from "@sitebender/toolsmith/types/ValidationError/index.ts"
import type { Decimal0 } from "@sitebender/toolsmith/types/branded/index.ts"

import ok from "@sitebender/toolsmith/monads/result/ok/index.ts"
import error from "@sitebender/toolsmith/monads/result/error/index.ts"
import _isDecimal0 from "@sitebender/toolsmith/newtypes/decimal0/_isDecimal0/index.ts"

//++ Smart constructor that validates and creates a Decimal0 - returns Result with helpful error on failure
export default function decimal0(n: number): Result<ValidationError, Decimal0> {
	if (!Number.isFinite(n)) {
		return error({
			code: "DECIMAL0_NOT_FINITE",
			field: "decimal0",
			messages: ["The system needs a finite whole number."],
			received: n,
			expected: "Finite whole number",
			suggestion:
				"Use a finite whole number like 100, 0, or -50. Infinity and NaN are not valid Decimal0 values",
			severity: "requirement",
		})
	}

	if (_isDecimal0(n)) {
		return ok(n as Decimal0)
	}

	return error({
		code: "DECIMAL0_HAS_DECIMALS",
		field: "decimal0",
		messages: ["The system needs a whole number with 0 decimal places."],
		received: n,
		expected: "Whole number with 0 decimal places",
		suggestion:
			"Use a whole number without decimal places (e.g., 100, 0, -50). For values with 1 decimal place, use the Decimal1 type instead",
		severity: "requirement",
	})
}
