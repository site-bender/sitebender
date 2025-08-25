/**
 * Returns the first element of an array (alias for first)
 *
 * Traditional FP name for accessing the first element. Safe accessor
 * that returns undefined for empty arrays.
 *
 * @property idempotent - Getting head of single element array returns same element
 * @param array - The array to get the first element from
 * @returns The first element or undefined if array is empty
 * @example
 * ```typescript
 * head([1, 2, 3]) // 1
 * head(["a", "b"]) // "a"
 * head([]) // undefined
 * ```
 */
const head = <T>(array: Array<T>): T | undefined => array.at(0)

export default head
