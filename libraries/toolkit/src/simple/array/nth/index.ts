/**
 * Returns the element at a specific index in an array
 *
 * Safe accessor that supports negative indices (counting from end).
 * Returns undefined for out-of-bounds indices rather than throwing.
 *
 * @curried (index) => (array) => result
 * @param index - Zero-based index (negative counts from end)
 * @param array - The array to access
 * @returns Element at index or undefined if out of bounds
 * @example
 * ```typescript
 * nth(1)([1, 2, 3]) // 2
 * nth(0)(["a", "b", "c"]) // "a"
 * nth(-1)([1, 2, 3]) // 3 (last element)
 * nth(10)([1, 2, 3]) // undefined
 *
 * // Access specific positions
 * const getSecond = nth(1)
 * getSecond(["first", "second", "third"]) // "second"
 * ```
 */
const nth = (index: number) => <T>(array: Array<T>): T | undefined =>
	array.at(index)

export default nth
