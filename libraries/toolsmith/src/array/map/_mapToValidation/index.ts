import type { Validation, ValidationError } from "../../../types/fp/validation/index.ts"

import failure from "../../../monads/validation/failure/index.ts"
import success from "../../../monads/validation/success/index.ts"
import isArray from "../../../predicates/isArray/index.ts"
import isFunction from "../../../predicates/isFunction/index.ts"

//++ Private helper that maps over an array and returns a Validation
export default function _mapToValidation<T, U>(f: (arg: T, index?: number) => U) {
	return function _mapToValidationWithFunction(
		array: ReadonlyArray<T>,
	): Validation<ValidationError, ReadonlyArray<U>> {
		if (isFunction(f)) {
			// Happy path: function and array are valid, map it
			if (isArray(array)) {
				return success(array.map(f))
			}

			// Fallback: return ValidationError wrapped in failure
			return failure([{
				code: 'INVALID_ARRAY',
				field: 'array',
				messages: ['Expected array but received invalid input'],
				received: typeof array,
				expected: 'Array',
				suggestion: 'Provide a valid array to map over',
				severity: 'requirement' as const
			}])
		}

		// Fallback: return ValidationError wrapped in failure
		return failure([{
			code: 'INVALID_FUNCTION',
			field: 'function',
			messages: ['Expected function but received invalid input'],
			received: typeof f,
			expected: 'Function',
			suggestion: 'Provide a valid function to map with',
			severity: 'requirement' as const
		}])
	}
}
