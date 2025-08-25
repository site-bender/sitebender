/**
 * Checks if the first Set is a superset of the second Set
 *
 * Returns true if the first Set contains every element in the second Set.
 * Any Set is considered a superset of an empty Set. A Set is always a
 * superset of itself. Uses SameValueZero equality for comparisons.
 *
 * @compatibility Uses native Set.isSupersetOf when available (ES2025, ~84% browser support).
 * Falls back to manual implementation for older browsers (Opera Mobile, IE).
 *
 * @curried (subset) => (superset) => boolean
 * @param subset - The Set that should be contained
 * @param superset - The Set to check if it's a superset
 * @returns True if superset contains all elements of subset, false otherwise
 * @example
 * ```typescript
 * // Basic superset check
 * isSupersetOf(new Set([2, 3, 4]))(new Set([1, 2, 3, 4, 5]))
 * // true
 *
 * // Not a superset
 * isSupersetOf(new Set([2, 3, 4]))(new Set([1, 2, 3]))
 * // false (missing 4)
 *
 * // Equal sets (superset of itself)
 * isSupersetOf(new Set([1, 2, 3]))(new Set([1, 2, 3]))
 * // true
 *
 * // Any set is superset of empty set
 * isSupersetOf(new Set())(new Set([1, 2, 3]))
 * // true
 *
 * // Empty superset
 * isSupersetOf(new Set([1]))(new Set())
 * // false
 *
 * // Both empty
 * isSupersetOf(new Set())(new Set())
 * // true
 *
 * // String sets
 * isSupersetOf(new Set(["b", "c"]))(new Set(["a", "b", "c", "d"]))
 * // true
 *
 * // Object references
 * const obj1 = { id: 1 }
 * const obj2 = { id: 2 }
 * const obj3 = { id: 3 }
 * isSupersetOf(new Set([obj1, obj2]))(new Set([obj1, obj2, obj3]))
 * // true
 *
 * // NaN handling
 * isSupersetOf(new Set([NaN, 2]))(new Set([1, 2, NaN, 3]))
 * // true
 *
 * // Mixed types
 * isSupersetOf(new Set([1, true]))(new Set([1, "2", true, null]))
 * // true
 *
 * // Permission verification
 * const userPermissions = new Set(["read", "write", "delete", "admin"])
 * const requiredPermissions = new Set(["read", "write"])
 * isSupersetOf(requiredPermissions)(userPermissions)
 * // true (user has all required permissions and more)
 *
 * // Feature availability check
 * const implementedFeatures = new Set(["feature1", "feature2", "feature3"])
 * const requestedFeatures = new Set(["feature1", "feature3"])
 * isSupersetOf(requestedFeatures)(implementedFeatures)
 * // true (all requested features are implemented)
 *
 * // Inventory checking
 * const warehouse = new Set(["item1", "item2", "item3", "item4"])
 * const order = new Set(["item1", "item3"])
 * isSupersetOf(order)(warehouse)
 * // true (warehouse has all ordered items)
 *
 * // Partial application for validation
 * const hasAllRequired = (required: Set<string>) => isSupersetOf(required)
 * const checkPermissions = hasAllRequired(new Set(["read", "write"]))
 *
 * checkPermissions(new Set(["read", "write", "admin"]))  // true
 * checkPermissions(new Set(["read"]))                    // false
 *
 * // Skills matching
 * const jobRequirements = new Set(["JavaScript", "React", "Node"])
 * const candidateSkills = new Set(["JavaScript", "React", "Node", "Python"])
 * isSupersetOf(jobRequirements)(candidateSkills)
 * // true (candidate has all required skills)
 *
 * // Language support
 * const supportedLanguages = new Set(["en", "es", "fr", "de"])
 * const requiredLanguages = new Set(["en", "es"])
 * isSupersetOf(requiredLanguages)(supportedLanguages)
 * // true
 *
 * // Handle null/undefined gracefully
 * isSupersetOf(null)(new Set([1, 2]))        // true (empty subset)
 * isSupersetOf(undefined)(new Set([1, 2]))   // true (empty subset)
 * isSupersetOf(new Set([1]))(null)           // false
 * isSupersetOf(new Set([1]))(undefined)      // false
 *
 * // Symbols
 * const sym1 = Symbol("a")
 * const sym2 = Symbol("b")
 * isSupersetOf(new Set([sym1, sym2]))(new Set([sym1, sym2, Symbol("c")]))
 * // true
 *
 * // Database field validation
 * const tableColumns = new Set(["id", "name", "email", "created_at", "updated_at"])
 * const queryFields = new Set(["name", "email"])
 * isSupersetOf(queryFields)(tableColumns)
 * // true (all query fields exist in table)
 * ```
 * @property Mathematical - follows set theory definition of superset
 * @property Reflexive - A ⊇ A (set is superset of itself)
 * @property Transitive - if A ⊇ B and B ⊇ C, then A ⊇ C
 * @property Inverse - A ⊇ B if and only if B ⊆ A
 */
const isSupersetOf = <T>(
	subset: Set<T> | null | undefined,
) =>
(
	superset: Set<T> | null | undefined,
): boolean => {
	// Any set is superset of empty set
	if (subset == null || !(subset instanceof Set) || subset.size === 0) {
		return true
	}

	// Empty/null set cannot be superset of non-empty set
	if (superset == null || !(superset instanceof Set)) {
		return false
	}

	// Optimization: superset must be at least as large as subset
	if (superset.size < subset.size) {
		return false
	}

	// Use native Set.isSupersetOf if available (ES2025)
	if (
		"isSupersetOf" in Set.prototype &&
		typeof superset.isSupersetOf === "function"
	) {
		return superset.isSupersetOf(subset)
	}

	// Fallback: Check if every element in subset exists in superset
	for (const element of subset) {
		if (!superset.has(element)) {
			return false
		}
	}

	return true
}

export default isSupersetOf
