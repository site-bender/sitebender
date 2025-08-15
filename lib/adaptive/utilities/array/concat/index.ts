/**
 * Concatenates two arrays into a new array
 * 
 * Creates a new array containing all elements from the first array
 * followed by all elements from the second array.
 * 
 * @curried (second) => (first) => result
 * @param second - The array to append
 * @param first - The array to append to
 * @returns New array with first's elements followed by second's elements
 * @example
 * ```typescript
 * concat([3, 4])([1, 2]) // [1, 2, 3, 4]
 * concat([])([1, 2])     // [1, 2]
 * concat([3, 4])([])     // [3, 4]
 * 
 * // Useful for appending
 * const appendSuffix = concat([99, 100])
 * appendSuffix([1, 2, 3]) // [1, 2, 3, 99, 100]
 * ```
 */
const concat = <T>(second: Array<T>) => (first: Array<T>): Array<T> =>
	first.concat(second)

export default concat
