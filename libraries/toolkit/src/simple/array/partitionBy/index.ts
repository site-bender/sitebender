/**
 * Partition array by consecutive elements satisfying predicate
 *
 * Splits an array into subarrays where each subarray contains consecutive
 * elements that produce the same result when passed to the predicate function.
 * Unlike regular partition which creates two groups, this creates multiple
 * groups based on runs of elements with the same predicate result. Useful
 * for grouping consecutive similar items, run-length encoding, and data
 * segmentation.
 *
 * @curried (predicate) => (array) => partitions
 * @param predicate - Function that determines grouping
 * @param array - Array to partition
 * @returns Array of subarrays with consecutive similar elements
 * @example
 * ```typescript
 * // Group consecutive even/odd numbers
 * const isEven = (n: number) => n % 2 === 0
 * partitionBy(isEven)([1, 3, 5, 2, 4, 6, 7, 9])
 * // [[1, 3, 5], [2, 4, 6], [7, 9]]
 *
 * // Group by sign
 * const isPositive = (n: number) => n > 0
 * partitionBy(isPositive)([-1, -2, 3, 4, -5, 6])
 * // [[-1, -2], [3, 4], [-5], [6]]
 *
 * // String length grouping
 * const isLong = (s: string) => s.length > 3
 * partitionBy(isLong)(["a", "bb", "long", "word", "x", "y", "another"])
 * // [["a", "bb"], ["long", "word"], ["x", "y"], ["another"]]
 *
 * // Boolean property grouping
 * const tasks = [
 *   { id: 1, completed: false },
 *   { id: 2, completed: false },
 *   { id: 3, completed: true },
 *   { id: 4, completed: true },
 *   { id: 5, completed: false }
 * ]
 * partitionBy((t: { completed: boolean }) => t.completed)(tasks)
 * // [
 * //   [{ id: 1, completed: false }, { id: 2, completed: false }],
 * //   [{ id: 3, completed: true }, { id: 4, completed: true }],
 * //   [{ id: 5, completed: false }]
 * // ]
 *
 * // Character type grouping
 * const isLetter = (c: string) => /[a-zA-Z]/.test(c)
 * partitionBy(isLetter)([..."a1b2c34def"])
 * // [["a"], ["1"], ["b"], ["2"], ["c"], ["3", "4"], ["d", "e", "f"]]
 *
 * // State changes
 * const readings = [20, 22, 25, 30, 28, 26, 24, 35, 40]
 * const isHigh = (temp: number) => temp > 30
 * partitionBy(isHigh)(readings)
 * // [[20, 22, 25, 30, 28, 26, 24], [35, 40]]
 *
 * // Empty and edge cases
 * partitionBy(isEven)([])        // []
 * partitionBy(isEven)([1])       // [[1]]
 * partitionBy(isEven)([1, 2, 3]) // [[1], [2], [3]]
 * ```
 * @curried Returns function for reusable partitioning
 * @pure Function has no side effects (assuming pure predicate)
 * @immutable Does not modify input array
 * @safe Handles empty arrays gracefully
 */
const partitionBy = <T>(predicate: (value: T) => unknown) =>
(
	array: Array<T>,
): Array<Array<T>> => {
	if (array.length === 0) return []

	const groups = array.reduce(
		(acc, current, index) => {
			const currentKey = predicate(current)
			const lastGroup = acc[acc.length - 1]
			
			if (index === 0 || lastGroup.key !== currentKey) {
				acc.push({ key: currentKey, items: [current] })
			} else {
				lastGroup.items.push(current)
			}
			
			return acc
		},
		[] as Array<{ key: unknown; items: Array<T> }>
	)

	return groups.map(group => group.items)
}

export default partitionBy
