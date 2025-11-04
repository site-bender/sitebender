import not from "../../logic/not/index.ts"
import isNullish from "../../predicates/isNullish/index.ts"

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
