/*++
 + [EXCEPTION] Toolsmith functions are permitted to use JS operators and OOP methods for performance.
 + Gets an element at the specified index from a plain array (supports negative indices).
 */

import and from "../../../logic/and/index.ts"
import isArray from "../../../predicates/isArray/index.ts"
import isNumber from "../../../predicates/isNumber/index.ts"

export default function _atArray<T>(index: number) {
	return function _atArrayWithIndex(
		array: ReadonlyArray<T>,
	): T | undefined {
		// Happy path: valid index and array
		if (and(isNumber(index))(isArray(array))) {
			//++ [EXCEPTION] .at() permitted in Toolsmith for performance
			return array.at(index)
		}

		// Invalid index: return undefined
		if (isArray(array)) {
			return undefined
		}

		// Invalid array: return unchanged
		return array as unknown as T | undefined
	}
}
