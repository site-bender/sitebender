/**
 * Maps and flattens an array in one operation
 * 
 * @param f - Function that transforms each element to a value or array (item, index, array) => U | Array<U>
 * @returns Function that takes an array and returns flattened mapped result
 * @example
 * ```typescript
 * flatMap((n: number) => [n, n * 2])([1, 2]) // [1, 2, 2, 4]
 * flatMap((s: string) => s.split(""))(["hi", "bye"]) // ["h", "i", "b", "y", "e"]
 * ```
 */
const flatMap =
	<T, U>(f: (item: T, index: number, array: Array<T>) => U | ReadonlyArray<U>) =>
	(arr: Array<T>): Array<U> =>
		arr.flatMap(f)

export default flatMap
