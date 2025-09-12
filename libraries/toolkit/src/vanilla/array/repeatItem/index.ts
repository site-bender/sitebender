/**
 * Creates an array by repeating a specific value multiple times
 *
 * Takes item first for partial application of the value to repeat.
 * This is the inverse of repeat which takes the count first.
 * Returns empty array for counts <= 0. Note: for objects, all
 * positions reference the same object.
 *
 * @param item - The value to repeat
 * @param count - Number of times to repeat
 * @returns New array with item repeated count times
 * @pure
 * @curried
 * @immutable
 * @safe
 * @example
 * ```typescript
 * repeatItem("x")(3) // ["x", "x", "x"]
 * repeatItem(42)(2) // [42, 42]
 * repeatItem("y")(0) // []
 * repeatItem(true)(-1) // []
 *
 * // Create repeaters for specific values
 * const repeatNull = repeatItem(null)
 * repeatNull(5) // [null, null, null, null, null]
 *
 * // Compare with repeat:
 * // repeatItem("x")(3) vs repeat(3)("x") - both give ["x", "x", "x"]
 * ```
 */
const repeatItem = <T>(item: T) => (count: number): Array<T> =>
	count > 0 ? Array.from({ length: count }, () => item) : []

export default repeatItem
