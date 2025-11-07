import isNullish from "../../predicates/isNullish/index.ts"

//++ Gets element at index with negative support
export default function nth(index: number) {
	return function getElementAtIndex<T>(
		array: Array<T> | null | undefined,
	): T | null {
		if (isNullish(array) || !Array.isArray(array)) {
			return null
		}

		const element = array.at(index)

		return element === undefined ? null : element
	}
}
