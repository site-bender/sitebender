//++ Private helper: removes consecutive duplicates with custom comparator (plain array path)
export default function _dropRepeatsWithArray<T>(
	comparator: (a: T, b: T) => boolean,
) {
	return function _dropRepeatsWithArrayWithComparator(
		array: ReadonlyArray<T>,
	): ReadonlyArray<T> {
		//++ [EXCEPTION] Using native .length for performance
		if (array.length === 0) {
			return []
		}

		//++ [EXCEPTION] Using native .length for performance
		if (array.length === 1) {
			return [...array]
		}

		const result: Array<T> = [array[0]]

		//++ [EXCEPTION] Using loop for stack safety instead of recursion
		//++ [EXCEPTION] Using native .length and .push() for performance
		for (let index = 1; index < array.length; index++) {
			const current = array[index]
			const previous = result[result.length - 1]

			if (!comparator(current, previous)) {
				result.push(current)
			}
		}

		return result
	}
}
