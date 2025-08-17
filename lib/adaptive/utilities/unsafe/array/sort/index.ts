/**
 * Returns a new sorted array using an optional comparison function
 * 
 * Creates a new array without modifying the original. If no compare function
 * provided, elements are sorted as strings in ascending order. Compare function
 * should return negative for a<b, positive for a>b, zero for equal.
 * 
 * @property idempotent - Sorting an already sorted array gives same result
 * @curried (compareFn) => (array) => result
 * @param compareFn - Optional function that defines sort order (a, b) => number
 * @param array - The array to sort
 * @returns New array with elements sorted
 * @example
 * ```typescript
 * sort()([3, 1, 2]) // [1, 2, 3]
 * sort((a, b) => b - a)([1, 2, 3]) // [3, 2, 1]
 * sort()(["c", "a", "b"]) // ["a", "b", "c"]
 * sort((a, b) => a.length - b.length)(["aaa", "a", "aa"]) // ["a", "aa", "aaa"]
 * 
 * // Custom sorting
 * const byAge = sort((a, b) => a.age - b.age)
 * byAge([{age: 30}, {age: 20}, {age: 25}]) // [{age: 20}, {age: 25}, {age: 30}]
 * ```
 */
const sort = <T>(
	compareFn?: (a: T, b: T) => number,
) =>
(array: Array<T>): Array<T> => [...array].sort(compareFn)

export default sort
