/**
 * Finds the index of the last element that satisfies a predicate
 * 
 * Searches from end to start, returning the zero-based index of the last
 * element for which the predicate returns truthy, or undefined if none match.
 * 
 * @curried (predicate) => (array) => result
 * @param predicate - Function to test each element (item, index, array) => boolean
 * @param array - The array to search
 * @returns Index of last matching element or undefined if none found
 * @example
 * ```typescript
 * findLastIndex((n: number) => n > 2)([1, 3, 2, 4]) // 3
 * findLastIndex((s: string) => s.startsWith("h"))(["hello", "hi", "world"]) // 1
 * findLastIndex((n: number) => n > 10)([1, 2, 3]) // undefined
 * 
 * // Find position of most recent error
 * const findLastErrorIndex = findLastIndex((log: LogEntry) => log.level === "error")
 * findLastErrorIndex(logs) // Index or undefined
 * ```
 */
const findLastIndex = <T>(
	predicate: (item: T, index: number, array: Array<T>) => boolean
) => (array: Array<T>): number | undefined => {
	const index = array.findLastIndex(predicate)
	return index === -1 ? undefined : index
}

export default findLastIndex
