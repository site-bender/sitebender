/**
 * Returns a Set containing all unique elements from both Sets
 *
 * Performs a union operation, combining all elements from both Sets
 * into a new Set. Duplicate elements are automatically handled by
 * Set's uniqueness constraint. Uses SameValueZero equality.
 *
 * @compatibility Uses native Set.union when available (ES2025, ~84% browser support).
 * Falls back to manual implementation for older browsers (Opera Mobile, IE).
 *
 * @curried (set2) => (set1) => result
 * @param set2 - Second Set to union with
 * @param set1 - First Set to union
 * @returns New Set containing all elements from both Sets
 * @example
 * ```typescript
 * // Basic union
 * union(new Set([3, 4, 5]))(new Set([1, 2, 3]))
 * // Set { 1, 2, 3, 4, 5 }
 *
 * // String Sets
 * union(new Set(["world", "!"]))(new Set(["hello", "world"]))
 * // Set { "hello", "world", "!" }
 *
 * // No overlap
 * union(new Set([4, 5, 6]))(new Set([1, 2, 3]))
 * // Set { 1, 2, 3, 4, 5, 6 }
 *
 * // Complete overlap
 * union(new Set([1, 2, 3]))(new Set([1, 2, 3]))
 * // Set { 1, 2, 3 }
 *
 * // Empty Sets
 * union(new Set())(new Set([1, 2, 3]))  // Set { 1, 2, 3 }
 * union(new Set([1, 2, 3]))(new Set())  // Set { 1, 2, 3 }
 * union(new Set())(new Set())           // Set { }
 *
 * // Mixed types
 * union(new Set(["2", true, null]))(new Set([1, 2, "2"]))
 * // Set { 1, 2, "2", true, null }
 *
 * // Object references
 * const obj1 = { id: 1 }
 * const obj2 = { id: 2 }
 * const obj3 = { id: 3 }
 * union(new Set([obj2, obj3]))(new Set([obj1, obj2]))
 * // Set { obj1, obj2, obj3 }
 *
 * // NaN handling (single NaN in result)
 * union(new Set([NaN, 2, 3]))(new Set([1, NaN]))
 * // Set { 1, NaN, 2, 3 }
 *
 * // Combine feature sets
 * const basicFeatures = new Set(["read", "write"])
 * const premiumFeatures = new Set(["write", "delete", "admin"])
 * union(premiumFeatures)(basicFeatures)
 * // Set { "read", "write", "delete", "admin" }
 *
 * // Merge user permissions
 * const userPerms = new Set(["view", "edit"])
 * const rolePerms = new Set(["edit", "delete"])
 * union(rolePerms)(userPerms)
 * // Set { "view", "edit", "delete" }
 *
 * // Combine search results
 * const results1 = new Set(["doc1", "doc2", "doc3"])
 * const results2 = new Set(["doc3", "doc4", "doc5"])
 * union(results2)(results1)
 * // Set { "doc1", "doc2", "doc3", "doc4", "doc5" }
 *
 * // Partial application for accumulation
 * const accumulate = union(new Set(["initial"]))
 * accumulate(new Set(["added1", "added2"]))
 * // Set { "added1", "added2", "initial" }
 *
 * // Chain multiple unions
 * const set1 = new Set([1, 2])
 * const set2 = new Set([2, 3])
 * const set3 = new Set([3, 4])
 * const combined = union(set3)(union(set2)(set1))
 * // Set { 1, 2, 3, 4 }
 *
 * // Merge tag collections
 * const articleTags = new Set(["javascript", "tutorial"])
 * const categoryTags = new Set(["web", "tutorial", "frontend"])
 * union(categoryTags)(articleTags)
 * // Set { "javascript", "tutorial", "web", "frontend" }
 *
 * // Combine error codes
 * const systemErrors = new Set(["E001", "E002"])
 * const userErrors = new Set(["E100", "E101", "E002"])
 * union(userErrors)(systemErrors)
 * // Set { "E001", "E002", "E100", "E101" }
 *
 * // Date union
 * const dates1 = new Set([new Date("2024-01-01"), new Date("2024-01-02")])
 * const dates2 = new Set([new Date("2024-01-02"), new Date("2024-01-03")])
 * union(dates2)(dates1)
 * // Set with all three dates (note: different Date objects even if same time)
 *
 * // Symbol union
 * const sym1 = Symbol("a")
 * const sym2 = Symbol("b")
 * const sym3 = Symbol("c")
 * union(new Set([sym2, sym3]))(new Set([sym1, sym2]))
 * // Set { Symbol(a), Symbol(b), Symbol(c) }
 *
 * // Handle null/undefined gracefully
 * union(new Set([1, 2]))(null)        // Set { 1, 2 }
 * union(new Set([1, 2]))(undefined)   // Set { 1, 2 }
 * union(null)(new Set([1, 2]))        // Set { 1, 2 }
 * union(undefined)(new Set())         // Set { }
 *
 * // Combine data sources
 * const localData = new Set(["item1", "item2"])
 * const remoteData = new Set(["item2", "item3", "item4"])
 * const allData = union(remoteData)(localData)
 * // Set { "item1", "item2", "item3", "item4" }
 *
 * // Build complete set iteratively
 * const buildSet = (sets: Array<Set<number>>) =>
 *   sets.reduce((acc, set) => union(set)(acc), new Set<number>())
 *
 * buildSet([
 *   new Set([1, 2]),
 *   new Set([2, 3]),
 *   new Set([3, 4])
 * ])
 * // Set { 1, 2, 3, 4 }
 *
 * // Set algebra: A ∪ B
 * const setA = new Set([1, 2, 3])
 * const setB = new Set([3, 4, 5])
 * union(setB)(setA)
 * // Set { 1, 2, 3, 4, 5 }
 *
 * // Collect all unique values
 * const allValues = [
 *   new Set([1, 2]),
 *   new Set([2, 3]),
 *   new Set([3, 4])
 * ].reduce((acc, set) => union(set)(acc), new Set())
 * // Set { 1, 2, 3, 4 }
 * ```
 * @property Commutative - union(A)(B) equals union(B)(A)
 * @property Associative - union(union(A)(B))(C) equals union(A)(union(B)(C))
 * @property Identity - union(∅)(A) equals A
 */
const union = <T>(
	set2: Set<T> | null | undefined,
) =>
(
	set1: Set<T> | null | undefined,
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

	// Use native Set.union if available (ES2025)
	if ("union" in Set.prototype && typeof set1.union === "function") {
		return set1.union(set2)
	}

	// Fallback: Create new Set with all elements from both
	const result = new Set(set1)

	for (const element of set2) {
		result.add(element)
	}

	return result
}

export default union
