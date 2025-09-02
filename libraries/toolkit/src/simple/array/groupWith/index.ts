import isNullish from "../../validation/isNullish/index.ts"

/**
 * Groups consecutive elements that satisfy a binary predicate
 *
 * Takes a binary predicate function and creates groups of consecutive
 * elements where each adjacent pair satisfies the predicate. When the
 * predicate returns false for a pair, a new group is started. This is
 * useful for segmenting data, creating runs, or grouping related consecutive
 * items based on their relationship to each other.
 *
 * @pure
 * @immutable
 * @curried
 * @param predicate - Binary function to test adjacent elements
 * @param array - Array to group
 * @returns Array of arrays, each containing consecutive related elements
 * @example
 * ```typescript
 * // Group consecutive equal elements
 * const equal = (a: number, b: number) => a === b
 * groupWith(equal)([1, 1, 2, 2, 2, 3, 1, 1])
 * // [[1, 1], [2, 2, 2], [3], [1, 1]]
 *
 * // Group ascending sequences
 * const ascending = (a: number, b: number) => b >= a
 * groupWith(ascending)([1, 2, 3, 2, 3, 4, 1, 5])
 * // [[1, 2, 3], [2, 3, 4], [1, 5]]
 *
 * // Group by property
 * const items = [
 *   { category: "A", value: 1 },
 *   { category: "A", value: 2 },
 *   { category: "B", value: 3 }
 * ]
 * groupWith((a, b) => a.category === b.category)(items)
 * // [[A,A], [B]]
 * ```
 */
const groupWith = <T>(
	predicate: (a: T, b: T) => boolean,
) =>
(
	array: ReadonlyArray<T> | null | undefined,
): Array<Array<T>> => {
	if (isNullish(array) || !Array.isArray(array) || array.length === 0) {
		return []
	}

	return array.slice(1).reduce(
		(acc, curr, i) => {
			const lastGroup = acc[acc.length - 1]
			const prevElement = array[i] // i is already offset by 1 due to slice

			if (predicate(prevElement, curr)) {
				lastGroup.push(curr)
			} else {
				acc.push([curr])
			}
			return acc
		},
		[[array[0]]],
	)
}

export default groupWith
