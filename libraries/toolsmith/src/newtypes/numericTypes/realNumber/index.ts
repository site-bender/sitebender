import type { Result } from "../../../types/fp/result/index.ts"
import type { ValidationError } from "../../../types/fp/validation/index.ts"
import type { RealNumber } from "../../../types/branded/index.ts"

import error from "../../../monads/result/error/index.ts"
import ok from "../../../monads/result/ok/index.ts"
import isRealNumber from "../../../predicates/isRealNumber/index.ts"

//++ Smart constructor that validates and creates a RealNumber - returns Result with helpful error on failure
//++ WARNING: RealNumber uses floating point arithmetic and is subject to imprecision (e.g., 0.1 + 0.2 ≠ 0.3)
export default function realNumber(
	n: number,
): Result<ValidationError, RealNumber> {
	if (isRealNumber(n)) {
		return ok(n as RealNumber)
	}

	return error({
		code: "REAL_NUMBER_NOT_FINITE",
		field: "realNumber",
		messages: [
			"The system needs a finite number for real number calculations.",
		],
		received: n,
		expected: "Finite number",
		suggestion:
			"Use a finite number. Infinity, -Infinity, and NaN are not valid. Note: This type uses floating point arithmetic and may have precision issues. For exact decimal arithmetic, use TwoDecimalPlaces, FourDecimalPlaces, etc.",
		severity: "requirement",
	})
}
