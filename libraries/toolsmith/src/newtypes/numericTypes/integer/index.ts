import type { Result } from "@sitebender/toolsmith/types/fp/result/index.ts"
import type { ValidationError } from "@sitebender/toolsmith/types/validation/index.ts"
import type { Integer } from "@sitebender/toolsmith/types/branded/index.ts"

import ok from "@sitebender/toolsmith/monads/result/ok/index.ts"
import error from "@sitebender/toolsmith/monads/result/error/index.ts"
import isInteger from "@sitebender/toolsmith/validation/isInteger/index.ts"
import {
	MAX_SAFE_INTEGER,
	MIN_SAFE_INTEGER,
} from "@sitebender/toolsmith/newtypes/constants/index.ts"

//++ Smart constructor that validates and creates an Integer - returns Result with helpful error on failure
export default function integer(n: number): Result<ValidationError, Integer> {
	if (isInteger(n)) {
		return ok(n as Integer)
	}

	return error({
		code: "INTEGER_NOT_SAFE",
		field: "integer",
		messages: [
			"The system needs a whole number within the safe integer range.",
		],
		received: n,
		expected: "Safe integer",
		suggestion:
			"Use a whole number between -9,007,199,254,740,991 and 9,007,199,254,740,991",
		constraints: {
			min: MIN_SAFE_INTEGER,
			max: MAX_SAFE_INTEGER,
		},
		severity: "requirement",
	})
}
