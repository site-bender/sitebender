//++ Private helper: generates cartesian product of two arrays using iteration
export default function _cartesianProductArray<T, U>(
	array1: ReadonlyArray<T>,
) {
	return function _cartesianProductArrayWithFirstArray(
		array2: ReadonlyArray<U>,
	): ReadonlyArray<[T, U]> {
		//++ [EXCEPTION] Using .length property for array length check
		if (array1.length === 0 || array2.length === 0) {
			return []
		}

		const result: Array<[T, U]> = []

		/*++
		 | [EXCEPTION] Using loops and iteration for performance
		 | Nested loops to generate all pairs - O(n*m) time and space
		 */

		//++ Generate all pairs by iterating through both arrays
		for (let i = 0; i < array1.length; i++) {
			for (let j = 0; j < array2.length; j++) {
				result.push([array1[i], array2[j]])
			}
		}

		return result
	}
}
