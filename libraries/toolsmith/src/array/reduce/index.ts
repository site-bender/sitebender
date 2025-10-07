import type { Result } from "@sitebender/toolsmith/types/fp/result/index.ts"
import type { ValidationError } from "@sitebender/toolsmith/types/ValidationError/index.ts"

import ok from "@sitebender/toolsmith/monads/result/ok/index.ts"
import error from "@sitebender/toolsmith/monads/result/error/index.ts"
import isArray from "@sitebender/toolsmith/vanilla/validation/isArray/index.ts"

//++ Reduces array to a single value using a curried reducer function
//++ Returns Result with reduced value or error if input is invalid
export default function reduce<T, U>(
	fn: (acc: U) => (item: T) => U,
) {
	return function reduceWithFunction(
		initial: U,
	) {
		return function reduceWithFunctionAndInitial(
			array: ReadonlyArray<T>,
		): Result<ValidationError, U> {
			// Happy path: valid array
			if (isArray(array)) {
				// Convert curried fn to uncurried for native reduce
				const uncurriedFn = (acc: U, item: T): U => fn(acc)(item)
				const reduced = array.reduce(uncurriedFn, initial)
				return ok(reduced)
			}

			// Sad path: not an array
			return error({
				code: "REDUCE_INVALID_INPUT",
				field: "array",
				messages: ["System needs an array to reduce"],
				received: array,
				expected: "Array",
				suggestion: "Provide an array value",
				severity: "requirement",
			})
		}
	}
}
