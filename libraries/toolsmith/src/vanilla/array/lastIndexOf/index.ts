import is from "../../validation/is/index.ts"
import isNullish from "../../validation/isNullish/index.ts"

//++ Finds the last index of an item
export default function lastIndexOf<T>(item: T) {
	return function findLastIndexOf(
		array: ReadonlyArray<T> | null | undefined,
	): number | undefined {
		if (isNullish(array) || !Array.isArray(array) || array.length === 0) {
			return undefined
		}

		// Find in reversed array then calculate original index
		const reversedIndex = [...array]
			.reverse()
			.findIndex(is(item))

		return reversedIndex === -1 ? undefined : array.length - 1 - reversedIndex
	}
}

//?? [EXAMPLE] `lastIndexOf(3)([1, 2, 3, 2, 3]) // 4`
//?? [EXAMPLE] `lastIndexOf("b")(["a", "b", "c", "b"]) // 3`
//?? [EXAMPLE] `lastIndexOf(5)([1, 2, 3]) // undefined`
//?? [EXAMPLE] `lastIndexOf(1)([]) // undefined`
//?? [EXAMPLE] `lastIndexOf(1)(null) // undefined`
