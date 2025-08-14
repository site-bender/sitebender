/**
 * Returns the first element of an array (alias for first)
 * 
 * @param arr - The array to get the first element from
 * @returns The first element or undefined if array is empty
 * @example
 * ```typescript
 * head([1, 2, 3]) // 1
 * head([]) // undefined
 * ```
 */
const head = <T>(arr: Array<T>): T | undefined => arr.at(0)

export default head
