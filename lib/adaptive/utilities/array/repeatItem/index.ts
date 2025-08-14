/**
 * Creates an array by repeating a specific item a number of times
 * 
 * @param item - The item to repeat
 * @returns Function that takes a length and returns an array with item repeated
 * @example
 * ```typescript
 * repeatItem("x")(3) // ["x", "x", "x"]
 * repeatItem(42)(2) // [42, 42]
 * repeatItem("y")(0) // []
 * ```
 */
const repeatItem = <T>(item: T) => (length: number): Array<T> =>
	new Array<T>(length).fill(item)

export default repeatItem
