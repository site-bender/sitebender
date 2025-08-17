/**
 * Returns elements that are in either array but not both
 * 
 * Performs a symmetric difference operation (XOR for sets), returning
 * elements that appear in exactly one of the two arrays. Elements that
 * appear in both arrays are excluded. Uses strict equality (===) for
 * comparison.
 * 
 * @compatibility Uses native Set.symmetricDifference when available (ES2025, ~84% browser support).
 * Falls back to filter-based implementation for older browsers (Opera Mobile, IE).
 * 
 * @curried (array2) => (array1) => result
 * @param array2 - Second array to compare
 * @param array1 - First array to compare
 * @returns New array with elements in exactly one array
 * @example
 * ```typescript
 * // Basic symmetric difference
 * symmetricDifference([3, 4, 5])([1, 2, 3])
 * // [1, 2, 4, 5]
 * 
 * // Find unique elements
 * symmetricDifference([10, 20, 30])([20, 30, 40, 50])
 * // [10, 40, 50]
 * 
 * // String arrays
 * symmetricDifference(["b", "c", "d"])(["a", "b", "c"])
 * // ["a", "d"]
 * 
 * // No overlap (returns all elements)
 * symmetricDifference([4, 5, 6])([1, 2, 3])
 * // [1, 2, 3, 4, 5, 6]
 * 
 * // Complete overlap (returns empty)
 * symmetricDifference([1, 2, 3])([1, 2, 3])
 * // []
 * 
 * // Empty arrays
 * symmetricDifference([])([1, 2, 3])        // [1, 2, 3]
 * symmetricDifference([1, 2, 3])([])        // [1, 2, 3]
 * symmetricDifference([])([])               // []
 * 
 * // Duplicates are treated as single elements
 * symmetricDifference([3, 4])([1, 1, 2, 2, 3, 3])
 * // [1, 2, 4] (duplicates removed, 3 excluded as it's in both)
 * 
 * // Objects (uses reference equality)
 * const obj1 = { id: 1 }
 * const obj2 = { id: 2 }
 * const obj3 = { id: 3 }
 * const obj4 = { id: 4 }
 * symmetricDifference([obj2, obj3, obj4])([obj1, obj2, obj3])
 * // [obj1, obj4]
 * 
 * // Find changes between versions
 * const oldFeatures = ["feature1", "feature2", "feature3"]
 * const newFeatures = ["feature2", "feature3", "feature4"]
 * symmetricDifference(newFeatures)(oldFeatures)
 * // ["feature1", "feature4"] (removed and added features)
 * 
 * // Partial application for comparison
 * const compareToBaseline = symmetricDifference([1, 2, 3, 4, 5])
 * compareToBaseline([3, 4, 5, 6, 7])  // [6, 7, 1, 2]
 * compareToBaseline([1, 2, 3])        // [4, 5]
 * 
 * // Find unique items between lists
 * const list1 = ["apple", "banana", "orange"]
 * const list2 = ["banana", "orange", "grape"]
 * symmetricDifference(list2)(list1)
 * // ["apple", "grape"]
 * 
 * // Set operations
 * const setA = [1, 2, 3]
 * const setB = [3, 4, 5]
 * symmetricDifference(setB)(setA) // A ⊕ B (XOR)
 * // [1, 2, 4, 5]
 * 
 * // Toggle membership
 * const currentMembers = [1, 2, 3, 4]
 * const toggleMembers = [3, 4, 5, 6]
 * symmetricDifference(toggleMembers)(currentMembers)
 * // [1, 2, 5, 6] (3,4 removed as they were in both, 5,6 added)
 * 
 * // Handle null/undefined gracefully
 * symmetricDifference([1, 2])(null)        // [1, 2]
 * symmetricDifference([1, 2])(undefined)   // [1, 2]
 * symmetricDifference(null)([1, 2, 3])     // [1, 2, 3]
 * symmetricDifference(undefined)([1, 2])   // [1, 2]
 * ```
 * @property Immutable - doesn't modify input arrays
 * @property Set-operation - symmetric difference (XOR) of sets
 * @property Commutative - symmetricDifference(A)(B) equals symmetricDifference(B)(A)
 */
const symmetricDifference = <T>(
	array2: ReadonlyArray<T> | null | undefined
) => (
	array1: ReadonlyArray<T> | null | undefined
): Array<T> => {
	if (array1 == null || !Array.isArray(array1)) {
		if (array2 == null || !Array.isArray(array2)) {
			return []
		}
		return [...new Set(array2)]
	}
	
	if (array2 == null || !Array.isArray(array2)) {
		return [...new Set(array1)]
	}
	
	const set1 = new Set(array1)
	const set2 = new Set(array2)
	
	// Use native Set.symmetricDifference if available (ES2025)
	if ('symmetricDifference' in Set.prototype && typeof set1.symmetricDifference === 'function') {
		return Array.from(set1.symmetricDifference(set2))
	}
	
	// Fallback: Elements in array1 but not in array2
	const diff1 = array1.filter(element => !set2.has(element))
	// Elements in array2 but not in array1
	const diff2 = array2.filter(element => !set1.has(element))
	
	// Combine and remove duplicates
	return [...new Set([...diff1, ...diff2])]
}

export default symmetricDifference