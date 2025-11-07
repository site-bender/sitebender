import type { Result } from "@sitebender/toolsmith/types/fp/result/index.ts"

import ok from "@sitebender/toolsmith/monads/result/ok/index.ts"
import error from "@sitebender/toolsmith/monads/result/error/index.ts"
import isArray from "@sitebender/toolsmith/predicates/isArray/index.ts"

//++ Joins array elements into a string with separator
//++ Returns Result with joined string or error if input is invalid
export default function join<T>(separator: string) {
	return function joinWithSeparator(
		array: ReadonlyArray<T>,
	): Result<E, string> {
		// Happy path: valid array
		if (isArray(array)) {
			//++ [EXCEPTION] .join() permitted in Toolsmith for performance - provides curried join wrapper
			const joined = array.join(separator)
			return ok(joined)
		}

		// Sad path: not an array
		return error({
			code: "JOIN_INVALID_INPUT",
			field: "array",
			messages: ["System needs an array to join"],
			received: array,
			expected: "Array",
			suggestion: "Provide an array value",
			severity: "requirement",
		})
	}
}
