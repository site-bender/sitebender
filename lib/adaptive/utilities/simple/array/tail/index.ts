/**
 * Returns all elements of an array except the first
 * 
 * Returns a new array containing all elements after the first.
 * Empty arrays return empty arrays. Single-element arrays return
 * empty arrays. Useful for recursive processing.
 * 
 * @property idempotent - Getting tail of empty or single element array returns empty array
 * @param array - The array to get the tail from
 * @returns New array with all elements except the first
 * @example
 * ```typescript
 * tail([1, 2, 3, 4]) // [2, 3, 4]
 * tail(["a"]) // []
 * tail([]) // []
 * tail([1, 2]) // [2]
 * 
 * // Recursive processing
 * const sum = (arr: Array<number>): number =>
 *   arr.length === 0 ? 0 : arr[0] + sum(tail(arr))
 * sum([1, 2, 3, 4]) // 10
 * ```
 */
const tail = <T>(array: Array<T>): Array<T> => array.slice(1)

export default tail
