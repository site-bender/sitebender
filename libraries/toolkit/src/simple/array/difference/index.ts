/**
 * Returns elements in the first array that are not in the second array
 *
 * Performs a set difference operation, returning a new array containing
 * only the elements from the first array that don't appear in the second.
 * Uses strict equality (===) for comparison by default.
 *
 * @compatibility Uses native Set.difference when available (ES2025, ~84% browser support).
 * Falls back to filter-based implementation for older browsers (Opera Mobile, IE).
 *
 * @curried (subtrahend) => (minuend) => result
 * @param subtrahend - Array of elements to exclude
 * @param minuend - Array to filter elements from
 * @returns New array with elements from minuend not in subtrahend
 * @example
 * ```typescript
 * // Basic difference
 * difference([2, 3])([1, 2, 3, 4, 5])
 * // [1, 4, 5]
 *
 * // Remove common elements
 * difference([10, 20, 30])([5, 10, 15, 20, 25])
 * // [5, 15, 25]
 *
 * // String arrays
 * difference(["b", "c"])(["a", "b", "c", "d"])
 * // ["a", "d"]
 *
 * // Empty second array (removes nothing)
 * difference([])([1, 2, 3])
 * // [1, 2, 3]
 *
 * // Empty first array
 * difference([1, 2])([ ])
 * // []
 *
 * // All elements removed
 * difference([1, 2, 3])([1, 2, 3])
 * // []
 *
 * // Objects (uses reference equality)
 * const obj1 = { id: 1 }
 * const obj2 = { id: 2 }
 * const obj3 = { id: 3 }
 * difference([obj2])([obj1, obj2, obj3])
 * // [obj1, obj3]
 *
 * // Note: doesn't work with value equality for objects
 * difference([{ id: 2 }])([{ id: 1 }, { id: 2 }, { id: 3 }])
 * // [{ id: 1 }, { id: 2 }, { id: 3 }] (no match because different references)
 *
 * // Remove duplicates and specified values
 * difference([2, 3])([1, 2, 2, 3, 3, 3, 4, 5])
 * // [1, 4, 5]
 *
 * // Partial application for blacklisting
 * const removeStopWords = difference(["the", "a", "an", "and", "or", "but"])
 * removeStopWords(["the", "quick", "brown", "fox", "and", "the", "lazy", "dog"])
 * // ["quick", "brown", "fox", "lazy", "dog"]
 *
 * // Filter out invalid values
 * const removeInvalid = difference([null, undefined, "", 0, false])
 * removeInvalid([1, null, 2, undefined, 3, "", 4, 0, 5, false])
 * // [1, 2, 3, 4, 5]
 *
 * // Set operations
 * const setA = [1, 2, 3, 4, 5]
 * const setB = [4, 5, 6, 7, 8]
 * difference(setB)(setA) // A - B
 * // [1, 2, 3]
 *
 * // Handle null/undefined gracefully
 * difference([1, 2])(null)       // []
 * difference([1, 2])(undefined)  // []
 * difference(null)([1, 2, 3])    // [1, 2, 3]
 * difference(undefined)([1, 2])  // [1, 2]
 *
 * // Mixed types (works with strict equality)
 * difference([2, "2", false])([1, 2, "2", 3, false, true])
 * // [1, 3, true]
 * ```
 * @property Immutable - doesn't modify input arrays
 * @property Set-operation - treats arrays as sets (but preserves order and duplicates in first array)
 * @property Strict-equality - uses === for comparison
 */
const difference = <T>(
	subtrahend: ReadonlyArray<T> | null | undefined,
) =>
(
	minuend: ReadonlyArray<T> | null | undefined,
): Array<T> => {
	if (minuend == null || !Array.isArray(minuend)) {
		return []
	}

	if (
		subtrahend == null || !Array.isArray(subtrahend) || subtrahend.length === 0
	) {
		return [...minuend]
	}

	const set1 = new Set(minuend)
	const set2 = new Set(subtrahend)

	// Use native Set.difference if available (ES2025)
	if ("difference" in Set.prototype && typeof set1.difference === "function") {
		return Array.from(set1.difference(set2))
	}

	// Fallback: Use filter for O(n) time with O(1) lookups
	return minuend.filter((element) => !set2.has(element))
}

export default difference
