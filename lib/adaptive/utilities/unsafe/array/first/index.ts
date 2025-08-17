/**
 * Returns the first element of an array
 * 
 * Safe accessor that returns undefined for empty arrays rather than
 * throwing or returning undefined behavior.
 * 
 * @property idempotent - Getting first of single element array returns same element
 * @param array - The array to get the first element from
 * @returns The first element or undefined if array is empty
 * @example
 * ```typescript
 * first([1, 2, 3]) // 1
 * first(["a", "b"]) // "a"
 * first([]) // undefined
 * ```
 */
const first = <T>(array: Array<T>): T | undefined => array.at(0)

export default first
