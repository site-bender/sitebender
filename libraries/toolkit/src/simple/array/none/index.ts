/**
 * Tests whether no elements in an array satisfy a predicate function
 *
 * Returns true if predicate returns falsy for every element, or true for empty array.
 * Equivalent to !some(predicate). Short-circuits on first truthy result.
 *
 * @curried
 * @predicate
 * @param predicate - Function to test each element (item, index, array) => boolean
 * @param array - The array to test
 * @returns true if no elements satisfy predicate (or array is empty)
 * @example
 * ```typescript
 * // Basic usage
 * none((n: number) => n < 0)([1, 2, 3])
 * // true
 *
 * none((n: number) => n > 2)([1, 2, 3])
 * // false
 *
 * // Empty array (vacuous truth)
 * none((n: number) => n > 0)([])
 * // true
 *
 * // Validation - no negative numbers
 * const noNegatives = none((n: number) => n < 0)
 * noNegatives([1, 2, 3])
 * // true
 *
 * noNegatives([1, -2, 3])
 * // false
 *
 * // Check no empty strings
 * const noEmptyStrings = none((s: string) => s === "")
 * noEmptyStrings(["hello", "world"])
 * // true
 *
 * // Check no duplicates with index
 * const noDuplicates = (arr: number[]) =>
 *   none((x, i) => arr.indexOf(x) !== i)(arr)
 * noDuplicates([1, 2, 3])
 * // true (no duplicates)
 *
 * noDuplicates([1, 2, 2, 3])
 * // false (has duplicates)
 *
 * // Null/undefined safe
 * none((x) => x > 0)(null)
 * // true
 * ```
 * @pure
 * @immutable
 * @safe
 * @predicate
 */
const none = <T>(predicate: (item: T, index: number, array: Array<T>) => boolean) =>
(array: Array<T> | null | undefined): boolean => {
	if (array == null || !Array.isArray(array)) {
		return true
	}
	return !array.some(predicate)
}

export default none