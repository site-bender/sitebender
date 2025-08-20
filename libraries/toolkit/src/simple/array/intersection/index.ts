/**
 * Returns elements that exist in both arrays
 *
 * Performs a set intersection operation, returning a new array containing
 * only the elements that appear in both input arrays. Uses strict equality
 * (===) for comparison. Preserves the order from the first array.
 *
 * @compatibility Uses native Set.intersection when available (ES2025, ~84% browser support).
 * Falls back to filter-based implementation for older browsers (Opera Mobile, IE).
 *
 * @curried (array2) => (array1) => result
 * @param array2 - Second array to intersect with
 * @param array1 - First array (determines order of results)
 * @returns New array with elements present in both arrays
 * @example
 * ```typescript
 * // Basic intersection
 * intersection([2, 3, 4])([1, 2, 3, 5])
 * // [2, 3]
 *
 * // Find common elements
 * intersection([10, 20, 30])([5, 10, 15, 20, 25, 30, 35])
 * // [10, 20, 30]
 *
 * // String arrays
 * intersection(["b", "c", "d"])(["a", "b", "c", "e"])
 * // ["b", "c"]
 *
 * // No common elements
 * intersection([4, 5, 6])([1, 2, 3])
 * // []
 *
 * // Empty array
 * intersection([])([1, 2, 3])
 * // []
 *
 * // All elements in common
 * intersection([1, 2, 3])([1, 2, 3])
 * // [1, 2, 3]
 *
 * // Order preserved from first array
 * intersection([3, 2, 1])([1, 2, 3])
 * // [1, 2, 3] (order from first array)
 *
 * // Duplicates in first array are preserved
 * intersection([2, 3])([1, 2, 2, 3, 3, 3])
 * // [2, 2, 3, 3, 3]
 *
 * // Objects (uses reference equality)
 * const obj1 = { id: 1 }
 * const obj2 = { id: 2 }
 * const obj3 = { id: 3 }
 * intersection([obj2, obj3])([obj1, obj2, obj3])
 * // [obj2, obj3]
 *
 * // Partial application for filtering
 * const onlyValidIds = intersection([1, 2, 3, 4, 5])
 * onlyValidIds([3, 4, 5, 6, 7]) // [3, 4, 5]
 * onlyValidIds([1, 2, 10])       // [1, 2]
 *
 * // Find common tags
 * const requiredTags = ["javascript", "functional"]
 * const findArticlesWithTags = intersection(requiredTags)
 * findArticlesWithTags(["javascript", "functional", "tutorial"])  // ["javascript", "functional"]
 * findArticlesWithTags(["javascript", "react"])                   // ["javascript"]
 *
 * // Set operations
 * const setA = [1, 2, 3, 4, 5]
 * const setB = [4, 5, 6, 7, 8]
 * intersection(setB)(setA) // A ∩ B
 * // [4, 5]
 *
 * // Handle null/undefined gracefully
 * intersection([1, 2])(null)       // []
 * intersection([1, 2])(undefined)  // []
 * intersection(null)([1, 2, 3])    // []
 * intersection(undefined)([1, 2])  // []
 * ```
 * @property Immutable - doesn't modify input arrays
 * @property Set-operation - treats arrays as sets for comparison
 * @property Order-preserving - maintains order from first array
 */
const intersection = <T>(
	array2: ReadonlyArray<T> | null | undefined
) => (
	array1: ReadonlyArray<T> | null | undefined
): Array<T> => {
	if (array1 == null || !Array.isArray(array1) || array1.length === 0) {
		return []
	}

	if (array2 == null || !Array.isArray(array2) || array2.length === 0) {
		return []
	}

	const set1 = new Set(array1)
	const set2 = new Set(array2)

	// Use native Set.intersection if available (ES2025)
	if ('intersection' in Set.prototype && typeof set1.intersection === 'function') {
		return Array.from(set1.intersection(set2))
	}

	// Fallback: Use filter for O(n) time with O(1) lookups
	return array1.filter(element => set2.has(element))
}

export default intersection
