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
 * @param subset - The Set that should be contained
 * @param superset - The Set to check if it's a superset
 * @returns True if superset contains all elements of subset, false otherwise
 * @example
 * ```typescript
 * // Basic usage
 * isSupersetOf(new Set([2, 3, 4]))(new Set([1, 2, 3, 4, 5]))  // true
 * isSupersetOf(new Set([2, 3, 4]))(new Set([1, 2, 3]))        // false (missing 4)
 * isSupersetOf(new Set([1, 2, 3]))(new Set([1, 2, 3]))        // true (superset of itself)
 *
 * // Edge cases
 * isSupersetOf(new Set())(new Set([1, 2, 3]))   // true (any set is superset of empty)
 * isSupersetOf(new Set([1]))(new Set())         // false
 * isSupersetOf(null)(new Set([1]))              // true
 *
 * // Partial application
 * const requiredPerms = new Set(["read", "write"])
 * const hasRequired = isSupersetOf(requiredPerms)
 * hasRequired(new Set(["read", "write", "admin"]))  // true
 * hasRequired(new Set(["read"]))                    // false
 * ```
 * @pure
 * @curried
 * @predicate
 * @safe
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
	return Array.from(subset).every(element => superset.has(element))
}

export default isSupersetOf
