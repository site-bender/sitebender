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
 * ```
 */
type FlatArray<Arr, Depth extends number> = {
	"done": Arr
	"recur": Arr extends ReadonlyArray<infer InnerArr>
		? FlatArray<InnerArr, [-1, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20][Depth]>
		: Arr
}[Depth extends -1 ? "done" : "recur"]

const flatten = <D extends number>(depth: D) => 
	<T>(array: Array<T>): Array<FlatArray<T, D>> => 
		array.flat(depth) as Array<FlatArray<T, D>>

export default flatten
