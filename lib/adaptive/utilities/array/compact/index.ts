/**
 * Removes null and undefined values from an array
 * 
 * Preserves all other values including falsy ones (0, false, "", NaN).
 * Uses type predicate to ensure correct output type.
 * 
 * @param array - Array that may contain null or undefined values
 * @returns New array with only non-null, non-undefined values
 * @example
 * ```typescript
 * compact([1, null, 2, undefined, 3]) // [1, 2, 3]
 * compact(["a", null, "b", undefined]) // ["a", "b"]
 * compact([0, false, "", null, NaN, undefined]) // [0, false, "", NaN]
 * ```
 */
const compact = <T>(array: Array<T | null | undefined>): Array<T> =>
	array.filter((item): item is T => item !== undefined && item !== null)

export default compact
