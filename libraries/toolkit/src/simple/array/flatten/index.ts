/**
 * Flattens nested arrays by the specified depth
 *
 * Recursively concatenates sub-arrays up to the specified depth level.
 * Depth of 1 flattens one level, Infinity flattens all levels.
 *
 * @property idempotent - Flattening an already flat array to same depth gives same result
 * @curried (depth) => (array) => result
 * @param depth - Number of levels to flatten (1 = one level, Infinity = all levels)
 * @param array - The nested array to flatten
 * @returns New array flattened to the specified depth
 * @example
 * ```typescript
 * flatten(1)([[1, 2], [3, 4]]) // [1, 2, 3, 4]
 * flatten(2)([[[1]], [[2]]]) // [1, 2]
 * flatten(Infinity)([[[1]], [[[2]]]]) // [1, 2]
 *
 * // Common use: flatten one level
 * const flattenOne = flatten(1)
 * flattenOne([[1, 2], [3], [4, 5]]) // [1, 2, 3, 4, 5]
 *
 * // Handle null/undefined gracefully
 * flatten(1)(null) // []
 * flatten(1)(undefined) // []
 * ```
 */
const flatten = <T, D extends number = 1>(
	depth: D = 1 as D,
) =>
(
	array: ReadonlyArray<T> | null | undefined,
): Array<T extends ReadonlyArray<infer U> ? U : T> => {
	if (array == null || !Array.isArray(array)) {
		return []
	}

	return array.flat(depth) as Array<T extends ReadonlyArray<infer U> ? U : T>
}

export default flatten
