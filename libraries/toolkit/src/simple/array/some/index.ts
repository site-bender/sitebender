/**
 * Tests whether at least one element in an array passes a test function
 *
 * Returns true if any element satisfies the predicate, false otherwise.
 * Short-circuits on first match. Empty arrays always return false.
 *
 * @curried (predicate) => (array) => result
 * @param predicate - Function to test each element (value, index, array) => boolean
 * @param array - The array to test
 * @returns True if any element passes the test, false otherwise
 * @example
 * ```typescript
 * some((n: number) => n > 2)([1, 2, 3]) // true
 * some((n: number) => n < 0)([1, 2, 3]) // false
 * some((s: string) => s.length > 5)(["hi", "hello", "world"]) // false
 * some((x: number) => x % 2 === 0)([1, 3, 5]) // false
 *
 * // Check for existence
 * const hasNegative = some((n: number) => n < 0)
 * hasNegative([1, -2, 3]) // true
 * hasNegative([1, 2, 3]) // false
 * ```
 */
const some = <T>(
	predicate: (value: T, index: number, array: Array<T>) => boolean,
) =>
(array: Array<T>): boolean => array.some(predicate)

export default some
