/**
 * Creates an array by repeating an item a specified number of times
 * 
 * @param length - Number of times to repeat the item
 * @returns Function that takes an item and returns an array with item repeated
 * @example
 * ```typescript
 * repeat(3)("x") // ["x", "x", "x"]
 * repeat(2)(42) // [42, 42]
 * repeat(0)("y") // []
 * ```
 */
const repeat = (length: number) => <T>(item: T): Array<T> =>
	new Array<T>(length).fill(item)

export default repeat
