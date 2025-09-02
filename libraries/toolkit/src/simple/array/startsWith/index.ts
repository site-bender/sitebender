import isNullish from "../../validation/isNullish/index.ts"

/**
 * Checks if an array starts with the provided prefix array
 *
 * Determines whether an array begins with the exact sequence of elements
 * from another array. Uses SameValueZero equality for comparisons. Returns
 * true if the array starts with all elements of the prefix in order. Empty
 * prefix always returns true. Useful for pattern matching, sequence
 * validation, or prefix checking.
 *
 * @param prefix - Array of elements to check for at the start
 * @param array - Array to check
 * @returns True if array starts with prefix, false otherwise
 * @example
 * ```typescript
 * // Basic usage
 * startsWith([1, 2])([1, 2, 3, 4, 5])  // true
 * startsWith([1, 3])([1, 2, 3, 4])      // false
 *
 * // Empty prefix (always true)
 * startsWith([])([1, 2, 3])  // true
 * startsWith([])([])          // true
 *
 * // Partial application
 * const isApiV2 = startsWith(["api", "v2"])
 * isApiV2(["api", "v2", "users"])    // true
 * isApiV2(["api", "v1", "users"])    // false
 *
 * // Command pattern matching
 * const command = ["git", "commit", "-m", "message"]
 * startsWith(["git", "commit"])(command)  // true
 * startsWith(["git", "push"])(command)    // false
 *
 * // NaN handling (SameValueZero equality)
 * startsWith([NaN])([NaN, 1, 2])  // true
 *
 * // Null/undefined handling
 * startsWith([1, 2])(null)       // false
 * startsWith(null)([1, 2])       // false
 *
 * // Object reference equality
 * const obj = { id: 1 }
 * startsWith([obj])([obj, { id: 2 }])  // true
 * startsWith([{ id: 1 }])([{ id: 1 }]) // false
 * ```
 * @pure
 * @curried
 * @predicate
 * @safe
 */
const startsWith = <T>(
	prefix: ReadonlyArray<T> | null | undefined,
) =>
(
	array: ReadonlyArray<T> | null | undefined,
): boolean => {
	if (isNullish(prefix) || isNullish(array)) {
		return false
	}

	if (!Array.isArray(prefix) || !Array.isArray(array)) {
		return false
	}

	if (prefix.length === 0) {
		return true
	}

	if (prefix.length > array.length) {
		return false
	}

	// Check each element of the prefix using every
	return prefix.every((value, index) => Object.is(value, array[index]))
}

export default startsWith
