/**
 * Filters an array based on a predicate function
 * 
 * @param predicate - Function that returns true for items to keep
 * @param array - The array to filter
 * @returns A new array with only items that pass the predicate
 * @example
 * ```typescript
 * filter((n: number) => n > 2)([1, 2, 3, 4]) // [3, 4]
 * filter((s: string) => s.length > 3)(["hi", "hello"]) // ["hello"]
 * ```
 */
export default function filter<T>(predicate: (item: T) => boolean) {
	return (array: Array<T>): Array<T> => array.filter(predicate)
}
