import type { Result } from "@sitebender/toolsmith/types/fp/result/index.ts"
import type { ValidationError } from "@sitebender/toolsmith/types/fp/validation/index.ts"

import error from "@sitebender/toolsmith/monads/result/error/index.ts"
import ok from "@sitebender/toolsmith/monads/result/ok/index.ts"
import isArray from "../../../predicates/isArray/index.ts"
import isFunction from "@sitebender/toolsmith/predicates/isFunction/index.ts"

/*++
 + TOOLSMITH EXAMPLE: Private Helper Returning Result Monad
 +
 + This example demonstrates:
 + - Private helper for Result monad path
 + - Using native .map() inside ok()
 + - Creating ValidationError on invalid input
 + - Error vs Ok path handling
 +
 + PATTERN: Helpers for monadic paths wrap native operations in monads
 + ERROR HANDLING: Return structured ValidationError, never throw
 + FAIL-FAST: Result monad stops on first error
 +
 + Private helper that maps over an array and returns a Result
 */
export default function _mapToResult<T, U>(f: (arg: T, index?: number) => U) {
	return function _mapToResultWithFunction(
		array: ReadonlyArray<T>,
	): Result<ValidationError, ReadonlyArray<U>> {
		/*++
		 + VALIDATION PATTERN: Check function first (more likely to be invalid)
		 +
		 + We validate in stages to provide specific error messages.
		 + This helps consuming code understand what went wrong.
		 */

		if (isFunction(f)) {
			// Happy path: function and array are valid, map it
			if (isArray(array)) {
				/*++
				 + [EXCEPTION] Using native .map() inside Result monad
				 +
				 + WHY: We wrap the native operation in ok() to provide monadic behavior.
				 + The native .map() does the work, we add error handling.
				 +
				 + PATTERN: ok(array.map(f))
				 + - array.map(f) does the transformation
				 + - ok() wraps result in Result monad
				 + - Caller gets Result<ValidationError, ReadonlyArray<U>>
				 */
				return ok(array.map(f))
			}

			/*++
			 + INVALID ARRAY PATH: Return ValidationError wrapped in error
			 +
			 + ValidationError structure provides rich information:
			 + - code: Machine-readable error code
			 + - field: Which field/parameter caused the error
			 + - messages: Human-readable error messages
			 + - received: What was actually received (for debugging)
			 + - expected: What was expected
			 + - suggestion: How to fix the problem
			 + - severity: 'requirement' | 'warning' | 'info'
			 */
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

		/*++
		 + INVALID FUNCTION PATH: Return ValidationError wrapped in error
		 +
		 + Similar structure to invalid array error, but for function parameter.
		 + This enables consuming code to distinguish between different error causes.
		 */
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

//++ Example usage (internal only):
//++
//++ const double = (x: number) => x * 2
//++ const mapper = _mapToResult(double)
//++
//++ // Valid input:
//++ const result = mapper([1, 2, 3])
//++ // Result: Ok([2, 4, 6])
//++
//++ // Invalid array:
//++ const invalidResult = mapper(null as any)
//++ // Result: Error({ code: 'INVALID_ARRAY', ... })
//++
//++ // Invalid function:
//++ const badMapper = _mapToResult(null as any)
//++ const errorResult = badMapper([1, 2, 3])
//++ // Result: Error({ code: 'INVALID_FUNCTION', ... })
