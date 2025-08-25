/**
 * Creates an array by repeating a value a specified number of times
 *
 * Takes count first for partial application of the repetition count.
 * This is the inverse of repeatItem which takes the item first.
 * Returns empty array for counts <= 0. Note: for objects, all array
 * positions reference the same object (not cloned).
 *
 * @curried (count) => (item) => result
 * @param count - Number of times to repeat
 * @param item - The value to repeat
 * @returns New array with item repeated count times
 * @example
 * ```typescript
 * repeat(3)("x") // ["x", "x", "x"]
 * repeat(2)(42) // [42, 42]
 * repeat(0)("y") // []
 * repeat(-1)("z") // []
 *
 * // Create fixed-size array generators
 * const triple = repeat(3)
 * triple("a") // ["a", "a", "a"]
 * triple(null) // [null, null, null]
 *
 * // Compare with repeatItem:
 * // repeat(3)("x") vs repeatItem("x")(3) - both give ["x", "x", "x"]
 * ```
 */
const repeat = (count: number) => <T>(item: T): Array<T> =>
	count > 0 ? new Array<T>(count).fill(item) : []

export default repeat
