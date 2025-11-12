import type { Validation } from "../../../types/fp/validation/index.ts"

import failure from "../../../monads/validation/failure/index.ts"
import success from "../../../monads/validation/success/index.ts"
import isArray from "../../../predicates/isArray/index.ts"
import isFunction from "../../../predicates/isFunction/index.ts"

/*++
 + [EXCEPTION] Toolsmith functions are permitted to use JS operators and OOP methods for performance.
 + Private helper that checks if all array elements satisfy predicate and returns a Validation
 */
export default function _allToValidation<E, T>(
	predicate: (item: T, index: number) => boolean,
) {
	return function _allToValidationWithPredicate(
		array: ReadonlyArray<T>,
	): Validation<E, boolean> {
		if (isFunction(predicate)) {
			// Happy path: predicate and array are valid
			if (isArray(array)) {
				//++ [EXCEPTION] .every() permitted in Toolsmith for performance - provides curried all wrapper
				return success(array.every(predicate))
			}

			// Fallback: return failure for invalid array
			return failure([{
				code: "ALL_INVALID_ARRAY",
				field: "array",
				messages: ["Expected array but received invalid input"],
				received: typeof array,
				expected: "Array",
				suggestion: "Provide a valid array to check",
				severity: "requirement" as const,
			} as E])
		}

		// Fallback: return failure for invalid predicate
		return failure([{
			code: "ALL_INVALID_PREDICATE",
			field: "predicate",
			messages: ["Expected predicate function but received invalid input"],
			received: typeof predicate,
			expected: "Function",
			suggestion: "Provide a valid predicate function",
			severity: "requirement" as const,
		} as E])
	}
}
