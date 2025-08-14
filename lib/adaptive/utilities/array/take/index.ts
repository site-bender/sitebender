/**
 * Takes the first n elements from an array
 * 
 * @param n - Number of elements to take from the start (zero or negative returns empty array)
 * @returns Function that takes an array and returns first n elements
 * @example
 * ```typescript
 * take(3)([1, 2, 3, 4, 5]) // [1, 2, 3]
 * take(2)(["a", "b", "c"]) // ["a", "b"]
 * take(0)([1, 2, 3]) // []
 * ```
 */
const take =
	(n: number) => <T>(arr: Array<T>): Array<T> => (n > 0 ? arr.slice(0, n) : [])

export default take
