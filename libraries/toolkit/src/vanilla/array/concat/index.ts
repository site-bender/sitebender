/**
 * Concatenates two arrays in the order they will appear in the result
 *
 * Creates a new array containing all elements from the first array
 * followed by all elements from the second array. Parameters are taken
 * in the same order they will appear in the result.
 *
 * @curried (first) => (second) => result
 * @param first - The first array (will appear first in result)
 * @param second - The second array (will appear second in result)
 * @returns New array with first's elements followed by second's elements
 * @example
 * ```typescript
 * concat([1, 2])([3, 4]) // [1, 2, 3, 4]
 * concat([])([1, 2])     // [1, 2]
 * concat([1, 2])([])     // [1, 2]
 *
 * // Partial application for prefixing
 * const prependHeaders = concat([0, 0, 0])
 * prependHeaders([1, 2, 3]) // [0, 0, 0, 1, 2, 3]
 * prependHeaders([4, 5])    // [0, 0, 0, 4, 5]
 * ```
 */
const concat = <T>(first: Array<T>) => (second: Array<T>): Array<T> =>
	first.concat(second)

export default concat
