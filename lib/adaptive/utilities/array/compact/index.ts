/**
 * Removes null and undefined values from an array
 * 
 * @param arr - Array that may contain null or undefined values
 * @returns New array with null and undefined values removed
 * @example
 * ```typescript
 * compact([1, null, 2, undefined, 3]) // [1, 2, 3]
 * compact(["a", null, "b", undefined]) // ["a", "b"]
 * ```
 */
const compact = <T>(arr: Array<T | null | undefined>): Array<T> =>
	arr.filter((item): item is T => item !== undefined && item !== null)

export default compact
