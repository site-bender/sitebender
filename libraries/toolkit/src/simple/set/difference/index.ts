import isNullish from "../../validation/isNullish/index.ts"

/**
 * Returns elements in the first Set but not in the second Set
 *
 * Performs a set difference operation, returning a new Set containing
 * only the elements from the first Set that don't appear in the second.
 * Uses SameValueZero equality for comparison. This is the Set equivalent
 * of the array difference function.
 *
 * @compatibility Uses native Set.difference when available (ES2025, ~84% browser support).
 * Falls back to filter-based implementation for older browsers (Opera Mobile, IE).
 *
 * @param subtrahend - Set of elements to exclude
 * @param minuend - Set to remove elements from
 * @returns New Set with elements from minuend not in subtrahend
 * @example
 * ```typescript
 * // Basic usage
 * difference(new Set([2, 3]))(new Set([1, 2, 3, 4, 5]))  // Set { 1, 4, 5 }
 * difference(new Set(["b", "c"]))(new Set(["a", "b", "c", "d"]))  // Set { "a", "d" }
 *
 * // Edge cases
 * difference(new Set())(new Set([1, 2, 3]))      // Set { 1, 2, 3 }
 * difference(new Set([1, 2]))(new Set())         // Set { }
 * difference(null)(new Set([1, 2]))              // Set { 1, 2 }
 *
 * // Partial application
 * const removeStopWords = difference(new Set(["the", "a", "an"]))
 * removeStopWords(new Set(["the", "quick", "fox"]))  // Set { "quick", "fox" }
 *
 * // Set operations
 * const setA = new Set([1, 2, 3, 4, 5])
 * const setB = new Set([4, 5, 6, 7, 8])
 * difference(setB)(setA)  // Set { 1, 2, 3 }
 * ```
 * @pure
 * @immutable
 * @curried
 * @safe
 */
const difference = <T>(
	subtrahend: Set<T> | null | undefined,
) =>
(
	minuend: Set<T> | null | undefined,
): Set<T> => {
	if (isNullish(minuend) || !(minuend instanceof Set)) {
		return new Set()
	}

	if (
		isNullish(subtrahend) || !(subtrahend instanceof Set) || subtrahend.size === 0
	) {
		return new Set(minuend)
	}

	// Use native Set.difference if available (ES2025)
	if (
		"difference" in Set.prototype && typeof minuend.difference === "function"
	) {
		return minuend.difference(subtrahend)
	}

	// Fallback: Create new Set with elements not in subtrahend
	return new Set(
		Array.from(minuend).filter((element) => !subtrahend.has(element)),
	)
}

export default difference
