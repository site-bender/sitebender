/**
 * Tests whether all elements in an array satisfy a predicate function
 *
 * Returns true if predicate returns truthy for every element, or true for empty array.
 * Short-circuits on first falsy result.
 *
 * @curried (predicate) => (array) => boolean
 * @param predicate - Function to test each element (item, index, array) => boolean
 * @param array - The array to test
 * @returns true if all elements satisfy predicate (or array is empty)
 * @example
 * ```typescript
 * all((n: number) => n > 0)([1, 2, 3]) // true
 * all((n: number) => n > 2)([1, 2, 3]) // false
 * all((n: number) => n > 0)([])        // true (vacuous truth)
 *
 * // Useful for validation
 * const allPositive = all((n: number) => n > 0)
 * allPositive([1, 2, 3]) // true
 * allPositive([1, -2, 3]) // false
 * ```
 */
const all =
	<T>(predicate: (item: T, index: number, array: Array<T>) => boolean) =>
	(array: Array<T>): boolean => array.every(predicate)

export default all
