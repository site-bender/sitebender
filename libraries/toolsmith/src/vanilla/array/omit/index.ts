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

//?? [EXAMPLE] `omit([1, 3])([1, 2, 3, 4, 5]) // [1, 3, 5]`
//?? [EXAMPLE] `omit([0])(["a", "b", "c"]) // ["b", "c"]`
//?? [EXAMPLE] `omit([0, 2, 4])(["a", "b", "c", "d", "e"]) // ["b", "d"]`
//?? [EXAMPLE] `omit([-1, -2])([1, 2, 3, 4, 5]) // [1, 2, 3]`
//?? [EXAMPLE] `omit([0, -1])(["header", "data1", "data2", "footer"]) // ["data1", "data2"]`
//?? [EXAMPLE] `omit([0])(null) // []`
//?? [EXAMPLE] `omit([0])(undefined) // []`
//?? [EXAMPLE] `omit([])([1, 2, 3]) // [1, 2, 3]`
