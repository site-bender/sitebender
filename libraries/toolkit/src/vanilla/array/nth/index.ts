import isNullish from "../../validation/isNullish/index.ts"

/**
 * Returns the element at a specific index in an array
 *
 * Safe accessor that supports negative indices (counting from end).
 * Returns undefined for out-of-bounds indices rather than throwing.
 *
 * @param index - Zero-based index (negative counts from end)
 * @param array - The array to access
 * @returns Element at index or undefined if out of bounds
 *
 * @pure
 * @curried
 * @immutable
 * @safe
 *
 * @example
 * ```typescript
 * // Basic access
 * nth(1)([1, 2, 3]) // 2
 * nth(0)(["a", "b", "c"]) // "a"
 *
 * // Negative indices (from end)
 * nth(-1)([1, 2, 3]) // 3 (last element)
 * nth(-2)([1, 2, 3, 4]) // 3 (second to last)
 *
 * // Access specific positions
 * const getSecond = nth(1)
 * getSecond(["first", "second", "third"]) // "second"
 *
 * const getLast = nth(-1)
 * getLast([10, 20, 30]) // 30
 *
 * // Edge cases
 * nth(10)([1, 2, 3]) // undefined (out of bounds)
 * nth(0)([]) // undefined
 * nth(0)(null) // undefined
 * nth(0)(undefined) // undefined
 * ```
 */
const nth = (index: number) =>
<T>(
	array: Array<T> | null | undefined,
): T | undefined => {
	if (isNullish(array) || !Array.isArray(array)) {
		return undefined
	}
	return array.at(index)
}

export default nth
