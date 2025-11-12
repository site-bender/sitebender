/*++
 + [EXCEPTION] Toolsmith functions are permitted to use JS operators and OOP methods for performance.
 + Gets an element at the specified index, returning Result monad (fail-fast error handling).
 */

import type { Result } from "../../../types/fp/result/index.ts"
import error from "../../../monads/result/error/index.ts"
import ok from "../../../monads/result/ok/index.ts"
import isArray from "../../../predicates/isArray/index.ts"
import isNumber from "../../../predicates/isNumber/index.ts"

export default function _atToResult<E, T>(index: number) {
	return function _atToResultWithIndex(
		array: ReadonlyArray<T>,
	): Result<E, T | undefined> {
		// Check index validity first (fail-fast)
		if (isNumber(index)) {
			// Check array validity
			if (isArray(array)) {
				//++ [EXCEPTION] .at() permitted in Toolsmith for performance
				return ok(array.at(index))
			}

			// Invalid array
			return error({
				code: "INVALID_ARRAY",
				field: "array",
				messages: ["Expected array but received invalid input"],
				received: typeof array,
				expected: "Array",
				suggestion: "Provide a valid array to access",
				severity: "requirement" as const,
			} as E)
		}

		// Invalid index
		return error({
			code: "INVALID_INDEX",
			field: "index",
			messages: ["Expected number but received invalid input"],
			received: typeof index,
			expected: "number",
			suggestion: "Provide a valid numeric index",
			severity: "requirement" as const,
		} as E)
	}
}
