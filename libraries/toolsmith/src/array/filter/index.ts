import type { Result } from "@sitebender/toolsmith/types/fp/result/index.ts"
import type { ValidationError } from "@sitebender/toolsmith/types/ValidationError/index.ts"

import ok from "@sitebender/toolsmith/monads/result/ok/index.ts"
import error from "@sitebender/toolsmith/monads/result/error/index.ts"
import isArray from "@sitebender/toolsmith/vanilla/validation/isArray/index.ts"

//++ Filters array elements that satisfy predicate
//++ Returns Result with filtered array or error if input is invalid
export default function filter<T>(
	predicate: (item: T) => boolean,
) {
	return function filterWithPredicate(
		array: ReadonlyArray<T>,
	): Result<ValidationError, ReadonlyArray<T>> {
		// Happy path: valid array
		if (isArray(array)) {
			const filtered = array.filter(predicate)
			return ok(filtered)
		}

		// Sad path: not an array
		return error({
			code: "FILTER_INVALID_INPUT",
			field: "array",
			messages: ["System needs an array to filter"],
			received: array,
			expected: "Array",
			suggestion: "Provide an array value",
			severity: "requirement",
		})
	}
}
