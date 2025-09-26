import isNullish from "../../validation/isNullish/index.ts"

/*++
 | Partition array by consecutive elements satisfying predicate
 |
 | Splits an array into subarrays where each subarray contains consecutive
 | elements that produce the same result when passed to the predicate function.
 | Unlike regular partition which creates two groups, this creates multiple
 | groups based on runs of elements with the same predicate result. Useful
 | for grouping consecutive similar items, run-length encoding, and data
 | segmentation.
 */
export default function partitionBy<T>(predicate: (value: T) => unknown) {
	return function partitionByPredicate(
		array: ReadonlyArray<T> | null | undefined,
	): Array<Array<T>> {
		if (isNullish(array) || array.length === 0) {
			return []
		}

		const groups = array.reduce(
			function groupConsecutive(acc, current, index) {
				const currentKey = predicate(current)
				const lastGroup = acc[acc.length - 1]

				if (index === 0 || lastGroup.key !== currentKey) {
					return [...acc, { key: currentKey, items: [current] }]
				} else {
					return [
						...acc.slice(0, -1),
						{
							key: lastGroup.key,
							items: [...lastGroup.items, current],
						},
					]
				}
			},
			[] as Array<{ key: unknown; items: Array<T> }>,
		)

		return groups.map(function extractItems(group) {
			return group.items
		})
	}
}

//?? [EXAMPLE] `partitionBy((n: number) => n % 2 === 0)([1, 3, 5, 2, 4, 6, 7, 9]) // [[1, 3, 5], [2, 4, 6], [7, 9]]`
//?? [EXAMPLE] `partitionBy((n: number) => n > 0)([-1, -2, 3, 4, -5, 6]) // [[-1, -2], [3, 4], [-5], [6]]`
//?? [EXAMPLE] `partitionBy((t: { completed: boolean }) => t.completed)([{ id: 1, completed: false }, { id: 2, completed: false }, { id: 3, completed: true }, { id: 4, completed: false }]) // [[{ id: 1, completed: false }, { id: 2, completed: false }], [{ id: 3, completed: true }], [{ id: 4, completed: false }]]`
//?? [EXAMPLE] `partitionBy((n: number) => n % 2 === 0)([]) // []`
//?? [EXAMPLE] `partitionBy((n: number) => n % 2 === 0)([1]) // [[1]]`
//?? [EXAMPLE] `partitionBy((n: number) => n % 2 === 0)(null) // []`
