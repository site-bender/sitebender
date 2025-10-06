import type { Result } from "@sitebender/toolsmith/types/fp/result/index.ts"
import type { ValidationError } from "@sitebender/toolsmith/types/ValidationError/index.ts"
import type { Currency } from "@sitebender/toolsmith/types/branded/index.ts"

import ok from "@sitebender/toolsmith/monads/result/ok/index.ts"
import error from "@sitebender/toolsmith/monads/result/error/index.ts"
import _isCurrency from "@sitebender/toolsmith/newtypes/currency/_isCurrency/index.ts"

//++ Smart constructor that validates and creates a Currency - returns Result with helpful error on failure
export default function currency(n: number): Result<ValidationError, Currency> {
	if (!Number.isFinite(n)) {
		return error({
			code: "CURRENCY_NOT_FINITE",
			field: "currency",
			messages: ["The system needs a finite currency amount."],
			received: n,
			expected: "Finite currency amount",
			suggestion:
				"Use a finite number like 19.99 or 0.01. Infinity and NaN are not valid currency values",
			severity: "requirement",
		})
	}

	if (_isCurrency(n)) {
		return ok(n as Currency)
	}

	return error({
		code: "CURRENCY_PRECISION_EXCEEDED",
		field: "currency",
		messages: ["The system needs a currency amount with at most 2 decimal places."],
		received: n,
		expected: "Currency amount with at most 2 decimal places",
		suggestion:
			"Use a number with at most 2 decimal places (e.g., 19.99, 10.5, 100). For values with 3 decimal places, use the Decimal3 type instead",
		severity: "requirement",
	})
}
