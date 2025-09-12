import isNullish from "../../validation/isNullish/index.ts"

/**
 * Sorts an array using multiple comparator functions
 *
 * Applies comparator functions in order until one returns a non-zero value,
 * providing multi-level sorting. Each comparator should return negative for
 * less than, positive for greater than, and zero for equal. Useful for
 * complex sorting with primary, secondary, tertiary sort keys, or different
 * sort directions per field.
 *
 * @param comparators - Array of comparator functions to apply in order
 * @param array - Array to sort
 * @returns New sorted array (original unchanged)
 * @pure
 * @curried
 * @immutable
 * @safe
 * @example
 * ```typescript
 * // Basic multi-level sort
 * const byAge = (a: any, b: any) => a.age - b.age
 * const byName = (a: any, b: any) => a.name.localeCompare(b.name)
 * const people = [
 *   { name: "Charlie", age: 30 },
 *   { name: "Alice", age: 25 },
 *   { name: "Bob", age: 25 }
 * ]
 * sortWith([byAge, byName])(people)
 * // [{ name: "Alice", age: 25 }, { name: "Bob", age: 25 }, { name: "Charlie", age: 30 }]
 *
 * // Different sort directions
 * const byPriceDesc = (a: any, b: any) => b.price - a.price
 * const byNameAsc = (a: any, b: any) => a.name.localeCompare(b.name)
 * const products = [
 *   { name: "Widget", price: 10 },
 *   { name: "Gadget", price: 20 },
 *   { name: "Doohickey", price: 20 }
 * ]
 * sortWith([byPriceDesc, byNameAsc])(products)
 * // Price descending, name ascending for ties
 *
 * // String sorting by length then alphabetically
 * const compareLength = (a: string, b: string) => a.length - b.length
 * const compareAlpha = (a: string, b: string) => a.localeCompare(b)
 * sortWith([compareLength, compareAlpha])(["cat", "dog", "ox"])
 * // ["ox", "cat", "dog"]
 *
 * // Edge cases
 * sortWith([])(["b", "a", "c"]) // ["b", "a", "c"] (no sorting)
 * sortWith([(a, b) => a - b])(null) // []
 * ```
 */
const sortWith = <T>(
	comparators: ReadonlyArray<(a: T, b: T) => number>,
) =>
(
	array: ReadonlyArray<T> | null | undefined,
): Array<T> => {
	if (isNullish(array) || !Array.isArray(array) || array.length === 0) {
		return []
	}

	if (comparators.length === 0) {
		return [...array]
	}

	// Create a copy and sort with combined comparator
	return [...array].sort((a, b) => {
		// Apply comparators in order until one returns non-zero
		for (const comparator of comparators) {
			const result = comparator(a, b)
			if (result !== 0) {
				return result
			}
		}
		// All comparators returned 0 (elements are equal)
		return 0
	})
}

export default sortWith
