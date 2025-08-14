/**
 * Flattens an array by the specified depth
 * 
 * @param d - The depth to flatten (default: 1)
 * @param arr - The array to flatten
 * @returns The flattened array
 * @example
 * ```typescript
 * flatten(1)([[1, 2], [3, 4]]) // [1, 2, 3, 4]
 * flatten(2)([[[1]], [[2]]]) // [1, 2]
 * ```
 */
type FlatArray<Arr, Depth extends number> = {
	"done": Arr
	"recur": Arr extends ReadonlyArray<infer InnerArr>
		? FlatArray<InnerArr, [-1, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20][Depth]>
		: Arr
}[Depth extends -1 ? "done" : "recur"]

const flatten = <D extends number = 1>(d: D = 1 as D) => 
	<T>(arr: Array<T>): Array<FlatArray<T, D>> => 
		arr.flat(d) as Array<FlatArray<T, D>>

export default flatten
