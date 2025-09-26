import isNullish from "../../validation/isNullish/index.ts"

/*++
 | Takes the first n elements from an array
 |
 | Returns a new array with at most n elements from the beginning.
 | Returns fewer elements if n exceeds array length. Zero or negative
 | n returns empty array.
 */
export default function take(count: number) {
	return function takeFromArray<T>(
		array: ReadonlyArray<T> | null | undefined,
	): Array<T> {
		if (isNullish(array) || !Array.isArray(array) || count <= 0) {
			return []
		}
		return array.slice(0, count)
	}
}

//?? [EXAMPLE] `take(3)([1, 2, 3, 4, 5]) // [1, 2, 3]`
//?? [EXAMPLE] `take(2)(["a", "b", "c"]) // ["a", "b"]`
//?? [EXAMPLE] `take(0)([1, 2, 3]) // []`
//?? [EXAMPLE] `take(10)([1, 2, 3]) // [1, 2, 3]`
//?? [EXAMPLE] `take(-1)([1, 2, 3]) // []`
//?? [EXAMPLE] `take(3)(null) // []`
