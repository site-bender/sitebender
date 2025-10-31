import type { Validation, ValidationError } from "@sitebender/toolsmith/types/fp/validation/index.ts"

import failure from "@sitebender/toolsmith/monads/validation/failure/index.ts"
import success from "@sitebender/toolsmith/monads/validation/success/index.ts"
import isArray from "../../../predicates/isArray/index.ts"
import isFunction from "@sitebender/toolsmith/predicates/isFunction/index.ts"

/*++
 + TOOLSMITH EXAMPLE: Ternary Curried Helper with Validation Monad
 +
 + This example demonstrates:
 + - Ternary currying with Validation monad return
 + - Using native .reduce() inside success()
 + - Wrapping errors in arrays for accumulation
 + - Complete ternary + monadic pattern
 +
 + PATTERN: Ternary + Validation = three levels + error accumulation
 + ERROR HANDLING: Return Validation<ValidationError, U>
 + ERROR ACCUMULATION: Errors wrapped in arrays (not single error)
 +
 + Private helper that reduces an array and returns a Validation
 */
export default function _reduceToValidation<T, U>(
	fn: (accumulator: U, item: T) => U,
) {
	/*++
	 + CURRYING LEVEL 1: Capture reducer function
	 */
	return function _reduceToValidationWithFunction(initial: U) {
		/*++
		 + CURRYING LEVEL 2: Capture initial value
		 */
		return function _reduceToValidationWithFunctionAndInitial(
			array: ReadonlyArray<T>,
		): Validation<ValidationError, U> {
			/*++
			 + CURRYING LEVEL 3: Take array and return Validation
			 +
			 + Same validation as _reduceToResult, but wraps errors in arrays
			 */

			if (isFunction(fn)) {
				// Happy path: function and array are valid, reduce it
				if (isArray<T>(array)) {
					/*++
					 + [EXCEPTION] Using native .reduce() inside Validation monad
					 +
					 + PATTERN: success(array.reduce(fn, initial))
					 + - array.reduce(fn, initial) does the reduction
					 + - success() wraps result in Validation monad
					 + - Caller gets Validation<ValidationError, U>
					 +
					 + TERNARY CURRYING COMPLETE:
					 + - fn: from level 1 closure
					 + - initial: from level 2 closure
					 + - array: current parameter (level 3)
					 + - All three available for .reduce()
					 */
					const reduced = array.reduce<U>(fn, initial)
					return success(reduced)
				}

				/*++
				 + INVALID ARRAY PATH: Return ValidationError in failure monad
				 +
				 + KEY: failure([error]) - array wrapper for error accumulation
				 */
				return failure([
					{
						code: "REDUCE_INVALID_INPUT",
						field: "array",
						messages: ["Expected array but received invalid input"],
						received: typeof array,
						expected: "Array",
						suggestion: "Provide a valid array to reduce over",
						severity: "requirement" as const,
					},
				])
			}

			/*++
			 + INVALID FUNCTION PATH: Return ValidationError in failure monad
			 +
			 + Again: failure([error]) - array enables multiple error accumulation
			 */
			return failure([
				{
					code: "REDUCE_INVALID_FUNCTION",
					field: "function",
					messages: ["Expected function but received invalid input"],
					received: typeof fn,
					expected: "Function",
					suggestion: "Provide a valid function to reduce with",
					severity: "requirement" as const,
				},
			])
		}
	}
}

//++ Example usage (internal only):
//++
//++ const sum = (acc: number, n: number) => acc + n
//++
//++ // Valid input:
//++ const result = _reduceToValidation(sum)(0)([1, 2, 3])
//++ // Result: Success(6)
//++
//++ // Invalid array:
//++ const invalidResult = _reduceToValidation(sum)(0)(null as any)
//++ // Result: Failure([{ code: 'REDUCE_INVALID_INPUT', ... }])
//++
//++ // Note the array wrapper - enables accumulation with other validators:
//++ // combineValidations([validator1, validator2, validator3])
//++ // Can collect: Failure([error1, error2, error3])
