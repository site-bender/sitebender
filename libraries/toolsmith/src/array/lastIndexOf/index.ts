import is from "../../validation/is/index.ts"
import isNullish from "../../predicates/isNullish/index.ts"

//++ Finds the last index of an item
export default function lastIndexOf<T>(item: T) {
	return function findLastIndexOf(
		array: ReadonlyArray<T> | null | undefined,
	): number | null {
		if (isNullish(array) || !Array.isArray(array) || array.length === 0) {
			return null
		}

		// Find in reversed array then calculate original index
		const reversedIndex = [...array]
			.reverse()
			.findIndex(is(item))

		return reversedIndex === -1 ? null : array.length - 1 - reversedIndex
	}
}
