import isNullish from "../../validation/isNullish/index.ts"

/**
 * Checks if an array ends with the provided suffix array
 *
 * Determines whether an array ends with the exact sequence of elements
 * from another array. Uses SameValueZero equality for element comparison.
 * The suffix must match the end of the array exactly in both order and
 * values. Useful for pattern matching, validation, and sequence detection.
 *
 * @pure
 * @immutable
 * @curried
 * @predicate
 * @param suffix - Array sequence to check for at the end
 * @param array - Array to check
 * @returns True if array ends with suffix, false otherwise
 * @example
 * ```typescript
 * // Basic usage
 * endsWith([3, 4, 5])([1, 2, 3, 4, 5])  // true
 * endsWith([2, 3])([1, 2, 3, 4, 5])     // false (not at end)
 *
 * // Edge cases
 * endsWith([])([1, 2, 3])                // true (empty suffix)
 * endsWith([1, 2, 3, 4])([2, 3, 4])      // false (suffix longer)
 *
 * // NaN handling (SameValueZero equality)
 * endsWith([NaN, 3])([1, 2, NaN, 3])     // true
 *
 * // Partial application
 * const endsWithJpg = endsWith([".jpg"])
 * endsWithJpg(["image", ".jpg"])        // true
 * endsWithJpg(["photo", ".png"])        // false
 * ```
 */
const endsWith = <T>(
	suffix: ReadonlyArray<T> | null | undefined,
) =>
(
	array: ReadonlyArray<T> | null | undefined,
): boolean => {
	if (isNullish(array) || !Array.isArray(array)) {
		return false
	}

	if (isNullish(suffix) || !Array.isArray(suffix)) {
		return false
	}

	if (suffix.length === 0) {
		return true
	}

	if (suffix.length > array.length) {
		return false
	}

	const startIndex = array.length - suffix.length

	return suffix.every((value, i) => Object.is(array[startIndex + i], value))
}

export default endsWith
