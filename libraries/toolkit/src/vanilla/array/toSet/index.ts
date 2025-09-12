import isNullish from "../../validation/isNullish/index.ts"

/**
 * Converts an array to a Set
 *
 * Creates a new Set from an array, automatically removing duplicate values.
 * The Set will contain only unique elements from the original array,
 * maintaining insertion order. Returns empty Set for null/undefined.
 *
 * @param array - The array to convert to a Set
 * @returns A new Set containing the unique elements from the array
 * @pure
 * @immutable
 * @safe
 * @example
 * ```typescript
 * // Basic conversion
 * toSet([1, 2, 3, 2, 1])    // Set(3) { 1, 2, 3 }
 * toSet(["a", "b", "a"])     // Set(2) { "a", "b" }
 * toSet([])                  // Set(0) {}
 *
 * // With objects (reference equality)
 * const obj = { a: 1 }
 * toSet([obj, obj, { a: 1 }]) // Set(2) { {a: 1}, {a: 1} }
 *
 * // Use for deduplication
 * const unique = toSet([1, 2, 2, 3, 3, 3, 4])
 * unique.size                // 4
 *
 * // Convert back to array
 * Array.from(toSet([1, 2, 2, 3])) // [1, 2, 3]
 *
 * // Null/undefined handling
 * toSet(null)        // Set(0) {}
 * toSet(undefined)   // Set(0) {}
 * ```
 */
const toSet = <T>(array: Array<T> | null | undefined): Set<T> => {
	if (isNullish(array)) {
		return new Set<T>()
	}
	return new Set(array)
}

export default toSet
