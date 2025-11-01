import type { Result } from "@sitebender/toolsmith/types/fp/result/index.ts"
import type { ValidationError } from "@sitebender/toolsmith/types/fp/validation/index.ts"
import type { NonEmptyString } from "@sitebender/toolsmith/types/branded/index.ts"

import error from "@sitebender/toolsmith/monads/result/error/index.ts"
import ok from "@sitebender/toolsmith/monads/result/ok/index.ts"
import unsafeNonEmptyString from "@sitebender/toolsmith/newtypes/stringTypes/nonEmptyString/unsafeNonEmptyString/index.ts"

//++ Smart constructor that validates and creates a NonEmptyString value
//++ Validates that string contains at least one character after trimming whitespace
export default function nonEmptyString(
	value: string,
): Result<ValidationError, NonEmptyString> {
	//++ [EXCEPTION] .trim() permitted in Toolsmith for performance - provides NonEmptyString validation wrapper
	const trimmed = value.trim()

	//++ [EXCEPTION] .length and === permitted in Toolsmith for performance - provides NonEmptyString validation wrapper
	if (trimmed.length === 0) {
		return error({
			code: "NON_EMPTY_STRING_EMPTY",
			field: "nonEmptyString",
			messages: ["The system needs a non-empty string with at least one character."],
			received: value,
			expected: "Non-empty string with at least one non-whitespace character",
			suggestion: "Provide a string with visible content like 'Hello' or 'A'",
			severity: "requirement",
		})
	}

	return ok(unsafeNonEmptyString(trimmed))
}

//++ Export the NonEmptyString branded type
export type { NonEmptyString }
