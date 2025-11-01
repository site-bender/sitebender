import type {
	Validation,
	ValidationError,
} from "../../../types/fp/validation/index.ts"

import failure from "../../../monads/validation/failure/index.ts"
import success from "../../../monads/validation/success/index.ts"
import isArray from "../../../predicates/isArray/index.ts"
import isFunction from "../../../predicates/isFunction/index.ts"

//++ Private helper that flatMaps over an array and returns a Validation
export default function _flatMapToValidation<T, U>(
	f: (arg: T, index?: number) => ReadonlyArray<U>,
) {
	return function _flatMapToValidationWithFunction(
		array: ReadonlyArray<T>,
	): Validation<ValidationError, ReadonlyArray<U>> {
		if (isFunction(f)) {
			// Happy path: function and array are valid, flatMap it
			if (isArray(array)) {
				//++ [EXCEPTION] .flatMap() permitted in Toolsmith for performance - provides curried flatMap wrapper
				return success(array.flatMap(f) as ReadonlyArray<U>)
			}

			// Fallback: return ValidationError wrapped in failure
			return failure([{
				code: "INVALID_ARRAY",
				field: "array",
				messages: ["Expected array but received invalid input"],
				received: typeof array,
				expected: "Array",
				suggestion: "Provide a valid array to flatMap over",
				severity: "requirement" as const,
			}])
		}

		// Fallback: return ValidationError wrapped in failure
		return failure([{
			code: "INVALID_FUNCTION",
			field: "function",
			messages: ["Expected function but received invalid input"],
			received: typeof f,
			expected: "Function",
			suggestion: "Provide a valid function to flatMap with",
			severity: "requirement" as const,
		}])
	}
}
