import type { Result } from "@sitebender/toolsmith/types/fp/result/index.ts"
import type { ValidationError } from "@sitebender/toolsmith/types/fp/validation/index.ts"

import error from "@sitebender/toolsmith/monads/result/error/index.ts"
import ok from "@sitebender/toolsmith/monads/result/ok/index.ts"
import isArray from "../../../predicates/isArray/index.ts"
import isFunction from "@sitebender/toolsmith/predicates/isFunction/index.ts"

/*++
 + TOOLSMITH EXAMPLE: Ternary Curried Helper with Result Monad
 +
 + This example demonstrates:
 + - Ternary currying with Result monad return
 + - Using native .reduce() inside ok()
 + - Three levels of nesting for three parameters
 + - Structured error handling at each validation point
 +
 + PATTERN: Ternary + monadic = three levels + Result wrapping
 + ERROR HANDLING: Return Result<ValidationError, U>
 + FAIL-FAST: First error stops processing (Result monad behavior)
 +
 + Private helper that reduces an array and returns a Result
 */
export default function _reduceToResult<T, U>(
	fn: (accumulator: U, item: T) => U,
) {
	/*++
	 + CURRYING LEVEL 1: Capture reducer function
	 */
	return function _reduceToResultWithFunction(initial: U) {
		/*++
		 + CURRYING LEVEL 2: Capture initial value
		 */
		return function _reduceToResultWithFunctionAndInitial(
			array: ReadonlyArray<T>,
		): Result<ValidationError, U> {
			/*++
			 + CURRYING LEVEL 3: Take array and return Result
			 +
			 + Same validation pattern as _mapToResult, but for reduce
			 */

			if (isFunction(fn)) {
				// Happy path: function and array are valid, reduce it
				if (isArray<T>(array)) {
					/*++
					 + [EXCEPTION] Using native .reduce() inside Result monad
					 +
					 + PATTERN: ok(array.reduce(fn, initial))
					 + - array.reduce(fn, initial) does the reduction
					 + - ok() wraps result in Result monad
					 + - Caller gets Result<ValidationError, U>
					 +
					 + TERNARY PARAMETERS:
					 + - fn: from outer-most closure (level 1)
					 + - initial: from middle closure (level 2)
					 + - array: current parameter (level 3)
					 */
					const reduced = array.reduce<U>(fn, initial)
					return ok(reduced)
				}

				/*++
				 + INVALID ARRAY PATH: Return ValidationError in error monad
				 */
				return error({
					code: "REDUCE_INVALID_INPUT",
					field: "array",
					messages: ["Expected array but received invalid input"],
					received: typeof array,
					expected: "Array",
					suggestion: "Provide a valid array to reduce over",
					severity: "requirement" as const,
				})
			}

			/*++
			 + INVALID FUNCTION PATH: Return ValidationError in error monad
			 */
			return error({
				code: "REDUCE_INVALID_FUNCTION",
				field: "function",
				messages: ["Expected function but received invalid input"],
				received: typeof fn,
				expected: "Function",
				suggestion: "Provide a valid function to reduce with",
				severity: "requirement" as const,
			})
		}
	}
}

//++ Example usage (internal only):
//++
//++ const sum = (acc: number, n: number) => acc + n
//++
//++ // Valid input:
//++ const result = _reduceToResult(sum)(0)([1, 2, 3])
//++ // Result: Ok(6)
//++
//++ // Invalid array:
//++ const invalidResult = _reduceToResult(sum)(0)(null as any)
//++ // Result: Error({ code: 'REDUCE_INVALID_INPUT', ... })
//++
//++ // Invalid function:
//++ const badResult = _reduceToResult(null as any)(0)([1, 2, 3])
//++ // Result: Error({ code: 'REDUCE_INVALID_FUNCTION', ... })
