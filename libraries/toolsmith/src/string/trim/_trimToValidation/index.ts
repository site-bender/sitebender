import type {
	Validation,
	ValidationError,
} from "../../../types/fp/validation/index.ts"

import failure from "../../../monads/validation/failure/index.ts"
import success from "../../../monads/validation/success/index.ts"
import isString from "../../../predicates/isString/index.ts"

//++ Private helper that trims whitespace from string and returns a Validation
export default function _trimToValidation(
	input: string,
): Validation<ValidationError, string> {
	// Happy path: input is valid string, trim it
	if (isString(input)) {
		/*++
		 + [EXCEPTION] .trim is permitted here for performance reasons
		 + This is the ONLY place .trim should be used
		 + Everywhere else, use the `trim` function instead
		 */
		return success(input.trim())
	}

	// Fallback: return ValidationError wrapped in failure
	return failure([
		{
			code: "TRIM_INVALID_INPUT",
			field: "input",
			messages: ["Expected string but received invalid input"],
			received: typeof input,
			expected: "String",
			suggestion: "Provide a valid string to trim",
			severity: "requirement" as const,
		},
	])
}
