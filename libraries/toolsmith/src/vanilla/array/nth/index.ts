import isNullish from "../../validation/isNullish/index.ts"

//++ Gets element at index with negative support
export default function nth(index: number) {
	return function getElementAtIndex<T>(
		array: Array<T> | null | undefined,
	): T | undefined {
		if (isNullish(array) || !Array.isArray(array)) {
			return undefined
		}
		return array.at(index)
	}
}
