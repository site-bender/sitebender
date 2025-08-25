/**
 * Tests whether no elements in an array satisfy a predicate function
 *
 * Returns true if predicate returns falsy for every element, or true for empty array.
 * Equivalent to !some(predicate). Short-circuits on first truthy result.
 *
 * @curried (predicate) => (array) => boolean
 * @param predicate - Function to test each element (item, index, array) => boolean
 * @param array - The array to test
 * @returns true if no elements satisfy predicate (or array is empty)
 * @example
 * ```typescript
 * none((n: number) => n < 0)([1, 2, 3]) // true
 * none((n: number) => n > 2)([1, 2, 3]) // false
 * none((n: number) => n > 0)([])        // true (vacuous truth)
 *
 * // Useful for validation
 * const noNegatives = none((n: number) => n < 0)
 * noNegatives([1, 2, 3]) // true
 * noNegatives([1, -2, 3]) // false
 * ```
 */
const none =
	<T>(predicate: (item: T, index: number, array: Array<T>) => boolean) =>
	(array: Array<T>): boolean => !array.some(predicate)

export default none
