/**
 * Checks if the first Set is a subset of the second Set
 * 
 * Returns true if every element in the first Set is also in the second Set.
 * An empty Set is considered a subset of any Set. A Set is always a subset
 * of itself. Uses SameValueZero equality for comparisons.
 * 
 * @compatibility Uses native Set.isSubsetOf when available (ES2025, ~84% browser support).
 * Falls back to manual implementation for older browsers (Opera Mobile, IE).
 * 
 * @curried (superset) => (subset) => boolean
 * @param superset - The Set that may contain all elements
 * @param subset - The Set to check if it's a subset
 * @returns True if subset is a subset of superset, false otherwise
 * @example
 * ```typescript
 * // Basic subset check
 * isSubsetOf(new Set([1, 2, 3, 4, 5]))(new Set([2, 3, 4]))
 * // true
 * 
 * // Not a subset
 * isSubsetOf(new Set([1, 2, 3]))(new Set([2, 3, 4]))
 * // false (4 is not in superset)
 * 
 * // Equal sets (subset of itself)
 * isSubsetOf(new Set([1, 2, 3]))(new Set([1, 2, 3]))
 * // true
 * 
 * // Empty set is subset of any set
 * isSubsetOf(new Set([1, 2, 3]))(new Set())
 * // true
 * 
 * // Empty superset
 * isSubsetOf(new Set())(new Set([1]))
 * // false
 * 
 * // Both empty
 * isSubsetOf(new Set())(new Set())
 * // true
 * 
 * // String sets
 * isSubsetOf(new Set(["a", "b", "c", "d"]))(new Set(["b", "c"]))
 * // true
 * 
 * // Object references
 * const obj1 = { id: 1 }
 * const obj2 = { id: 2 }
 * const obj3 = { id: 3 }
 * isSubsetOf(new Set([obj1, obj2, obj3]))(new Set([obj1, obj2]))
 * // true
 * 
 * // NaN handling
 * isSubsetOf(new Set([1, 2, NaN, 3]))(new Set([NaN, 2]))
 * // true
 * 
 * // Mixed types
 * isSubsetOf(new Set([1, "2", true, null]))(new Set([1, true]))
 * // true
 * 
 * // Permission checking
 * const allPermissions = new Set(["read", "write", "delete", "admin"])
 * const userPermissions = new Set(["read", "write"])
 * isSubsetOf(allPermissions)(userPermissions)
 * // true (user has subset of all permissions)
 * 
 * // Feature flag validation
 * const availableFeatures = new Set(["feature1", "feature2", "feature3"])
 * const requestedFeatures = new Set(["feature1", "feature3"])
 * isSubsetOf(availableFeatures)(requestedFeatures)
 * // true (all requested features are available)
 * 
 * // Tag validation
 * const allowedTags = new Set(["javascript", "typescript", "react", "vue"])
 * const articleTags = new Set(["javascript", "react"])
 * isSubsetOf(allowedTags)(articleTags)
 * // true (all article tags are allowed)
 * 
 * // Partial application for validation
 * const validCategories = new Set(["electronics", "books", "clothing"])
 * const isValidCategory = isSubsetOf(validCategories)
 * 
 * isValidCategory(new Set(["books"]))           // true
 * isValidCategory(new Set(["books", "toys"]))   // false
 * 
 * // Role hierarchy checking
 * const adminRoles = new Set(["user", "moderator", "admin"])
 * const moderatorRoles = new Set(["user", "moderator"])
 * isSubsetOf(adminRoles)(moderatorRoles)
 * // true (moderator roles are subset of admin roles)
 * 
 * // Handle null/undefined gracefully
 * isSubsetOf(new Set([1, 2]))(null)        // true (empty subset)
 * isSubsetOf(new Set([1, 2]))(undefined)   // true (empty subset)
 * isSubsetOf(null)(new Set([1]))           // false
 * isSubsetOf(undefined)(new Set([1]))      // false
 * 
 * // Symbols
 * const sym1 = Symbol("a")
 * const sym2 = Symbol("b")
 * isSubsetOf(new Set([sym1, sym2, Symbol("c")]))(new Set([sym1, sym2]))
 * // true
 * 
 * // Chain with conditional logic
 * const requiredSkills = new Set(["JS", "React", "Node"])
 * const candidateSkills = new Set(["JS", "React", "Node", "Python"])
 * const meetsRequirements = isSubsetOf(candidateSkills)(requiredSkills)
 * // true (candidate has all required skills)
 * ```
 * @property Mathematical - follows set theory definition of subset
 * @property Reflexive - A ⊆ A (set is subset of itself)
 * @property Transitive - if A ⊆ B and B ⊆ C, then A ⊆ C
 */
const isSubsetOf = <T>(
	superset: Set<T> | null | undefined
) => (
	subset: Set<T> | null | undefined
): boolean => {
	// Empty set is subset of any set
	if (subset == null || !(subset instanceof Set) || subset.size === 0) {
		return true
	}
	
	// Non-empty set cannot be subset of empty/null set
	if (superset == null || !(superset instanceof Set)) {
		return false
	}
	
	// Optimization: subset cannot be larger than superset
	if (subset.size > superset.size) {
		return false
	}
	
	// Use native Set.isSubsetOf if available (ES2025)
	if ('isSubsetOf' in Set.prototype && typeof subset.isSubsetOf === 'function') {
		return subset.isSubsetOf(superset)
	}
	
	// Fallback: Check if every element in subset exists in superset
	for (const element of subset) {
		if (!superset.has(element)) {
			return false
		}
	}
	
	return true
}

export default isSubsetOf