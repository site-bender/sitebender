import not from "../../logic/not/index.ts"
import isNullish from "../../validation/isNullish/index.ts"

/*++
 | Removes elements at specified indices from an array
 |
 | Creates a new array excluding elements at the given indices.
 | Supports negative indices which count from the end (-1 is last element).
 | Invalid indices are ignored. Preserves order of kept elements.
 */
export default function omit<T>(indices: Array<number>) {
	return function omitFromArray(
		array: Array<T> | null | undefined,
	): Array<T> {
		if (isNullish(array)) {
			return []
		}

		// Normalize negative indices to positive ones
		const normalizedIndices = indices.map(function normalizeIndex(i) {
			return i < 0 ? array.length + i : i
		})

		return array.filter(function isNotAtIndex(_, index) {
			return not(normalizedIndices.includes(index))
		})
	}
}
