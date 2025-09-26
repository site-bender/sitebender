import not from "../../logic/not/index.ts"
import isNullish from "../../validation/isNullish/index.ts"

/*++
 | Returns a new array with elements in reverse order
 |
 | Creates a new array without modifying the original. Empty arrays
 | return empty arrays.
 */
export default function reverse<T>(
	array: ReadonlyArray<T> | null | undefined,
): Array<T> {
	if (isNullish(array) || not(Array.isArray(array))) {
		return []
	}
	return [...array].reverse()
}

//?? [EXAMPLE] `reverse([1, 2, 3]) // [3, 2, 1]`
//?? [EXAMPLE] `reverse(["a", "b", "c"]) // ["c", "b", "a"]`
//?? [EXAMPLE] `reverse([]) // []`
//?? [EXAMPLE] `reverse([42]) // [42]`
//?? [EXAMPLE] `reverse([true, false, true]) // [true, false, true]`
//?? [EXAMPLE] `reverse(null) // []`
