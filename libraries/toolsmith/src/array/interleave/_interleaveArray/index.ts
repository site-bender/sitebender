//++ Private helper: alternates elements from two arrays
export default function _interleaveArray<T, U>(
	array1: ReadonlyArray<T>,
) {
	return function _interleaveArrayWithFirstArray(
		array2: ReadonlyArray<U>,
	): ReadonlyArray<T | U> {
		//++ [EXCEPTION] Using .length property for array length check
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

		/*++
		 | [EXCEPTION] Using loops and iteration for performance
		 | Alternates elements from two arrays - O(n+m) time and space
		 */

		//++ [EXCEPTION] Using Math.max and comparison operators
		const maxLength = array1.length > array2.length
			? array1.length
			: array2.length

		//++ [EXCEPTION] Using loop counter and comparison
		for (let i = 0; i < maxLength; i++) {
			//++ [EXCEPTION] Using < operator for bounds check
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
