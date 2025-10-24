import type { Result } from "../../../types/fp/result/index.ts"
import type { ValidationError } from "../../../types/fp/validation/index.ts"

import error from "../../../monads/result/error/index.ts"
import ok from "../../../monads/result/ok/index.ts"
import isString from "../../../predicates/isString/index.ts"

//++ Private helper that trims whitespace from string and returns a Result
export default function _trimToResult(
	input: string,
): Result<ValidationError, string> {
	// Happy path: input is valid string, trim it
	if (isString(input)) {
		/*++
		 + [EXCEPTION] .trim is permitted here for performance reasons
		 + This is the ONLY place .trim should be used
		 + Everywhere else, use the `trim` function instead
		 */
		return ok(input.trim())
	}

	// Fallback: return ValidationError wrapped in error
	return error({
		code: "TRIM_INVALID_INPUT",
		field: "input",
		messages: ["Expected string but received invalid input"],
		received: typeof input,
		expected: "String",
		suggestion: "Provide a valid string to trim",
		severity: "requirement" as const,
	})
}
