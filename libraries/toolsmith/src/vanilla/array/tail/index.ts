import not from "../../logic/not/index.ts"
import isNullish from "../../validation/isNullish/index.ts"

/*++
 | Return all elements of an array except the first
 |
 | Returns a new array containing all elements except the first one.
 | Empty arrays return empty arrays. Null/undefined yield empty arrays.
 */
export default function tail<T>(
	array: ReadonlyArray<T> | null | undefined,
): Array<T> {
	if (isNullish(array) || not(Array.isArray(array))) {
		return []
	}
	return array.slice(1)
}

//?? [EXAMPLE] `tail([1, 2, 3, 4]) // [2, 3, 4]`
//?? [EXAMPLE] `tail(["a"]) // []`
//?? [EXAMPLE] `tail([]) // []`
//?? [EXAMPLE] `tail(["first", "second", "third"]) // ["second", "third"]`
//?? [EXAMPLE] `tail(null) // []`
//?? [EXAMPLE] `tail([42]) // []`
