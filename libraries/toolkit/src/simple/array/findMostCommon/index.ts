import isNullish from "../../validation/isNullish/index.ts"
import not from "../../logic/not/index.ts"

/**
 * Finds the most frequently occurring element(s)
 *
 * Returns an array of the element(s) that appear most frequently
 * in the input array. When multiple elements have the same maximum
 * frequency, all are returned in order of first occurrence.
 *
 * @pure
 * @immutable
 * @param array - Array to analyze for most common elements
 * @returns Array of the most frequently occurring element(s)
 * @example
 * ```typescript
 * // Basic usage
 * findMostCommon([1, 2, 3, 2, 4, 2, 5])         // [2]
 * findMostCommon([1, 1, 2, 2, 3, 3])            // [1, 2, 3] (tie)
 *
 * // String arrays
 * const words = "the quick brown fox the".split(" ")
 * findMostCommon(words)                         // ["the"]
 *
 * // Edge cases
 * findMostCommon([1, 2, 3, 4, 5])               // [1, 2, 3, 4, 5] (all unique)
 * findMostCommon([])                            // []
 * findMostCommon([NaN, NaN, 1, 1])              // [NaN, 1] (uses SameValueZero)
 *
 * // Preserves order on ties
 * findMostCommon([3, 1, 2, 1, 3, 2])            // [3, 1, 2] (first occurrence order)
 * ```
 */
const findMostCommon = <T>(
	array: ReadonlyArray<T> | null | undefined,
): Array<T> => {
	if (isNullish(array) || array.length === 0) {
		return []
	}

	// Build frequency and first occurrence maps
	const { frequencyMap, firstOccurrence } = array.reduce(
		(acc, item, index) => {
			if (not(acc.frequencyMap.has(item))) {
				acc.firstOccurrence.set(item, index)
			}
			acc.frequencyMap.set(item, (acc.frequencyMap.get(item) || 0) + 1)
			return acc
		},
		{
			frequencyMap: new Map<T, number>(),
			firstOccurrence: new Map<T, number>(),
		},
	)

	// Find the maximum frequency
	const maxFrequency = Math.max(...frequencyMap.values())

	// Collect all elements with maximum frequency and sort by first occurrence
	return Array.from(frequencyMap.entries())
		.filter(([_, count]) => count === maxFrequency)
		.map(([item]) => item)
		.sort((a, b) => {
			// deno-coverage-ignore - defensive fallback, logically unreachable
			const indexA = firstOccurrence.get(a) ?? 0
			// deno-coverage-ignore - defensive fallback, logically unreachable  
			const indexB = firstOccurrence.get(b) ?? 0
			return indexA - indexB
		})
}

export default findMostCommon
