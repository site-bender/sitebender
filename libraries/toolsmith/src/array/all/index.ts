import type { Result } from "../../types/fp/result/index.ts"
import type { ValidationError } from "../../types/fp/validation/index.ts"

import ok from "../../monads/result/ok/index.ts"
import error from "../../monads/result/error/index.ts"
import isArray from "../../validation/isArray/index.ts"

//++ Checks if all array elements satisfy predicate
//++ Returns Result with boolean or error if input invalid
export default function all<T>(
	predicate: (item: T, index: number) => boolean,
) {
	return function allWithPredicate(
		array: ReadonlyArray<T>,
	): Result<ValidationError, boolean> {
		// Happy path: valid array
		if (isArray(array)) {
			const result = array.every(predicate)
			return ok(result)
		}

		// Sad path: not an array
		return error({
			code: "ALL_INVALID_INPUT",
			field: "array",
			messages: ["System needs an array to check"],
			received: array as never,
			expected: "Array",
			suggestion: "Provide an array value",
			severity: "requirement",
		})
	}
}
