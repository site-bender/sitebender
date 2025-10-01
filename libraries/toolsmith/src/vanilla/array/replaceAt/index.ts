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
