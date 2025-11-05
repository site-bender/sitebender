//++ Private helper: removes duplicates using custom equality (plain array path)
export default function _nubByArray<T>(equalityFn: (a: T, b: T) => boolean) {
	return function _nubByArrayWithEqualityFn(
		array: ReadonlyArray<T>,
	): ReadonlyArray<T> {
		//++ [EXCEPTION] Using native .length for performance
		if (array.length === 0) {
			return []
		}

		const result: Array<T> = []

		//++ [EXCEPTION] Using loop for stack safety instead of recursion
		//++ [EXCEPTION] Using native .length and .push() for performance
		for (let outerIndex = 0; outerIndex < array.length; outerIndex++) {
			const element = array[outerIndex]
			let isDuplicate = false

			//++ [EXCEPTION] Using inner loop to check for duplicates
			for (let innerIndex = 0; innerIndex < result.length; innerIndex++) {
				if (equalityFn(element, result[innerIndex])) {
					isDuplicate = true
					break
				}
			}

			if (!isDuplicate) {
				result.push(element)
			}
		}

		return result
	}
}
