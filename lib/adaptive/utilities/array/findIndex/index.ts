/**
 * Finds the index of the first element that matches a predicate function
 * 
 * @param f - Function to test each element (item, index, array) => boolean
 * @returns Function that takes an array and returns the index of first match or undefined
 * @example
 * ```typescript
 * findIndex((n: number) => n > 2)([1, 2, 3, 4]) // 2
 * findIndex((s: string) => s.startsWith("h"))(["apple", "hello"]) // 1
 * findIndex((n: number) => n > 10)([1, 2, 3]) // undefined
 * ```
 */
const findIndex =
	<T>(f: (item: T, index: number, array: Array<T>) => boolean) =>
	(arr: Array<T>): number | undefined => {
		const index = arr.findIndex(f)

		return index === -1 ? undefined : index
	}

export default findIndex
