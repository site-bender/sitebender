/*++
 + [EXCEPTION] Toolsmith functions are permitted to use JS operators and OOP methods for performance.
 + Gets an element at the specified index, returning Validation monad (error accumulation).
 */

import type { Validation } from "../../../types/fp/validation/index.ts"
import failure from "../../../monads/validation/failure/index.ts"
import success from "../../../monads/validation/success/index.ts"
import isArray from "../../../predicates/isArray/index.ts"
import isNumber from "../../../predicates/isNumber/index.ts"

export default function _atToValidation<E, T>(index: number) {
	return function _atToValidationWithIndex(
		array: ReadonlyArray<T>,
	): Validation<E, T | undefined> {
		// Check index validity first (fail-fast for simplicity, even though Validation can accumulate)
		if (isNumber(index)) {
			// Check array validity
			if (isArray(array)) {
				//++ [EXCEPTION] .at() permitted in Toolsmith for performance
				return success(array.at(index))
			}

			// Invalid array
			return failure([{
				code: "INVALID_ARRAY",
				field: "array",
				messages: ["Expected array but received invalid input"],
				received: typeof array,
				expected: "Array",
				suggestion: "Provide a valid array to access",
				severity: "requirement" as const,
			} as E])
		}

		// Invalid index
		return failure([{
			code: "INVALID_INDEX",
			field: "index",
			messages: ["Expected number but received invalid input"],
			received: typeof index,
			expected: "number",
			suggestion: "Provide a valid numeric index",
			severity: "requirement" as const,
		} as E])
	}
}
