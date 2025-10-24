import type { Result } from "../../../types/fp/result/index.ts"
import type { ValidationError } from "../../../types/fp/validation/index.ts"

import error from "../../../monads/result/error/index.ts"
import ok from "../../../monads/result/ok/index.ts"
import isArray from "../../../predicates/isArray/index.ts"

//++ Private helper that reduces an array and returns a Result
export default function _reduceToResult<T, U>(
	fn: (accumulator: U, item: T) => U,
) {
	return function _reduceToResultWithFunction(initial: U) {
		return function _reduceToResultWithFunctionAndInitial(
			array: ReadonlyArray<T>,
		): Result<ValidationError, U> {
			// Happy path: valid array, reduce it
			if (isArray<T>(array)) {
				/*++
				 + [EXCEPTION] .reduce is permitted here for performance reasons
				 + This is the ONLY place .reduce should be used
				 + Everywhere else, use the `reduce` function instead
				 */
				const reduced = array.reduce(fn, initial)
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
			})
		}
	}
}
