import not from "../../logic/not/index.ts"
import isNullish from "../../validation/isNullish/index.ts"

//++ Replaces element at index via function
const replaceAt =
	<T>(index: number) =>
	(replacer: (item: T) => T) =>
	(array: ReadonlyArray<T> | null | undefined): Array<T> => {
		if (isNullish(array) || not(Array.isArray(array))) {
			return []
		}
		// Out of bounds: return the original array reference unchanged
		if (index < 0 || index >= array.length) {
			return [...array]
		}
		return [
			...array.slice(0, index),
			replacer(array[index]),
			...array.slice(index + 1),
		]
	}

export default replaceAt

//?? [EXAMPLE] `replaceAt(1)(n => n * 2)([1, 2, 3, 4]) // [1, 4, 3, 4]`
//?? [EXAMPLE] `replaceAt(0)(s => s.toUpperCase())(["hello", "world"]) // ["HELLO", "world"]`
//?? [EXAMPLE] `replaceAt(10)(x => x)([1, 2, 3]) // [1, 2, 3] (out of bounds)`
//?? [EXAMPLE] `replaceAt(-1)(x => x * 10)([1, 2, 3]) // [1, 2, 3] (negative index)`
//?? [EXAMPLE] `replaceAt(1)((n: number) => n * 2)([10, 20, 30]) // [10, 40, 30]`
//?? [EXAMPLE] `replaceAt(0)(x => x + 1)(null) // []`
