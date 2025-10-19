import type { Result } from "@sitebender/toolsmith/types/fp/result/index.ts"
import type { ValidationError } from "@sitebender/toolsmith/types/validation/index.ts"

import ok from "@sitebender/toolsmith/monads/result/ok/index.ts"
import error from "@sitebender/toolsmith/monads/result/error/index.ts"
import isArray from "@sitebender/toolsmith/validation/isArray/index.ts"

//++ Reduces array to a single value using a two-parameter reducer function
//++ Returns Result with reduced value or error if input is invalid
export default function reduce<T, U>(
	fn: (accumulator: U, item: T) => U,
) {
	return function reduceWithFunction(
		initial: U,
	) {
		return function reduceWithFunctionAndInitial(
			array: ReadonlyArray<T>,
		): Result<ValidationError, U> {
			// Happy path: valid array
			if (isArray(array)) {
				const reduced = array.reduce(fn, initial)
				return ok(reduced)
			}

			// Sad path: not an array
			return error({
				code: "REDUCE_INVALID_INPUT",
				field: "array",
				messages: ["System needs an array to reduce"],
				received: array as never,
				expected: "Array",
				suggestion: "Provide an array value",
				severity: "requirement",
			})
		}
	}
}
