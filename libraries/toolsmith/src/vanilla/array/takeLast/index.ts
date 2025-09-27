import isNullish from "../../validation/isNullish/index.ts"

//++ Takes last n elements
export default function takeLast(count: number) {
	return function takeLastFromArray<T>(
		array: ReadonlyArray<T> | null | undefined,
	): Array<T> {
		if (isNullish(array) || count <= 0 || Number.isNaN(count)) {
			return []
		}
		return array.slice(-count)
	}
}

//?? [EXAMPLE] `takeLast(3)([1, 2, 3, 4, 5]) // [3, 4, 5]`
//?? [EXAMPLE] `takeLast(2)(["a", "b", "c"]) // ["b", "c"]`
//?? [EXAMPLE] `takeLast(0)([1, 2, 3]) // []`
//?? [EXAMPLE] `takeLast(10)([1, 2, 3]) // [1, 2, 3]`
//?? [EXAMPLE] `takeLast(-1)([1, 2, 3]) // []`
//?? [EXAMPLE] `takeLast(3)(null) // []`
