import isNullish from "../../validation/isNullish/index.ts"

//++ Find the last index of a value using Object.is; returns undefined when not found or array is nullish/empty
//?? lastIndexOf(3)([1, 2, 3, 2, 3]) // 4
//?? lastIndexOf("hello")(["hello", "world", "hello"]) // 2
//?? lastIndexOf(NaN)([NaN, 1, NaN, 3]) // 2
const lastIndexOf = <T>(item: T) =>
(
	array: ReadonlyArray<T> | null | undefined,
): number | undefined => {
	if (isNullish(array) || !Array.isArray(array) || array.length === 0) {
		return undefined
	}

	// Find in reversed array then calculate original index
	const reversedIndex = [...array]
		.reverse()
		.findIndex((x) => Object.is(x, item))

	return reversedIndex === -1 ? undefined : array.length - 1 - reversedIndex
}

export default lastIndexOf
