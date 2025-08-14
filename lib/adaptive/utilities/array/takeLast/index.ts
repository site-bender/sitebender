/**
 * Takes the last n elements from an array
 * 
 * @param n - Number of elements to take from the end (zero or negative returns empty array)
 * @returns Function that takes an array and returns last n elements
 * @example
 * ```typescript
 * takeLast(3)([1, 2, 3, 4, 5]) // [3, 4, 5]
 * takeLast(2)(["a", "b", "c"]) // ["b", "c"]
 * takeLast(0)([1, 2, 3]) // []
 * ```
 */
const takeLast =
	(n: number) => <T>(arr: Array<T>): Array<T> => (n > 0 ? arr.slice(-n) : [])

export default takeLast
