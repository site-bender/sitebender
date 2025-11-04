import isNullish from "../../predicates/isNullish/index.ts"

//++ Groups consecutive elements with same predicate result
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
