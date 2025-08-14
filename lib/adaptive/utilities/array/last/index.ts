/**
 * Returns the last element of an array
 * 
 * @param arr - The array to get the last element from
 * @returns The last element or undefined if array is empty
 * @example
 * ```typescript
 * last([1, 2, 3]) // 3
 * last([]) // undefined
 * ```
 */
const last = <T>(arr: Array<T>): T | undefined => arr.at(-1)

export default last
