import isNullish from "../../validation/isNullish/index.ts"

/**
 * Finds the index of the last occurrence of a value in an array
 *
 * Searches from end to start using Object.is for comparison, which correctly
 * handles NaN and -0/+0. Returns undefined instead of -1 when not found,
 * making it safer for FP composition.
 *
 * @param item - The value to search for
 * @param array - The array to search in
 * @returns Index of last occurrence or undefined if not found
 *
 * @pure
 * @curried
 * @safe
 *
 * @example
 * ```typescript
 * // Basic usage
 * lastIndexOf(3)([1, 2, 3, 2, 3]) // 4
 * lastIndexOf("hello")(["hello", "world", "hello"]) // 2
 * lastIndexOf(5)([1, 2, 3]) // undefined
 *
 * // Correctly finds NaN
 * lastIndexOf(NaN)([NaN, 1, NaN, 3]) // 2
 *
 * // Partial application
 * const findLastThree = lastIndexOf(3)
 * findLastThree([3, 1, 2, 3, 4]) // 3
 *
 * // Edge cases
 * lastIndexOf(1)([]) // undefined
 * lastIndexOf(1)(null) // undefined
 * lastIndexOf(1)(undefined) // undefined
 * ```
 */
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
