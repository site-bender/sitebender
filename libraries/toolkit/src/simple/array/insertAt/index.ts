/**
 * Inserts an item at a specific index in an array
 * 
 * Returns a new array with the item inserted at the specified position.
 * If index is out of bounds (negative or > length), returns original array unchanged.
 * Index equal to length appends to the end.
 * 
 * @curried (index) => (item) => (array) => result
 * @param index - Position to insert at (0-based)
 * @param item - The item to insert
 * @param array - The array to insert into
 * @returns New array with item inserted at index
 * @example
 * ```typescript
 * insertAt(1)("x")(["a", "b", "c"]) // ["a", "x", "b", "c"]
 * insertAt(0)("start")(["a", "b"])  // ["start", "a", "b"]
 * insertAt(3)("end")(["a", "b", "c"]) // ["a", "b", "c", "end"]
 * insertAt(10)("x")([1, 2]) // [1, 2] (out of bounds, unchanged)
 * 
 * // Useful for building lists
 * const addHeader = insertAt(0)("# Header")
 * addHeader(["line1", "line2"]) // ["# Header", "line1", "line2"]
 * ```
 */
const insertAt = (index: number) => <T>(item: T) => (array: Array<T>): Array<T> =>
	index >= 0 && index <= array.length
		? [...array.slice(0, index), item, ...array.slice(index)]
		: array

export default insertAt
