import and from "../../../logic/and/index.ts"
import isArray from "../../../predicates/isArray/index.ts"
import isNumber from "../../../predicates/isNumber/index.ts"

/*++
 + [EXCEPTION] Toolsmith functions are permitted to use JS operators and OOP methods for performance.
 + Gets an element at the specified index from a plain array (supports negative indices).
 */
export default function _atArray<T>(index: number) {
	return function _atArrayWithIndex(
		array: ReadonlyArray<T>,
	): T | null {
		if (and(isNumber(index))(isArray(array))) {
			return array.at(index) || null
		}

		if (isArray(array)) {
			return null
		}

		return array as unknown as T | null
	}
}
