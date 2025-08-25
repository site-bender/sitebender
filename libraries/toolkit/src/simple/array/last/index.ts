/**
 * Returns the last element of an array
 *
 * Safe accessor that returns undefined for empty arrays rather than
 * throwing or returning undefined behavior.
 *
 * @property idempotent - Getting last of single element array returns same element
 * @param array - The array to get the last element from
 * @returns The last element or undefined if array is empty
 * @example
 * ```typescript
 * last([1, 2, 3]) // 3
 * last(["a", "b"]) // "b"
 * last([42]) // 42
 * last([]) // undefined
 * ```
 */
const last = <T>(array: Array<T>): T | undefined => array.at(-1)

export default last
