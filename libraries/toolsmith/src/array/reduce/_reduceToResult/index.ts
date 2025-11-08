import type { Result } from "../../../types/fp/result/index.ts"

import error from "../../../monads/result/error/index.ts"
import ok from "../../../monads/result/ok/index.ts"
import isArray from "../../../predicates/isArray/index.ts"
import isFunction from "../../../predicates/isFunction/index.ts"

//++ Private helper that reduces an array and returns a Result
export default function _reduceToResult<E, T, U>(
	fn: (accumulator: U, item: T) => U,
) {
	return function _reduceToResultWithFunction(initial: U) {
		return function _reduceToResultWithFunctionAndInitial(
			array: ReadonlyArray<T>,
		): Result<E, U> {
			if (isFunction(fn)) {
				// Happy path: function and array are valid, reduce it
				if (isArray<T>(array)) {
					/*++
					 + [EXCEPTION] .reduce is permitted here for performance reasons
					 + This is the ONLY place .reduce should be used
					 + Everywhere else, use the `reduce` function instead
					 */
					const reduced = array.reduce<U>(fn, initial)
					return ok(reduced)
				}

				// Fallback: return ValidationError wrapped in error
				return error({
					code: "REDUCE_INVALID_INPUT",
					field: "array",
					messages: ["Expected array but received invalid input"],
					received: typeof array,
					expected: "Array",
					suggestion: "Provide a valid array to reduce over",
					severity: "requirement" as const,
				} as E)
			}

			// Fallback: return ValidationError wrapped in error
			return error({
				code: "REDUCE_INVALID_FUNCTION",
				field: "function",
				messages: ["Expected function but received invalid input"],
				received: typeof fn,
				expected: "Function",
				suggestion: "Provide a valid function to reduce with",
				severity: "requirement" as const,
			} as E)
		}
	}
}
