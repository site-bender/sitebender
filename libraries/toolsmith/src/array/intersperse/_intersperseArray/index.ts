//++ Private helper: inserts a separator element between all array elements
//++ [EXCEPTION] Using native methods (.length, .push, spread) and loops for performance
//++ No recursion to avoid stack overflow on large arrays
export default function _intersperseArray<T, U>(separator: U) {
	return function _intersperseArrayWithSeparator(
		array: ReadonlyArray<T>,
	): ReadonlyArray<T | U> {
		if (array.length === 0) {
			return []
		}

		if (array.length === 1) {
			return [...array]
		}

		const result: Array<T | U> = []

		for (let i = 0; i < array.length; i++) {
			result.push(array[i])

			if (i < array.length - 1) {
				result.push(separator)
			}
		}

		return result
	}
}
