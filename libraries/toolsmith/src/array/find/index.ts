import type { Result } from "@sitebender/toolsmith/types/fp/result/index.ts"
import type { ValidationError } from "@sitebender/toolsmith/types/fp/validation/index.ts"
import type { Serializable } from "@sitebender/toolsmith/types/index.ts"

import ok from "@sitebender/toolsmith/monads/result/ok/index.ts"
import error from "@sitebender/toolsmith/monads/result/error/index.ts"
import isArray from "@sitebender/toolsmith/predicates/isArray/index.ts"

//++ Finds the first element matching a predicate
//++ Returns Result with found element or error if not found or invalid input
export default function find<T extends Serializable>(predicate: (item: T) => boolean) {
	return function findWithPredicate(
		array: ReadonlyArray<T>,
	): Result<ValidationError, T> {
		// Validate input is array
		if (isArray(array)) {
			// Use findIndex to determine if element was actually found
			// This correctly handles finding undefined values
			const index = array.findIndex(predicate)

			// Happy path: element found (index !== -1)
			if (index !== -1) {
				return ok(array[index] as T)
			}

			// Sad path: element not found
			return error({
				code: "FIND_ELEMENT_NOT_FOUND",
				field: "array",
				messages: ["System could not find an element matching the predicate"],
				received: array,
				expected: "Array with at least one matching element",
				suggestion:
					"Ensure the array contains an element that satisfies the predicate",
				severity: "requirement",
			})
		}

		// Sad path: not an array
		return error({
			code: "FIND_INVALID_INPUT",
			field: "array",
			messages: ["System needs an array to search"],
			received: array,
			expected: "Array",
			suggestion: "Provide an array value",
			severity: "requirement",
		})
	}
}
