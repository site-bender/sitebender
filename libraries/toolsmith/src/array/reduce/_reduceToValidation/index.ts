import type {
	Validation,
	ValidationError,
} from "../../../types/fp/validation/index.ts"

import failure from "../../../monads/validation/failure/index.ts"
import success from "../../../monads/validation/success/index.ts"
import isArray from "../../../predicates/isArray/index.ts"
import isFunction from "../../../predicates/isFunction/index.ts"

//++ Private helper that reduces an array and returns a Validation
export default function _reduceToValidation<T, U>(
	fn: (accumulator: U, item: T) => U,
) {
	return function _reduceToValidationWithFunction(initial: U) {
		return function _reduceToValidationWithFunctionAndInitial(
			array: ReadonlyArray<T>,
		): Validation<ValidationError, U> {
			if (isFunction(fn)) {
				// Happy path: function and array are valid, reduce it
				if (isArray<T>(array)) {
					/*++
					 + [EXCEPTION] .reduce is permitted here for performance reasons
					 + This is the ONLY place .reduce should be used
					 + Everywhere else, use the `reduce` function instead
					 */
					const reduced = array.reduce<U>(fn, initial)
					return success(reduced)
				}

				// Fallback: return ValidationError wrapped in failure
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

			// Fallback: return ValidationError wrapped in failure
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
