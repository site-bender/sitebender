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
 * @param set2 - Second Set to intersect with
 * @param set1 - First Set to intersect
 * @returns New Set with elements present in both Sets
 * @example
 * ```typescript
 * // Basic usage
 * intersection(new Set([2, 3, 4]))(new Set([1, 2, 3, 5]))  // Set { 2, 3 }
 * intersection(new Set(["b", "c"]))(new Set(["a", "b", "c"]))  // Set { "b", "c" }
 *
 * // Edge cases
 * intersection(new Set())(new Set([1, 2, 3]))      // Set { }
 * intersection(new Set([1]))(null)                // Set { }
 * intersection(null)(new Set([1, 2]))             // Set { }
 *
 * // Partial application
 * const validIds = new Set([1, 2, 3, 4, 5])
 * const filterValid = intersection(validIds)
 * filterValid(new Set([3, 4, 5, 6, 7]))           // Set { 3, 4, 5 }
 *
 * // Chain intersections
 * const result = intersection(new Set([3, 4, 5]))(
 *   intersection(new Set([2, 3, 4]))(new Set([1, 2, 3, 4]))
 * )  // Set { 3, 4 }
 * ```
 * @pure
 * @immutable
 * @curried
 * @safe
 * @commutative
 */
const intersection = <T>(
	set2: Set<T> | null | undefined,
) =>
(
	set1: Set<T> | null | undefined,
): Set<T> => {
	if (set1 == null || !(set1 instanceof Set) || set1.size === 0) {
		return new Set()
	}

	if (set2 == null || !(set2 instanceof Set) || set2.size === 0) {
		return new Set()
	}

	// Use native Set.intersection if available (ES2025)
	if (
		"intersection" in Set.prototype && typeof set1.intersection === "function"
	) {
		return set1.intersection(set2)
	}

	// Fallback: Iterate over smaller set for efficiency
	const [smaller, larger] = set1.size <= set2.size ? [set1, set2] : [set2, set1]
	return new Set(Array.from(smaller).filter(element => larger.has(element)))
}

export default intersection
