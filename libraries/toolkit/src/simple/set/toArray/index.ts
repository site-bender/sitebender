import isNullish from "../../validation/isNullish/index.ts"

/**
 * Converts a Set to an Array
 *
 * Creates a new Array containing all elements from the Set in their
 * insertion order. This provides a functional way to convert Sets
 * to Arrays for use with array methods or when array indexing is needed.
 *
 * @pure
 * @immutable
 * @safe Returns empty array for null/undefined inputs
 * @param set - Set to convert to Array
 * @returns Array containing all Set elements
 * @example
 * // Basic conversion
 * toArray(new Set([1, 2, 3, 4, 5]))
 * // [1, 2, 3, 4, 5]
 *
 * // String Set
 * toArray(new Set(["hello", "world"]))
 * // ["hello", "world"]
 *
 * // Preserves insertion order
 * const mySet = new Set()
 * mySet.add("third")
 * mySet.add("first")
 * mySet.add("second")
 * toArray(mySet)
 * // ["third", "first", "second"]
 *
 * // Chain with array operations
 * const uniqueNumbers = new Set([1, 2, 3, 4, 5])
 * toArray(uniqueNumbers)
 *   .map(n => n * 2)
 *   .filter(n => n > 5)
 * // [6, 8, 10]
 *
 * // Empty or nullish
 * toArray(new Set())  // []
 * toArray(null)       // []
 * toArray(undefined)  // []
 */
const toArray = <T>(
	set: Set<T> | null | undefined,
): Array<T> => {
	if (isNullish(set) || !(set instanceof Set)) {
		return []
	}

	// Using Array.from for optimal performance
	return Array.from(set)
}

export default toArray
