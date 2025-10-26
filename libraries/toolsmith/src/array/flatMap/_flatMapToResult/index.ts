import type { Result } from "../../../types/fp/result/index.ts"
import type { ValidationError } from "../../../types/fp/validation/index.ts"

import error from "../../../monads/result/error/index.ts"
import ok from "../../../monads/result/ok/index.ts"
import isArray from "../../../predicates/isArray/index.ts"
import isFunction from "../../../predicates/isFunction/index.ts"

//++ Private helper that flatMaps over an array and returns a Result
export default function _flatMapToResult<T, U>(f: (arg: T, index?: number) => ReadonlyArray<U>) {
	return function _flatMapToResultWithFunction(
		array: ReadonlyArray<T>,
	): Result<ValidationError, ReadonlyArray<U>> {
		if (isFunction(f)) {
			// Happy path: function and array are valid, flatMap it
			if (isArray(array)) {
				return ok(array.flatMap(f) as ReadonlyArray<U>)
			}

			// Fallback: return ValidationError wrapped in error
			return error({
				code: 'INVALID_ARRAY',
				field: 'array',
				messages: ['Expected array but received invalid input'],
				received: typeof array,
				expected: 'Array',
				suggestion: 'Provide a valid array to flatMap over',
				severity: 'requirement' as const
			})
		}

		// Fallback: return ValidationError wrapped in error
		return error({
			code: 'INVALID_FUNCTION',
			field: 'function',
			messages: ['Expected function but received invalid input'],
			received: typeof f,
			expected: 'Function',
			suggestion: 'Provide a valid function to flatMap with',
			severity: 'requirement' as const
		})
	}
}
