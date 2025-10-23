import type { Result } from "../../../types/fp/result/index.ts"
import type { ValidationError } from "../../../types/fp/validation/index.ts"
import type { Value } from "../../../types/index.ts"

import error from "../../../monads/result/error/index.ts"
import ok from "../../../monads/result/ok/index.ts"
import isArray from "../../../predicates/isArray/index.ts"
import isFunction from "../../../predicates/isFunction/index.ts"

type Func<T extends Value = Value> = (arg: T, index?: number) => T

//++ Private helper that maps over an array and returns a Result
export default function _mapToResult<T extends Value>(f: Func<T>) {
	return function _mapToResultWithFunction(array: Array<T>): Result<ValidationError, Array<T>> {
		if (isFunction(f as Func<T>)) {
			// Happy path: function and array are valid, map it
			if (isArray(array)) {
				return ok(array.map(f))
			}

			// Fallback: return ValidationError wrapped in error
			return error({
				code: 'INVALID_ARRAY',
				field: 'array',
				messages: ['Expected array but received invalid input'],
				received: typeof array,
				expected: 'Array',
				suggestion: 'Provide a valid array to map over',
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
			suggestion: 'Provide a valid function to map with',
			severity: 'requirement' as const
		})
	}
}
