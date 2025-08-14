/**
 * Finds the index of the last element that matches a predicate function
 * 
 * @param predicate - Function to test each element (value, index, array) => boolean
 * @returns Function that takes an array and returns the index of last match or undefined
 * @example
 * ```typescript
 * findLastIndex((n: number) => n > 2)([1, 3, 2, 4]) // 3
 * findLastIndex((s: string) => s.startsWith("h"))(["hello", "hi", "world"]) // 1
 * findLastIndex((n: number) => n > 10)([1, 2, 3]) // undefined
 * ```
 */
const findLastIndex = <T>(
	predicate: (value: T, index: number, array: Array<T>) => boolean,
) =>
(array: Array<T>): number | undefined => {
	const index = array.findLastIndex(predicate)

	return index === -1 ? undefined : index
}

export default findLastIndex
