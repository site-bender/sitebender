/**
 * Checks if two Sets have no elements in common
 *
 * Returns true if the Sets are disjoint (their intersection is empty).
 * Two empty Sets are considered disjoint. Uses SameValueZero equality
 * for comparisons.
 *
 * @compatibility Uses native Set.isDisjointFrom when available (ES2025, ~84% browser support).
 * Falls back to manual implementation for older browsers (Opera Mobile, IE).
 *
 * @param set2 - Second Set to check against
 * @param set1 - First Set to check
 * @returns True if Sets have no elements in common, false otherwise
 * @example
 * ```typescript
 * // Basic usage
 * isDisjointFrom(new Set([4, 5, 6]))(new Set([1, 2, 3]))  // true
 * isDisjointFrom(new Set([3, 4, 5]))(new Set([1, 2, 3]))  // false (3 in both)
 *
 * // Edge cases
 * isDisjointFrom(new Set())(new Set())         // true
 * isDisjointFrom(new Set([1]))(new Set())     // true
 * isDisjointFrom(null)(new Set([1, 2]))       // true
 *
 * // Partial application
 * const reservedWords = new Set(["class", "function", "const"])
 * const hasNoReserved = isDisjointFrom(reservedWords)
 * hasNoReserved(new Set(["myVar", "myFunc"]))   // true
 * hasNoReserved(new Set(["class", "myVar"]))    // false
 * ```
 * @pure
 * @curried
 * @predicate
 * @safe
 */
const isDisjointFrom = <T>(
	set2: Set<T> | null | undefined,
) =>
(
	set1: Set<T> | null | undefined,
): boolean => {
	// Empty sets are disjoint from everything
	if (set1 == null || !(set1 instanceof Set) || set1.size === 0) {
		return true
	}

	if (set2 == null || !(set2 instanceof Set) || set2.size === 0) {
		return true
	}

	// Use native Set.isDisjointFrom if available (ES2025)
	if (
		"isDisjointFrom" in Set.prototype &&
		typeof set1.isDisjointFrom === "function"
	) {
		return set1.isDisjointFrom(set2)
	}

	// Fallback: Optimize by checking smaller set against larger
	const [smaller, larger] = set1.size <= set2.size ? [set1, set2] : [set2, set1]

	// Check if any element in smaller set exists in larger set
	return !Array.from(smaller).some((element) => larger.has(element))
}

export default isDisjointFrom
