import { isNullish } from "../../validation/isNullish/index.ts"

/**
 * Tests whether no elements in an array satisfy a predicate function
 *
 * Returns true if predicate returns falsy for every element, or true for empty array.
 * Equivalent to !some(predicate). Short-circuits on first truthy result.
 *
 * @param predicate - Function to test each element (item, index, array) => boolean
 * @param array - The array to test
 * @returns true if no elements satisfy predicate (or array is empty)
 *
 * @pure
 * @curried
 * @immutable
 * @safe
 * @predicate
 *
 * @example
 * ```typescript
 * // Basic usage
 * none((n: number) => n < 0)([1, 2, 3]) // true
 * none((n: number) => n > 2)([1, 2, 3]) // false
 *
 * // Validation - no negative numbers
 * const noNegatives = none((n: number) => n < 0)
 * noNegatives([1, 2, 3]) // true
 * noNegatives([1, -2, 3]) // false
 *
 * // Check no empty strings
 * const noEmptyStrings = none((s: string) => s === "")
 * noEmptyStrings(["hello", "world"]) // true
 *
 * // Edge cases
 * none((n: number) => n > 0)([]) // true (vacuous truth)
 * none((x: number) => x > 0)(null) // true
 * none((x: number) => x > 0)(undefined) // true
 * ```
 */
const none =
	<T>(predicate: (item: T, index: number, array: Array<T>) => boolean) =>
	(array: Array<T> | null | undefined): boolean => {
		if (isNullish(array) || !Array.isArray(array)) {
			return true
		}
		return !array.some(predicate)
	}

export default none
