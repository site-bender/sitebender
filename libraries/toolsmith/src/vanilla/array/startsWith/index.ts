import is from "../../validation/is/index.ts"
import isNullish from "../../validation/isNullish/index.ts"

/*++
 | Checks if an array starts with a given prefix
 |
 | Returns true if the array begins with all elements of the prefix
 | in the same order. Uses strict equality for comparison. Empty
 | prefix always returns true.
 */
export default function startsWith<T>(
	prefix: ReadonlyArray<T> | null | undefined,
) {
	return function checkStartsWith(
		array: ReadonlyArray<T> | null | undefined,
	): boolean {
		if (isNullish(prefix) || isNullish(array)) {
			return false
		}

		if (prefix.length === 0) {
			return true
		}

		if (prefix.length > array.length) {
			return false
		}

		// Check each element of the prefix using every
		return prefix.every(function checkElement(value, index) {
			return is(value)(array[index])
		})
	}
}

//?? [EXAMPLE] `startsWith([1, 2])([1, 2, 3, 4]) // true`
//?? [EXAMPLE] `startsWith(["a", "b"])(["a", "b", "c"]) // true`
//?? [EXAMPLE] `startsWith([1, 2])([1, 3, 2]) // false`
//?? [EXAMPLE] `startsWith([])([1, 2, 3]) // true`
//?? [EXAMPLE] `startsWith([1, 2, 3])([1, 2]) // false`
//?? [EXAMPLE] `startsWith(null)([1, 2, 3]) // false`
