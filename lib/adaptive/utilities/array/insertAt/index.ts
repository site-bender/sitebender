/**
 * Inserts an item at a specific index in an array
 * 
 * @param i - Index where to insert the item (must be valid index)
 * @returns Function that takes an item and returns a function that inserts it into an array
 * @example
 * ```typescript
 * insertAt(1)("x")([1, 2, 3]) // [1, "x", 2, 3]
 * insertAt(0)("start")(["a", "b"]) // ["start", "a", "b"]
 * insertAt(10)("x")([1, 2]) // [1, 2] (invalid index, returns original)
 * ```
 */
const insertAt = (i: number) => <T>(item: T) => (arr: Array<T>): Array<T> =>
	i >= 0 && i < arr.length + 1
		? arr.slice(0, i).concat([item]).concat(arr.slice(i))
		: arr

export default insertAt
