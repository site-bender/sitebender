//++ Private helper: groups consecutive elements by binary predicate (plain array path)
export default function _groupWithArray<T>(
	predicate: (a: T, b: T) => boolean,
) {
	return function _groupWithArrayWithPredicate(
		array: ReadonlyArray<T>,
	): ReadonlyArray<ReadonlyArray<T>> {
		//++ [EXCEPTION] Using native .length for performance
		if (array.length === 0) {
			return []
		}

		const result: Array<Array<T>> = [[array[0]]]

		//++ [EXCEPTION] Using loop for stack safety instead of recursion
		//++ [EXCEPTION] Using native .length and .push() for performance
		for (let index = 1; index < array.length; index++) {
			const current = array[index]
			const previous = array[index - 1]
			const lastGroup = result[result.length - 1]

			if (predicate(previous, current)) {
				lastGroup.push(current)
			} else {
				result.push([current])
			}
		}

		return result
	}
}
