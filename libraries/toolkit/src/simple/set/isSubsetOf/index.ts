import isNullish from "../../validation/isNullish/index.ts"

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
 * @param superset - The Set that may contain all elements
 * @param subset - The Set to check if it's a subset
 * @returns True if subset is a subset of superset, false otherwise
 * @example
 * ```typescript
 * // Basic usage
 * isSubsetOf(new Set([1, 2, 3, 4, 5]))(new Set([2, 3, 4]))  // true
 * isSubsetOf(new Set([1, 2, 3]))(new Set([2, 3, 4]))        // false (4 not in superset)
 * isSubsetOf(new Set([1, 2, 3]))(new Set([1, 2, 3]))        // true (subset of itself)
 *
 * // Edge cases
 * isSubsetOf(new Set([1, 2, 3]))(new Set())   // true (empty is subset of any)
 * isSubsetOf(new Set())(new Set([1]))         // false
 * isSubsetOf(new Set([1]))(null)              // true
 *
 * // Partial application
 * const allowedTags = new Set(["javascript", "typescript", "react"])
 * const hasValidTags = isSubsetOf(allowedTags)
 * hasValidTags(new Set(["javascript", "react"]))     // true
 * hasValidTags(new Set(["javascript", "python"]))    // false
 * ```
 * @pure
 * @curried
 * @predicate
 * @safe
 */
const isSubsetOf = <T>(
	superset: Set<T> | null | undefined,
) =>
(
	subset: Set<T> | null | undefined,
): boolean => {
	// Empty set is subset of any set
	if (isNullish(subset) || !(subset instanceof Set) || subset.size === 0) {
		return true
	}

	// Non-empty set cannot be subset of empty/null set
	if (isNullish(superset) || !(superset instanceof Set)) {
		return false
	}

	// Optimization: subset cannot be larger than superset
	if (subset.size > superset.size) {
		return false
	}

	// Use native Set.isSubsetOf if available (ES2025)
	if (
		"isSubsetOf" in Set.prototype && typeof subset.isSubsetOf === "function"
	) {
		return subset.isSubsetOf(superset)
	}

	// Fallback: Check if every element in subset exists in superset
	return Array.from(subset).every((element) => superset.has(element))
}

export default isSubsetOf
