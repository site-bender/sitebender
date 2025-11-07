//++ Private helper: groups consecutive elements with same predicate result (plain array path)
export default function _partitionByArray<T>(
	predicate: (value: T) => unknown,
) {
	return function _partitionByArrayWithPredicate(
		array: ReadonlyArray<T>,
	): ReadonlyArray<ReadonlyArray<T>> {
		//++ [EXCEPTION] Using native .length for performance
		if (array.length === 0) {
			return []
		}

		const result: Array<Array<T>> = [[array[0]]]
		let currentKey = predicate(array[0])

		//++ [EXCEPTION] Using loop for stack safety instead of recursion
		//++ [EXCEPTION] Using native .length and .push() for performance
		for (let index = 1; index < array.length; index++) {
			const element = array[index]
			const elementKey = predicate(element)

			//++ [EXCEPTION] Using SameValueZero equality (===) to compare keys
			if (elementKey === currentKey) {
				const lastGroup = result[result.length - 1]
				lastGroup.push(element)
			} else {
				result.push([element])
				currentKey = elementKey
			}
		}

		return result
	}
}
