/**
 * Returns the union of two arrays (all unique elements from both)
 * 
 * Combines two arrays and returns all unique elements. Elements that
 * appear in either or both arrays are included once. Uses strict
 * equality (===) for comparison. Order is preserved: first array's
 * elements come first, then unique elements from the second array.
 * 
 * @compatibility Uses native Set.union when available (ES2025, ~84% browser support).
 * Falls back to Set-based implementation for older browsers (Opera Mobile, IE).
 * 
 * @curried (array2) => (array1) => result
 * @param array2 - Second array to union with
 * @param array1 - First array (determines initial order)
 * @returns New array with all unique elements from both arrays
 * @example
 * ```typescript
 * // Basic union
 * union([3, 4, 5])([1, 2, 3])
 * // [1, 2, 3, 4, 5]
 * 
 * // Combine arrays
 * union([10, 20, 30])([5, 10, 15])
 * // [5, 10, 15, 20, 30]
 * 
 * // String arrays
 * union(["c", "d", "e"])(["a", "b", "c"])
 * // ["a", "b", "c", "d", "e"]
 * 
 * // No overlap
 * union([4, 5, 6])([1, 2, 3])
 * // [1, 2, 3, 4, 5, 6]
 * 
 * // Complete overlap
 * union([1, 2, 3])([1, 2, 3])
 * // [1, 2, 3]
 * 
 * // Empty arrays
 * union([])([1, 2, 3])        // [1, 2, 3]
 * union([1, 2, 3])([])        // [1, 2, 3]
 * union([])([])               // []
 * 
 * // Removes duplicates within each array
 * union([4, 5, 5, 6])([1, 1, 2, 2, 3, 3])
 * // [1, 2, 3, 4, 5, 6]
 * 
 * // Order preservation
 * union([4, 5, 6])([3, 2, 1])
 * // [3, 2, 1, 4, 5, 6]
 * 
 * // Objects (uses reference equality)
 * const obj1 = { id: 1 }
 * const obj2 = { id: 2 }
 * const obj3 = { id: 3 }
 * const obj4 = { id: 4 }
 * union([obj3, obj4])([obj1, obj2, obj3])
 * // [obj1, obj2, obj3, obj4]
 * 
 * // Partial application for merging
 * const addDefaults = union(["defaultTag1", "defaultTag2"])
 * addDefaults(["userTag1", "userTag2"])          // ["userTag1", "userTag2", "defaultTag1", "defaultTag2"]
 * addDefaults(["defaultTag1", "customTag"])      // ["defaultTag1", "customTag", "defaultTag2"]
 * 
 * // Combine permissions
 * const adminPerms = ["read", "write", "delete", "admin"]
 * const userPerms = ["read", "write"]
 * union(adminPerms)(userPerms)
 * // ["read", "write", "delete", "admin"]
 * 
 * // Set operations
 * const setA = [1, 2, 3]
 * const setB = [3, 4, 5]
 * union(setB)(setA) // A ∪ B
 * // [1, 2, 3, 4, 5]
 * 
 * // Merge feature flags
 * const defaultFeatures = ["feature1", "feature2"]
 * const userFeatures = ["feature2", "feature3"]
 * union(defaultFeatures)(userFeatures)
 * // ["feature2", "feature3", "feature1"]
 * 
 * // Handle null/undefined gracefully
 * union([1, 2])(null)         // [1, 2]
 * union([1, 2])(undefined)    // [1, 2]
 * union(null)([1, 2, 3])      // [1, 2, 3]
 * union(undefined)([1, 2])    // [1, 2]
 * ```
 * @property Immutable - doesn't modify input arrays
 * @property Set-operation - removes duplicates, combines unique elements
 * @property Order-preserving - maintains order (first array, then new elements from second)
 */
const union = <T>(
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
	
	// Use native Set.union if available (ES2025)
	if ('union' in Set.prototype && typeof set1.union === 'function') {
		return Array.from(set1.union(set2))
	}
	
	// Fallback: Combine sets manually
	const result = new Set(array1)
	array2.forEach(element => result.add(element))
	
	return Array.from(result)
}

export default union