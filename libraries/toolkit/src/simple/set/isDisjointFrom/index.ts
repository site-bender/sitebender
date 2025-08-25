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
 * @curried (set2) => (set1) => boolean
 * @param set2 - Second Set to check against
 * @param set1 - First Set to check
 * @returns True if Sets have no elements in common, false otherwise
 * @example
 * ```typescript
 * // Disjoint sets (no common elements)
 * isDisjointFrom(new Set([4, 5, 6]))(new Set([1, 2, 3]))
 * // true
 *
 * // Overlapping sets
 * isDisjointFrom(new Set([3, 4, 5]))(new Set([1, 2, 3]))
 * // false (3 is in both)
 *
 * // Empty sets are disjoint
 * isDisjointFrom(new Set())(new Set())
 * // true
 *
 * // Empty vs non-empty
 * isDisjointFrom(new Set([1, 2]))(new Set())
 * // true
 *
 * isDisjointFrom(new Set())(new Set([1, 2]))
 * // true
 *
 * // String sets
 * isDisjointFrom(new Set(["d", "e", "f"]))(new Set(["a", "b", "c"]))
 * // true
 *
 * isDisjointFrom(new Set(["c", "d", "e"]))(new Set(["a", "b", "c"]))
 * // false ("c" is in both)
 *
 * // Object references
 * const obj1 = { id: 1 }
 * const obj2 = { id: 2 }
 * const obj3 = { id: 3 }
 * isDisjointFrom(new Set([obj3]))(new Set([obj1, obj2]))
 * // true
 *
 * isDisjointFrom(new Set([obj2, obj3]))(new Set([obj1, obj2]))
 * // false (obj2 is in both)
 *
 * // NaN handling
 * isDisjointFrom(new Set([NaN]))(new Set([1, 2, 3]))
 * // true
 *
 * isDisjointFrom(new Set([NaN, 2]))(new Set([1, NaN]))
 * // false (NaN is in both)
 *
 * // Mixed types
 * isDisjointFrom(new Set(["1", "2"]))(new Set([1, 2]))
 * // true (string "1" !== number 1)
 *
 * // Department separation check
 * const engineeringTeam = new Set(["Alice", "Bob", "Charlie"])
 * const marketingTeam = new Set(["David", "Eve", "Frank"])
 * isDisjointFrom(marketingTeam)(engineeringTeam)
 * // true (no shared members)
 *
 * // Time slot conflict detection
 * const morningSlots = new Set(["9:00", "9:30", "10:00", "10:30"])
 * const afternoonSlots = new Set(["14:00", "14:30", "15:00"])
 * isDisjointFrom(afternoonSlots)(morningSlots)
 * // true (no overlapping times)
 *
 * // Category exclusion
 * const electronics = new Set(["laptop", "phone", "tablet"])
 * const furniture = new Set(["chair", "desk", "lamp"])
 * isDisjointFrom(furniture)(electronics)
 * // true (mutually exclusive categories)
 *
 * // Partial application for conflict checking
 * const reservedWords = new Set(["class", "function", "const", "let"])
 * const hasNoReservedWords = isDisjointFrom(reservedWords)
 *
 * hasNoReservedWords(new Set(["myVar", "myFunc"]))     // true
 * hasNoReservedWords(new Set(["class", "myVar"]))      // false
 *
 * // IP range checking
 * const internalIPs = new Set(["192.168.1.1", "192.168.1.2"])
 * const externalIPs = new Set(["8.8.8.8", "1.1.1.1"])
 * isDisjointFrom(externalIPs)(internalIPs)
 * // true (no overlap between internal and external)
 *
 * // Error type separation
 * const criticalErrors = new Set(["SYSTEM_FAILURE", "DATA_CORRUPTION"])
 * const warningCodes = new Set(["SLOW_RESPONSE", "HIGH_MEMORY"])
 * isDisjointFrom(warningCodes)(criticalErrors)
 * // true (errors and warnings don't overlap)
 *
 * // Handle null/undefined gracefully
 * isDisjointFrom(new Set([1, 2]))(null)        // true
 * isDisjointFrom(new Set([1, 2]))(undefined)   // true
 * isDisjointFrom(null)(new Set([1, 2]))        // true
 * isDisjointFrom(undefined)(new Set())         // true
 *
 * // Symbols
 * const sym1 = Symbol("a")
 * const sym2 = Symbol("b")
 * const sym3 = Symbol("c")
 * isDisjointFrom(new Set([sym3]))(new Set([sym1, sym2]))
 * // true
 *
 * // Use in validation
 * const blacklist = new Set(["badword1", "badword2"])
 * const userInput = new Set(["hello", "world"])
 * const isClean = isDisjointFrom(blacklist)(userInput)
 * // true (no blacklisted words in input)
 * ```
 * @property Symmetric - isDisjointFrom(A)(B) equals isDisjointFrom(B)(A)
 * @property Empty-set - empty set is disjoint from any set
 * @property Complement - if disjoint, intersection is empty
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
	for (const element of smaller) {
		if (larger.has(element)) {
			return false // Found common element, not disjoint
		}
	}

	return true // No common elements found
}

export default isDisjointFrom
