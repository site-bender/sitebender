//++ Private helper: alternates elements from two arrays
//++ [EXCEPTION] Using native methods (.length, .push, spread, Math.max) and loops for performance
//++ No recursion to avoid stack overflow on large arrays
export default function _interleaveArray<T, U>(
	array1: ReadonlyArray<T>,
) {
	return function _interleaveArrayWithFirstArray(
		array2: ReadonlyArray<U>,
	): ReadonlyArray<T | U> {
		if (array1.length === 0 && array2.length === 0) {
			return []
		}

		if (array1.length === 0) {
			return [...array2]
		}

		if (array2.length === 0) {
			return [...array1]
		}

		const result: Array<T | U> = []

		const maxLength = array1.length > array2.length
			? array1.length
			: array2.length

		for (let i = 0; i < maxLength; i++) {
			if (i < array1.length) {
				result.push(array1[i])
			}
			if (i < array2.length) {
				result.push(array2[i])
			}
		}

		return result
	}
}
