/**
 * Returns a new sorted array using an optional comparison function
 *
 * Creates a new array without modifying the original. If no compare function
 * provided, elements are sorted as strings in ascending order. Compare function
 * should return negative for a<b, positive for a>b, zero for equal.
 *
 * @param compareFn - Optional function that defines sort order (a, b) => number
 * @param array - The array to sort
 * @returns New array with elements sorted
 * @pure
 * @curried
 * @immutable
 * @idempotent
 * @safe
 * @example
 * ```typescript
 * // Basic usage
 * sort(undefined)([3, 1, 2]) // [1, 2, 3]
 * sort((a, b) => b - a)([1, 2, 3]) // [3, 2, 1]
 *
 * // String sorting
 * sort(undefined)(["c", "a", "b"]) // ["a", "b", "c"]
 *
 * // Custom comparator
 * const byAge = sort((a, b) => a.age - b.age)
 * byAge([{age: 30}, {age: 20}]) // [{age: 20}, {age: 30}]
 *
 * // Edge cases
 * sort(undefined)([]) // []
 * ```
 */
const sort = <T>(
	compareFn?: (a: T, b: T) => number,
) =>
(array: Array<T>): Array<T> => [...array].sort(compareFn)

export default sort
