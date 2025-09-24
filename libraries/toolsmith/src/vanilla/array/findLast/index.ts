/**
 * Finds the last element in an array that satisfies a predicate
 *
 * Searches from end to start, returning the last element for which the
 * predicate returns truthy, or undefined if no element matches.
 *
 * @pure
 * @curried
 * @param predicate - Function to test each element (item, index, array) => boolean
 * @param array - The array to search
 * @returns The last matching element or undefined if none found
 * @example
 * ```typescript
 * findLast((n: number) => n > 2)([1, 3, 2, 4]) // 4
 * findLast((s: string) => s.startsWith("h"))(["hello", "hi", "world"]) // "hi"
 * findLast((n: number) => n > 10)([1, 2, 3]) // undefined
 *
 * // Find most recent error
 * const findLastError = findLast((log: LogEntry) => log.level === "error")
 * findLastError(logs) // Most recent error or undefined
 * ```
 */
const findLast = <T>(
	predicate: (item: T, index: number, array: Array<T>) => boolean,
) =>
(array: Array<T>): T | undefined => array.findLast(predicate)

export default findLast
