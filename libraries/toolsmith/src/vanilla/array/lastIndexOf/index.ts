import is from "../../validation/is/index.ts"
import isNullish from "../../validation/isNullish/index.ts"

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
