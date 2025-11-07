import type { Result } from "../../types/fp/result/index.ts"
import type { Validation } from "../../types/fp/validation/index.ts"

import ok from "../../monads/result/ok/index.ts"
import error from "../../monads/result/error/index.ts"
import isArray from "../../predicates/isArray/index.ts"

//++ Gets the length of an array
//++ Returns Result with number or error if input invalid
export default function length<T>(
	array: ReadonlyArray<T>,
): Result<E, number> {
	// Happy path: valid array
	if (isArray(array)) {
		//++ [EXCEPTION] .length permitted in Toolsmith for performance - provides length wrapper
		return ok(array.length)
	}

	// Sad path: not an array
	return error({
		code: "LENGTH_INVALID_INPUT",
		field: "array",
		messages: ["System needs an array to get length"],
		received: array as never,
		expected: "Array",
		suggestion: "Provide an array value",
		severity: "requirement",
	})
}
