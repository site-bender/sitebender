import type { Result } from "@sitebender/toolsmith/types/fp/result/index.ts"
import type { ValidationError } from "@sitebender/toolsmith/types/validation/index.ts"
import type { Serializable } from "@sitebender/toolsmith/types/index.ts"

import ok from "@sitebender/toolsmith/monads/result/ok/index.ts"
import error from "@sitebender/toolsmith/monads/result/error/index.ts"
import isArray from "@sitebender/toolsmith/validation/isArray/index.ts"

//++ Maps each array element to an array and flattens the result by one level
//++ Returns Result with flattened array or error if input is invalid
export default function flatMap<T extends Serializable, U extends Serializable>(
	fn: (element: T) => ReadonlyArray<U>,
) {
	return function flatMapWithFunction(
		array: ReadonlyArray<T>,
	): Result<ValidationError, ReadonlyArray<U>> {
		// Happy path: valid array
		if (isArray(array)) {
			const flattened = array.flatMap(fn)
			return ok(flattened)
		}

		// Sad path: not an array
		return error({
			code: "FLATMAP_INVALID_INPUT",
			field: "array",
			messages: ["System needs an array to flatMap over"],
			received: array as never,
			expected: "Array",
			suggestion: "Provide an array value",
			severity: "requirement",
		})
	}
}
