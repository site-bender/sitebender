import isNullish from "../../validation/isNullish/index.ts"

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
 * @pure
 * @immutable
 * @curried
 * @commutative
 * @associative
 * @safe Returns appropriate Set for null/undefined inputs
 * @param set2 - Second Set to union with
 * @param set1 - First Set to union
 * @returns New Set containing all elements from both Sets
 * @example
 * // Basic union
 * union(new Set([3, 4, 5]))(new Set([1, 2, 3]))
 * // Set { 1, 2, 3, 4, 5 }
 *
 * // String Sets
 * union(new Set(["world", "!"]))(new Set(["hello", "world"]))
 * // Set { "hello", "world", "!" }
 *
 * // Combine feature sets
 * const basicFeatures = new Set(["read", "write"])
 * const premiumFeatures = new Set(["write", "delete", "admin"])
 * union(premiumFeatures)(basicFeatures)
 * // Set { "read", "write", "delete", "admin" }
 *
 * // Partial application
 * const accumulate = union(new Set(["initial"]))
 * accumulate(new Set(["added1", "added2"]))
 * // Set { "added1", "added2", "initial" }
 *
 * // Chain multiple unions
 * const combined = union(new Set([3, 4]))(union(new Set([2, 3]))(new Set([1, 2])))
 * // Set { 1, 2, 3, 4 }
 *
 * // Empty or nullish
 * union(new Set())(new Set([1, 2, 3]))  // Set { 1, 2, 3 }
 * union(new Set([1, 2]))(null)  // Set { 1, 2 }
 */
const union = <T>(
	set2: Set<T> | null | undefined,
) =>
(
	set1: Set<T> | null | undefined,
): Set<T> => {
	if (isNullish(set1) || !(set1 instanceof Set)) {
		if (isNullish(set2) || !(set2 instanceof Set)) {
			return new Set()
		}
		return new Set(set2)
	}

	if (isNullish(set2) || !(set2 instanceof Set)) {
		return new Set(set1)
	}

	// Use native Set.union if available (ES2025)
	if ("union" in Set.prototype && typeof set1.union === "function") {
		return set1.union(set2)
	}

	// Fallback: Pure FP implementation using spread
	return new Set([...set1, ...set2])
}

export default union
