/**
 * Removes duplicate elements from an array (alias for unique)
 *
 * Returns a new array with all duplicate elements removed, keeping only
 * the first occurrence of each unique element. Uses SameValueZero equality
 * for comparison. The term "nub" comes from Haskell and means to remove
 * duplicates. Order is preserved based on first occurrence. This is
 * functionally identical to unique but provided for those familiar with
 * Haskell terminology.
 *
 * @param array - Array to remove duplicates from
 * @returns New array with only unique elements
 * @example
 * ```typescript
 * // Basic duplicate removal
 * nub([1, 2, 3, 2, 1, 4])
 * // [1, 2, 3, 4]
 *
 * // String deduplication
 * nub(["apple", "banana", "apple", "cherry", "banana"])
 * // ["apple", "banana", "cherry"]
 *
 * // Mixed types
 * nub([1, "1", 2, "2", 1, "1"])
 * // [1, "1", 2, "2"]
 *
 * // Boolean values
 * nub([true, false, true, false, true])
 * // [true, false]
 *
 * // NaN handling (NaN === NaN in SameValueZero)
 * nub([NaN, 1, NaN, 2, NaN])
 * // [NaN, 1, 2]
 *
 * // Zero and negative zero (considered equal)
 * nub([0, -0, 0, -0])
 * // [0]
 *
 * // Empty array
 * nub([])
 * // []
 *
 * // Single element
 * nub([42])
 * // [42]
 *
 * // All unique elements
 * nub([1, 2, 3, 4, 5])
 * // [1, 2, 3, 4, 5]
 *
 * // All duplicate elements
 * nub([7, 7, 7, 7, 7])
 * // [7]
 * ```
 * @pure
 * @immutable
 * @safe
 */
const nub = <T>(
	array: ReadonlyArray<T> | null | undefined,
): Array<T> => {
	if (array == null || !Array.isArray(array)) {
		return []
	}

	// Use Set for efficient deduplication (O(n) complexity)
	// Set uses SameValueZero equality, which is what we want
	return [...new Set(array)]
}

export default nub