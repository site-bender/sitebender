import type {
	Validation,
	ValidationError,
} from "../../../types/fp/validation/index.ts"

import failure from "../../../monads/validation/failure/index.ts"
import success from "../../../monads/validation/success/index.ts"
import isString from "../../../predicates/isString/index.ts"
import isRegExp from "../../../predicates/isRegExp/index.ts"
import or from "../../../logic/or/index.ts"

//++ Private helper that replaces pattern in string and returns a Validation
export default function _replaceToValidation(pattern: RegExp | string) {
	return function _replaceToValidationWithPattern(replacement: string) {
		return function _replaceToValidationWithPatternAndReplacement(
			input: string,
		): Validation<ValidationError, string> {
			if (or(isString(pattern))(isRegExp(pattern))) {
				if (isString(replacement)) {
					// Happy path: pattern, replacement and input are valid
					if (isString(input)) {
						/*++
						 + [EXCEPTION] .replace is permitted here for performance reasons
						 + This is the ONLY place .replace should be used
						 + Everywhere else, use the `replace` function instead
						 */
						return success(input.replace(pattern, replacement))
					}

					// Fallback: return ValidationError wrapped in failure
					return failure([
						{
							code: "REPLACE_INVALID_INPUT",
							field: "input",
							messages: ["Expected string but received invalid input"],
							received: typeof input,
							expected: "String",
							suggestion: "Provide a valid string to replace in",
							severity: "requirement" as const,
						},
					])
				}

				// Fallback: return ValidationError wrapped in failure
				return failure([
					{
						code: "REPLACE_INVALID_REPLACEMENT",
						field: "replacement",
						messages: ["Expected string but received invalid input"],
						received: typeof replacement,
						expected: "String",
						suggestion: "Provide a valid string replacement",
						severity: "requirement" as const,
					},
				])
			}

			// Fallback: return ValidationError wrapped in failure
			return failure([
				{
					code: "REPLACE_INVALID_PATTERN",
					field: "pattern",
					messages: ["Expected string or RegExp but received invalid input"],
					received: typeof pattern,
					expected: "String or RegExp",
					suggestion: "Provide a valid string or RegExp pattern",
					severity: "requirement" as const,
				},
			])
		}
	}
}
