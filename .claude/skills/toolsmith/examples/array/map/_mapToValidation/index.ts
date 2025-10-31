import type { Validation, ValidationError } from "@sitebender/toolsmith/types/fp/validation/index.ts"

import failure from "@sitebender/toolsmith/monads/validation/failure/index.ts"
import success from "@sitebender/toolsmith/monads/validation/success/index.ts"
import isArray from "../../../predicates/isArray/index.ts"
import isFunction from "@sitebender/toolsmith/predicates/isFunction/index.ts"

/*++
 + TOOLSMITH EXAMPLE: Private Helper Returning Validation Monad
 +
 + This example demonstrates:
 + - Private helper for Validation monad path
 + - Using native .map() inside success()
 + - Creating array of ValidationErrors for failure()
 + - Difference between Result (fail-fast) and Validation (accumulation)
 +
 + PATTERN: Validation monad helpers wrap errors in arrays for accumulation
 + ERROR HANDLING: failure() takes array of errors (not single error)
 + ERROR ACCUMULATION: Validation monad collects all errors
 +
 + Private helper that maps over an array and returns a Validation
 */
export default function _mapToValidation<T, U>(f: (arg: T, index?: number) => U) {
	return function _mapToValidationWithFunction(
		array: ReadonlyArray<T>,
	): Validation<ValidationError, ReadonlyArray<U>> {
		/*++
		 + VALIDATION PATTERN: Same validation logic as _mapToResult
		 +
		 + Key difference: We wrap errors in arrays because Validation
		 + monad is designed to accumulate multiple errors.
		 */

		if (isFunction(f)) {
			// Happy path: function and array are valid, map it
			if (isArray(array)) {
				/*++
				 + [EXCEPTION] Using native .map() inside Validation monad
				 +
				 + WHY: We wrap the native operation in success() to provide monadic behavior.
				 + The native .map() does the work, we add error accumulation capability.
				 +
				 + PATTERN: success(array.map(f))
				 + - array.map(f) does the transformation
				 + - success() wraps result in Validation monad
				 + - Caller gets Validation<ValidationError, ReadonlyArray<U>>
				 +
				 + DIFFERENCE FROM RESULT:
				 + - Result monad: ok(value) - single error or success
				 + - Validation monad: success(value) - accumulate errors before reporting
				 */
				return success(array.map(f))
			}

			/*++
			 + INVALID ARRAY PATH: Return ValidationError wrapped in failure
			 +
			 + KEY DIFFERENCE FROM RESULT:
			 + - Result: error(validationError) - single error
			 + - Validation: failure([validationError]) - array of errors
			 +
			 + This enables error accumulation. If multiple validations fail,
			 + we can collect all errors and report them together.
			 +
			 + Example: Validating form with multiple fields
			 + - Each field validation returns Validation monad
			 + - All errors accumulate: ["name required", "email invalid", "age out of range"]
			 + - User sees all problems at once, not just first error
			 */
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

		/*++
		 + INVALID FUNCTION PATH: Return ValidationError wrapped in failure
		 +
		 + Again, note the array wrapper: failure([error])
		 + This is the key difference between Result and Validation monads.
		 */
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

//++ Example usage (internal only):
//++
//++ const double = (x: number) => x * 2
//++ const mapper = _mapToValidation(double)
//++
//++ // Valid input:
//++ const result = mapper([1, 2, 3])
//++ // Result: Success([2, 4, 6])
//++
//++ // Invalid array:
//++ const invalidResult = mapper(null as any)
//++ // Result: Failure([{ code: 'INVALID_ARRAY', ... }])
//++
//++ // Note the array wrapper on errors - enables accumulation:
//++ // Failure([error1, error2, error3])
