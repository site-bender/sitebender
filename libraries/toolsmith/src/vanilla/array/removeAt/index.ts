import not from "../../logic/not/index.ts"
import isNullish from "../../validation/isNullish/index.ts"

//++ Removes element at index
export default function removeAt<T>(index: number) {
	return function removeAtIndex(
		array: ReadonlyArray<T> | null | undefined,
	): Array<T> {
		if (isNullish(array) || not(Array.isArray(array))) {
			return []
		}
		const len = array.length
		const normalizedIndex = index < 0 ? len + index : index

		return normalizedIndex >= 0 && normalizedIndex < len
			? [
				...array.slice(0, normalizedIndex),
				...array.slice(normalizedIndex + 1),
			]
			: array as Array<T>
	}
}

//?? [EXAMPLE] `removeAt(1)([1, 2, 3, 4]) // [1, 3, 4]`
//?? [EXAMPLE] `removeAt(0)(["a", "b", "c"]) // ["b", "c"]`
//?? [EXAMPLE] `removeAt(-1)([1, 2, 3]) // [1, 2] (removes last)`
//?? [EXAMPLE] `removeAt(10)([1, 2, 3]) // [1, 2, 3] (out of bounds)`
//?? [EXAMPLE] `removeAt(1)(["first", "second", "third"]) // ["first", "third"]`
//?? [EXAMPLE] `removeAt(0)(null) // []`
