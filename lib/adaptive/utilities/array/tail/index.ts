/**
 * Returns all elements of an array except the first
 * 
 * @param arr - The array to get the tail from
 * @returns New array with all elements except the first
 * @example
 * ```typescript
 * tail([1, 2, 3, 4]) // [2, 3, 4]
 * tail(["a"]) // []
 * tail([]) // []
 * ```
 */
const tail = <T>(arr: Array<T>): Array<T> => arr.slice(1)

export default tail
