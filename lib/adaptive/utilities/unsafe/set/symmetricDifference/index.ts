/**
 * Returns elements in either Set but not both
 * 
 * Performs a symmetric difference operation (XOR for sets), returning
 * a new Set containing elements that appear in exactly one of the two
 * Sets. Elements that appear in both Sets are excluded. Uses
 * SameValueZero equality for comparison.
 * 
 * @compatibility Uses native Set.symmetricDifference when available (ES2025, ~84% browser support).
 * Falls back to manual implementation for older browsers (Opera Mobile, IE).
 * 
 * @curried (set2) => (set1) => result
 * @param set2 - Second Set to compare
 * @param set1 - First Set to compare
 * @returns New Set with elements in exactly one Set
 * @example
 * ```typescript
 * // Basic symmetric difference
 * symmetricDifference(new Set([3, 4, 5]))(new Set([1, 2, 3]))
 * // Set { 1, 2, 4, 5 }
 * 
 * // Find unique elements
 * symmetricDifference(new Set([10, 20, 30]))(new Set([20, 30, 40, 50]))
 * // Set { 10, 40, 50 }
 * 
 * // String Sets
 * symmetricDifference(new Set(["b", "c", "d"]))(new Set(["a", "b", "c"]))
 * // Set { "a", "d" }
 * 
 * // No overlap (returns all elements)
 * symmetricDifference(new Set([4, 5, 6]))(new Set([1, 2, 3]))
 * // Set { 1, 2, 3, 4, 5, 6 }
 * 
 * // Complete overlap (returns empty)
 * symmetricDifference(new Set([1, 2, 3]))(new Set([1, 2, 3]))
 * // Set { }
 * 
 * // Empty Sets
 * symmetricDifference(new Set())(new Set([1, 2, 3]))  // Set { 1, 2, 3 }
 * symmetricDifference(new Set([1, 2, 3]))(new Set())  // Set { 1, 2, 3 }
 * symmetricDifference(new Set())(new Set())           // Set { }
 * 
 * // Objects (uses reference equality)
 * const obj1 = { id: 1 }
 * const obj2 = { id: 2 }
 * const obj3 = { id: 3 }
 * const obj4 = { id: 4 }
 * symmetricDifference(new Set([obj2, obj3, obj4]))(new Set([obj1, obj2, obj3]))
 * // Set { obj1, obj4 }
 * 
 * // NaN handling
 * symmetricDifference(new Set([NaN, 2]))(new Set([1, NaN, 3]))
 * // Set { 1, 2, 3 }
 * 
 * // Mixed types
 * symmetricDifference(new Set([2, "2", false]))(new Set([1, 2, "2", true]))
 * // Set { 1, false, true }
 * 
 * // Find changes between versions
 * const oldFeatures = new Set(["feature1", "feature2", "feature3"])
 * const newFeatures = new Set(["feature2", "feature3", "feature4"])
 * symmetricDifference(newFeatures)(oldFeatures)
 * // Set { "feature1", "feature4" } (removed and added)
 * 
 * // Partial application for comparison
 * const compareToBaseline = symmetricDifference(new Set([1, 2, 3, 4, 5]))
 * compareToBaseline(new Set([3, 4, 5, 6, 7]))  // Set { 1, 2, 6, 7 }
 * compareToBaseline(new Set([1, 2, 3]))        // Set { 4, 5 }
 * 
 * // Find differences in permissions
 * const userPerms = new Set(["read", "write", "delete"])
 * const rolePerms = new Set(["read", "write", "admin"])
 * symmetricDifference(rolePerms)(userPerms)
 * // Set { "delete", "admin" }
 * 
 * // Toggle membership
 * const currentMembers = new Set([1, 2, 3, 4])
 * const toggleMembers = new Set([3, 4, 5, 6])
 * symmetricDifference(toggleMembers)(currentMembers)
 * // Set { 1, 2, 5, 6 } (3,4 removed, 5,6 added)
 * 
 * // Set operations
 * const setA = new Set([1, 2, 3])
 * const setB = new Set([3, 4, 5])
 * symmetricDifference(setB)(setA)  // A ⊕ B (XOR)
 * // Set { 1, 2, 4, 5 }
 * 
 * // Find unique tags between articles
 * const article1Tags = new Set(["javascript", "react", "tutorial"])
 * const article2Tags = new Set(["javascript", "vue", "tutorial"])
 * symmetricDifference(article2Tags)(article1Tags)
 * // Set { "react", "vue" }
 * 
 * // Handle null/undefined gracefully
 * symmetricDifference(new Set([1, 2]))(null)        // Set { 1, 2 }
 * symmetricDifference(new Set([1, 2]))(undefined)   // Set { 1, 2 }
 * symmetricDifference(null)(new Set([1, 2, 3]))     // Set { 1, 2, 3 }
 * symmetricDifference(undefined)(new Set([1, 2]))   // Set { 1, 2 }
 * 
 * // Symbols
 * const sym1 = Symbol("a")
 * const sym2 = Symbol("b")
 * const sym3 = Symbol("c")
 * symmetricDifference(new Set([sym2, sym3]))(new Set([sym1, sym2]))
 * // Set { Symbol(a), Symbol(c) }
 * 
 * // Data synchronization
 * const localData = new Set(["item1", "item2", "item3"])
 * const remoteData = new Set(["item2", "item3", "item4"])
 * const outOfSync = symmetricDifference(remoteData)(localData)
 * // Set { "item1", "item4" } (items needing sync)
 * ```
 * @property Immutable - returns new Set, doesn't modify originals
 * @property Commutative - symmetricDifference(A)(B) equals symmetricDifference(B)(A)
 * @property Self-inverse - applying twice returns original: A ⊕ (A ⊕ B) = B
 */
const symmetricDifference = <T>(
	set2: Set<T> | null | undefined
) => (
	set1: Set<T> | null | undefined
): Set<T> => {
	if (set1 == null || !(set1 instanceof Set)) {
		if (set2 == null || !(set2 instanceof Set)) {
			return new Set()
		}
		return new Set(set2)
	}
	
	if (set2 == null || !(set2 instanceof Set)) {
		return new Set(set1)
	}
	
	// Use native Set.symmetricDifference if available (ES2025)
	if ('symmetricDifference' in Set.prototype && typeof set1.symmetricDifference === 'function') {
		return set1.symmetricDifference(set2)
	}
	
	// Fallback: Elements in set1 but not set2, plus elements in set2 but not set1
	const result = new Set<T>()
	
	// Add elements from set1 that are not in set2
	for (const element of set1) {
		if (!set2.has(element)) {
			result.add(element)
		}
	}
	
	// Add elements from set2 that are not in set1
	for (const element of set2) {
		if (!set1.has(element)) {
			result.add(element)
		}
	}
	
	return result
}

export default symmetricDifference