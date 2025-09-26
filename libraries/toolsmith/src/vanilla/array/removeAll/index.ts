import isNullish from "../../validation/isNullish/index.ts"
import filter from "../filter/index.ts"

/*++
 | Removes all occurrences of a value from an array
 |
 | Uses strict equality (===) to find items. Returns new array with
 | all matching elements removed. Preserves order of remaining elements.
 */
export default function removeAll<T>(item: T) {
	return function removeAllFromArray(
		array: ReadonlyArray<T> | null | undefined,
	): Array<T> {
		if (isNullish(array)) {
			return []
		}
		// filter returns a new array; spread to ensure a mutable Array<T>
		return filter(function isNotItem(element: T) {
			return element !== item
		})([...array])
	}
}

//?? [EXAMPLE] `removeAll(2)([1, 2, 3, 2, 4]) // [1, 3, 4]`
//?? [EXAMPLE] `removeAll("b")(["a", "b", "c", "b"]) // ["a", "c"]`
//?? [EXAMPLE] `removeAll(5)([1, 2, 3]) // [1, 2, 3] (not found)`
//?? [EXAMPLE] `removeAll(null)([1, null, 2, null, 3]) // [1, 2, 3]`
//?? [EXAMPLE] `removeAll(0)([0, 1, 0, 2, 0]) // [1, 2]`
//?? [EXAMPLE] `removeAll("x")(null) // []`
