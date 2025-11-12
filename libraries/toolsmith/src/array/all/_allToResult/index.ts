import type { Result } from "../../../types/fp/result/index.ts"

import error from "../../../monads/result/error/index.ts"
import ok from "../../../monads/result/ok/index.ts"
import isArray from "../../../predicates/isArray/index.ts"
import isFunction from "../../../predicates/isFunction/index.ts"

/*++
 + [EXCEPTION] Toolsmith functions are permitted to use JS operators and OOP methods for performance.
 + Private helper that checks if all array elements satisfy predicate and returns a Result
 */
export default function _allToResult<E, T>(
	predicate: (item: T, index: number) => boolean,
) {
	return function _allToResultWithPredicate(
		array: ReadonlyArray<T>,
	): Result<E, boolean> {
		if (isFunction(predicate)) {
			// Happy path: predicate and array are valid
			if (isArray(array)) {
				//++ [EXCEPTION] .every() permitted in Toolsmith for performance - provides curried all wrapper
				return ok(array.every(predicate))
			}

			// Fallback: return error for invalid array
			return error({
				code: "ALL_INVALID_ARRAY",
				field: "array",
				messages: ["Expected array but received invalid input"],
				received: typeof array,
				expected: "Array",
				suggestion: "Provide a valid array to check",
				severity: "requirement" as const,
			} as E)
		}

		// Fallback: return error for invalid predicate
		return error({
			code: "ALL_INVALID_PREDICATE",
			field: "predicate",
			messages: ["Expected predicate function but received invalid input"],
			received: typeof predicate,
			expected: "Function",
			suggestion: "Provide a valid predicate function",
			severity: "requirement" as const,
		} as E)
	}
}
