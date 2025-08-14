/**
 * Returns a new array with elements in reverse order
 * 
 * @param arr - The array to reverse
 * @returns New array with elements in reverse order
 * @example
 * ```typescript
 * reverse([1, 2, 3]) // [3, 2, 1]
 * reverse(["a", "b", "c"]) // ["c", "b", "a"]
 * ```
 */
const reverse = <T>(arr: Array<T>): Array<T> => arr.toReversed()

export default reverse
