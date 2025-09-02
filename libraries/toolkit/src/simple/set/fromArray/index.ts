import isNullish from "../../validation/isNullish/index.ts"

/**
 * Creates a Set from an array
 *
 * Converts an array to a Set, automatically removing duplicate values.
 * Elements are compared using SameValueZero equality. The order of
 * elements in the Set follows their first occurrence in the array.
 *
 * @param array - Array to convert to Set
 * @returns New Set containing unique elements from the array
 * @example
 * ```typescript
 * // Basic usage
 * fromArray([1, 2, 3, 4, 5])           // Set { 1, 2, 3, 4, 5 }
 * fromArray([1, 2, 2, 3, 3, 3, 4])    // Set { 1, 2, 3, 4 }
 * fromArray(["apple", "banana", "apple"])  // Set { "apple", "banana" }
 *
 * // Edge cases
 * fromArray([])          // Set { }
 * fromArray(null)        // Set { }
 * fromArray(undefined)   // Set { }
 *
 * // Special values
 * fromArray([NaN, NaN, NaN])           // Set { NaN }
 * fromArray([0, -0, +0])               // Set { 0 }
 * fromArray([null, undefined, null])   // Set { null, undefined }
 *
 * // Preserve order
 * fromArray(["c", "a", "b", "a", "c"])  // Set { "c", "a", "b" }
 * ```
 * @pure
 * @immutable
 * @safe
 */
const fromArray = <T>(
	array: ReadonlyArray<T> | null | undefined,
): Set<T> => {
	if (isNullish(array) || !Array.isArray(array)) {
		return new Set()
	}

	return new Set(array)
}

export default fromArray
