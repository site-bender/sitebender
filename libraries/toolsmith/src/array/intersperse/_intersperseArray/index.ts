//++ Private helper: inserts a separator element between all array elements
export default function _intersperseArray<T, U>(separator: U) {
	return function _intersperseArrayWithSeparator(
		array: ReadonlyArray<T>,
	): ReadonlyArray<T | U> {
		//++ [EXCEPTION] Using .length property for array length check
		if (array.length === 0) {
			return []
		}

		if (array.length === 1) {
			return [...array]
		}

		const result: Array<T | U> = []

		/*++
		 | [EXCEPTION] Using loops and iteration for performance
		 | Inserts separator between elements - O(n) time and O(n) space
		 */

		//++ [EXCEPTION] Using loop counter and < operator
		for (let i = 0; i < array.length; i++) {
			result.push(array[i])

			//++ [EXCEPTION] Using < and - operators for bounds check
			//++ Add separator after all elements except the last
			if (i < array.length - 1) {
				result.push(separator)
			}
		}

		return result
	}
}
