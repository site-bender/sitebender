import isNotUndefined from "../../validation/isNotUndefined/index.ts"

/**
 * Removes undefined values from an array
 *
 * Preserves all other values including falsy ones (0, false, "", NaN, null).
 * Uses type predicate to ensure correct output type.
 *
 * @param array - Array that may contain null or undefined values
 * @returns New array with only defined values
 * @example
 * ```typescript
 * compact([1, null, 2, undefined, 3]) // [1, null, 2, 3]
 * compact(["a", null, "b", undefined]) // ["a", null, "b"]
 * compact([0, false, "", null, NaN, undefined]) // [0, false, "", null, NaN]
 * ```
 */
const compact = <T>(array: Array<T | null | undefined>): Array<T> =>
	array.filter((item): item is T => isNotUndefined(item))

export default compact
