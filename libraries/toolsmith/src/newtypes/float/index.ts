import type { Result } from "@sitebender/toolsmith/types/fp/result/index.ts"
import type { ValidationError } from "@sitebender/toolsmith/types/ValidationError/index.ts"
import type { Float } from "@sitebender/toolsmith/types/branded/index.ts"

import ok from "@sitebender/toolsmith/monads/result/ok/index.ts"
import error from "@sitebender/toolsmith/monads/result/error/index.ts"
import _isFloat from "@sitebender/toolsmith/newtypes/float/_isFloat/index.ts"

//++ Smart constructor that validates and creates a Float - returns Result with helpful error on failure
export default function float(n: number): Result<ValidationError, Float> {
	if (_isFloat(n)) {
		return ok(n)
	}

	return error({
		code: "FLOAT_NOT_FINITE",
		field: "float",
		messages: ["The system needs a finite number."],
		received: n,
		expected: "Finite number",
		suggestion:
			"Use a finite number. Infinity, -Infinity, and NaN are not valid float values",
		severity: "requirement",
	})
}
