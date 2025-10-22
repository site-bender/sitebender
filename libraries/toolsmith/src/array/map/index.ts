import type { Result } from "@sitebender/toolsmith/types/fp/result/index.ts"
import type { ValidationError } from "@sitebender/toolsmith/types/fp/validation/index.ts"
import type { Serializable } from "@sitebender/toolsmith/types/index.ts"

import ok from "@sitebender/toolsmith/monads/result/ok/index.ts"
import error from "@sitebender/toolsmith/monads/result/error/index.ts"
import isArray from "@sitebender/toolsmith/validation/isArray/index.ts"

//++ Transforms each array element using a function
//++ Returns Result with transformed array or error if input is invalid
export default function map<T extends Serializable, U extends Serializable>(
	fn: (element: T) => U,
) {
	return function mapWithFunction(
		array: ReadonlyArray<T>,
	): Result<ValidationError, ReadonlyArray<U>> {
		// Happy path: valid array
		if (isArray(array)) {
			const mapped = array.map(fn)
			return ok(mapped)
		}

		// Sad path: not an array
		return error({
			code: "MAP_INVALID_INPUT",
			field: "array",
			messages: ["System needs an array to map over"],
			received: array,
			expected: "Array",
			suggestion: "Provide an array value",
			severity: "requirement",
		})
	}
}
