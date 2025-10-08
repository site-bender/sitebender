import type { Result } from "../../types/fp/result/index.ts"
import type { ValidationError } from "../../types/validation/index.ts"

import ok from "../../monads/result/ok/index.ts"
import error from "../../monads/result/error/index.ts"
import isArray from "../../validation/isArray/index.ts"

//++ Checks if an item is included in an array
//++ Returns Result with boolean or error if input invalid
export default function includes<T>(item: T) {
	return function includesItem(
		array: ReadonlyArray<T>,
	): Result<ValidationError, boolean> {
		// Happy path: valid array
		if (isArray(array)) {
			const result = array.includes(item)
			return ok(result)
		}

		// Sad path: not an array
		return error({
			code: "INCLUDES_INVALID_INPUT",
			field: "array",
			messages: ["System needs an array to search"],
			received: array as never,
			expected: "Array",
			suggestion: "Provide an array value",
			severity: "requirement",
		})
	}
}
