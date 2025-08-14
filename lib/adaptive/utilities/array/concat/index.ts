/**
 * Concatenates two arrays into a new array
 * 
 * @param first - First array to concatenate (defaults to empty array)
 * @returns Function that takes the second array and returns concatenated result
 * @example
 * ```typescript
 * concat([1, 2])([3, 4]) // [1, 2, 3, 4]
 * concat(["a"])([]) // ["a"]
 * ```
 */
const concat = <T>(first: Array<T> = []) => (second: Array<T> = []): Array<T> =>
	first.concat(second)

export default concat
