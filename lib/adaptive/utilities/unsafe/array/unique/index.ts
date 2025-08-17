/**
 * Returns a new array with duplicate elements removed
 * 
 * Uses Set internally for efficient deduplication. Preserves order
 * of first occurrence. Works with primitive values using strict
 * equality. Objects are compared by reference.
 * 
 * @property idempotent - Applying unique multiple times gives same result
 * @param array - The array to remove duplicates from
 * @returns New array with only unique elements
 * @example
 * ```typescript
 * unique([1, 2, 2, 3, 1, 4]) // [1, 2, 3, 4]
 * unique(["a", "b", "a", "c"]) // ["a", "b", "c"]
 * unique([]) // []
 * unique([NaN, NaN, 0, -0]) // [NaN, 0]
 * 
 * // Remove duplicate IDs
 * const ids = [1, 2, 3, 2, 1, 4, 3]
 * unique(ids) // [1, 2, 3, 4]
 * ```
 */
const unique = <T>(array: Array<T>): Array<T> =>
	Array.from(new Set(array))

export default unique
