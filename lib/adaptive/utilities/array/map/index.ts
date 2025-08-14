/**
 * Maps an array to a new array using a transformation function
 * 
 * @param fn - Function that transforms each element
 * @param array - The array to map
 * @returns A new array with transformed elements
 * @example
 * ```typescript
 * map((n: number) => n * 2)([1, 2, 3]) // [2, 4, 6]
 * map((s: string) => s.toUpperCase())(["a", "b"]) // ["A", "B"]
 * ```
 */
export default function map<T, U>(fn: (item: T, index?: number) => U) {
	return (array: Array<T>): Array<U> => array.map(fn)
}
