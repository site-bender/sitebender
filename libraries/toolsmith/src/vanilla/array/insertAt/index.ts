//++ Inserts an item at a specific index
const insertAt =
	(index: number) => <T>(item: T) => (array: Array<T>): Array<T> =>
		index >= 0 && index <= array.length
			? [...array.slice(0, index), item, ...array.slice(index)]
			: array

export default insertAt

/*??
 | [EXAMPLE]
 | ```typescript
 | // Basic insertion
 | insertAt(1)("x")(["a", "b", "c"]) // ["a", "x", "b", "c"]
 | insertAt(0)("start")(["a", "b"])  // ["start", "a", "b"]
 | ```
 |
 | [EXAMPLE]
 | ```typescript
 | // Append at end
 | insertAt(3)("end")(["a", "b", "c"]) // ["a", "b", "c", "end"]
 | ```
 |
 | [EXAMPLE]
 | ```typescript
 | // Out of bounds - returns unchanged
 | insertAt(10)("x")([1, 2]) // [1, 2]
 | insertAt(-1)("x")([1, 2]) // [1, 2]
 | ```
 |
 | [EXAMPLE]
 | ```typescript
 | // Partial application
 | const addHeader = insertAt(0)("# Header")
 | addHeader(["line1", "line2"]) // ["# Header", "line1", "line2"]
 | ```
 */
