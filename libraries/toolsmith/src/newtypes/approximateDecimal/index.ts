import type { Result } from "@sitebender/toolsmith/types/fp/result/index.ts"
import type { ValidationError } from "@sitebender/toolsmith/types/ValidationError/index.ts"
import type { ApproximateDecimal } from "@sitebender/toolsmith/types/branded/index.ts"

import error from "@sitebender/toolsmith/monads/result/error/index.ts"
import ok from "@sitebender/toolsmith/monads/result/ok/index.ts"
import _isApproximateDecimal from "@sitebender/toolsmith/newtypes/approximateDecimal/_isApproximateDecimal/index.ts"

//++ Smart constructor that validates and creates an ApproximateDecimal - returns Result with helpful error on failure
//++ WARNING: ApproximateDecimal uses floating point arithmetic and is subject to imprecision (e.g., 0.1 + 0.2 ≠ 0.3)
export default function approximateDecimal(
	n: number,
): Result<ValidationError, ApproximateDecimal> {
	if (_isApproximateDecimal(n)) {
		return ok(n as ApproximateDecimal)
	}

	return error({
		code: "APPROXIMATE_DECIMAL_NOT_FINITE",
		field: "approximateDecimal",
		messages: [
			"The system needs a finite number for approximate decimal calculations.",
		],
		received: n,
		expected: "Finite number",
		suggestion:
			"Use a finite number. Infinity, -Infinity, and NaN are not valid. Note: This type uses floating point arithmetic and may have precision issues. For exact decimal arithmetic, use ExactTwoDecimals, ExactFourDecimals, etc.",
		severity: "requirement",
	})
}
