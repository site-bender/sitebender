import isNullish from "../../validation/isNullish/index.ts"
import not from "../../logic/not/index.ts"

/**
 * Returns elements in the first array that are not in the second array
 *
 * Performs a set difference operation, returning a new array containing
 * only the elements from the first array that don't appear in the second.
 * Uses strict equality (===) for comparison by default.
 *
 *
 * @param subtrahend - Array of elements to exclude
 * @param minuend - Array to filter elements from
 * @returns New array with elements from minuend not in subtrahend
 * @example
 * ```typescript
 * // Basic usage
 * difference([2, 3])([1, 2, 3, 4, 5])
 * // [1, 4, 5]
 *
 * difference(["b", "c"])(["a", "b", "c", "d"])
 * // ["a", "d"]
 *
 * // Edge cases
 * difference([])([1, 2, 3])          // [1, 2, 3]
 * difference([1, 2])([])              // []
 * difference([1, 2, 3])([1, 2, 3])   // []
 *
 * // Partial application for filtering
 * const removeStopWords = difference(["the", "a", "an", "and"])
 * removeStopWords(["the", "quick", "brown", "fox", "and", "lazy"])
 * // ["quick", "brown", "fox", "lazy"]
 *
 * // Objects use reference equality
 * const obj1 = { id: 1 }
 * const obj2 = { id: 2 }
 * difference([obj2])([obj1, obj2])  // [obj1]
 *
 * // Handle null/undefined
 * difference([1, 2])(null)     // []
 * difference(null)([1, 2, 3])  // [1, 2, 3]
 * ```
 * @pure
 * @immutable
 * @curried
 * @safe
 */
const difference = <T>(
	subtrahend: ReadonlyArray<T> | null | undefined,
) =>
(
	minuend: ReadonlyArray<T> | null | undefined,
): Array<T> => {
	if (isNullish(minuend)) {
		return []
	}

	if (
		isNullish(subtrahend) ||
		subtrahend.length === 0
	) {
		return [...minuend]
	}

	const set2 = new Set(subtrahend)

	// Use filter for O(n) time with O(1) lookups
	// This preserves duplicates in the minuend
	return minuend.filter((element) => not(set2.has(element)))
}

export default difference
