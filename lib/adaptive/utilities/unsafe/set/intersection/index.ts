/**
 * Returns elements present in both Sets
 * 
 * Performs a set intersection operation, returning a new Set containing
 * only the elements that appear in both input Sets. Uses SameValueZero
 * equality for comparison. This is the Set equivalent of the array
 * intersection function.
 * 
 * @compatibility Uses native Set.intersection when available (ES2025, ~84% browser support).
 * Falls back to filter-based implementation for older browsers (Opera Mobile, IE).
 * 
 * @curried (set2) => (set1) => result
 * @param set2 - Second Set to intersect with
 * @param set1 - First Set to intersect
 * @returns New Set with elements present in both Sets
 * @example
 * ```typescript
 * // Basic intersection
 * intersection(new Set([2, 3, 4]))(new Set([1, 2, 3, 5]))
 * // Set { 2, 3 }
 * 
 * // Find common elements
 * intersection(new Set([10, 20, 30]))(new Set([5, 10, 15, 20, 25, 30, 35]))
 * // Set { 10, 20, 30 }
 * 
 * // String Sets
 * intersection(new Set(["b", "c", "d"]))(new Set(["a", "b", "c", "e"]))
 * // Set { "b", "c" }
 * 
 * // No common elements
 * intersection(new Set([4, 5, 6]))(new Set([1, 2, 3]))
 * // Set { }
 * 
 * // All elements in common
 * intersection(new Set([1, 2, 3]))(new Set([1, 2, 3]))
 * // Set { 1, 2, 3 }
 * 
 * // Empty Set
 * intersection(new Set())(new Set([1, 2, 3]))
 * // Set { }
 * 
 * // Objects (uses reference equality)
 * const obj1 = { id: 1 }
 * const obj2 = { id: 2 }
 * const obj3 = { id: 3 }
 * intersection(new Set([obj2, obj3]))(new Set([obj1, obj2, obj3]))
 * // Set { obj2, obj3 }
 * 
 * // NaN handling
 * intersection(new Set([NaN, 2]))(new Set([1, NaN, 3]))
 * // Set { NaN }
 * 
 * // Mixed types
 * intersection(new Set([1, "2", true]))(new Set([1, 2, "2", false, true]))
 * // Set { 1, "2", true }
 * 
 * // Partial application for filtering
 * const validIds = new Set([1, 2, 3, 4, 5])
 * const filterValidIds = intersection(validIds)
 * 
 * filterValidIds(new Set([3, 4, 5, 6, 7]))  // Set { 3, 4, 5 }
 * filterValidIds(new Set([1, 2, 10]))       // Set { 1, 2 }
 * 
 * // Find common tags
 * const requiredTags = new Set(["javascript", "functional"])
 * const findCommonTags = intersection(requiredTags)
 * 
 * findCommonTags(new Set(["javascript", "functional", "tutorial"]))
 * // Set { "javascript", "functional" }
 * 
 * findCommonTags(new Set(["javascript", "react"]))
 * // Set { "javascript" }
 * 
 * // Permission checking
 * const userPerms = new Set(["read", "write"])
 * const requiredPerms = new Set(["read", "write", "admin"])
 * intersection(requiredPerms)(userPerms)
 * // Set { "read", "write" }
 * 
 * // Set operations
 * const setA = new Set([1, 2, 3, 4, 5])
 * const setB = new Set([4, 5, 6, 7, 8])
 * intersection(setB)(setA)  // A ∩ B
 * // Set { 4, 5 }
 * 
 * // Handle null/undefined gracefully
 * intersection(new Set([1, 2]))(null)        // Set { }
 * intersection(new Set([1, 2]))(undefined)   // Set { }
 * intersection(null)(new Set([1, 2, 3]))     // Set { }
 * intersection(undefined)(new Set([1, 2]))   // Set { }
 * 
 * // Symbols
 * const sym1 = Symbol("a")
 * const sym2 = Symbol("b")
 * const sym3 = Symbol("c")
 * intersection(new Set([sym2, sym3]))(new Set([sym1, sym2, sym3]))
 * // Set { Symbol(b), Symbol(c) }
 * 
 * // Chain intersections
 * const set1 = new Set([1, 2, 3, 4])
 * const set2 = new Set([2, 3, 4, 5])
 * const set3 = new Set([3, 4, 5, 6])
 * intersection(set3)(intersection(set2)(set1))
 * // Set { 3, 4 }
 * ```
 * @property Immutable - returns new Set, doesn't modify originals
 * @property Commutative - intersection(A)(B) equals intersection(B)(A)
 * @property SameValueZero - uses SameValueZero equality
 */
const intersection = <T>(
	set2: Set<T> | null | undefined
) => (
	set1: Set<T> | null | undefined
): Set<T> => {
	if (set1 == null || !(set1 instanceof Set) || set1.size === 0) {
		return new Set()
	}
	
	if (set2 == null || !(set2 instanceof Set) || set2.size === 0) {
		return new Set()
	}
	
	// Use native Set.intersection if available (ES2025)
	if ('intersection' in Set.prototype && typeof set1.intersection === 'function') {
		return set1.intersection(set2)
	}
	
	// Fallback: Iterate over smaller set for efficiency
	const [smaller, larger] = set1.size <= set2.size ? [set1, set2] : [set2, set1]
	const result = new Set<T>()
	
	for (const element of smaller) {
		if (larger.has(element)) {
			result.add(element)
		}
	}
	
	return result
}

export default intersection