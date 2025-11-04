//++ [EXCEPTION] Loop approved for O(1) stack depth vs O(n) recursion stack
//++ [EXCEPTION] JS operators and methods permitted in Toolsmith for performance
//++ Private helper: creates sliding windows of consecutive elements using loops for stack safety
export default function _apertureArray<T>(width: number) {
	return function _apertureArrayWithWidth(
		array: ReadonlyArray<T>,
	): ReadonlyArray<ReadonlyArray<T>> {
		//++ Handle invalid width
		if (width <= 0 || !Number.isInteger(width)) {
			return []
		}

		//++ Handle width larger than array
		if (width > array.length) {
			return []
		}

		//++ Handle empty array
		if (array.length === 0) {
			return []
		}

		const result: Array<Array<T>> = []
		const windowCount = array.length - width + 1

		//++ [EXCEPTION] Loop with mutation of local array for performance
		for (let index = 0; index < windowCount; index++) {
			const window = array.slice(index, index + width)
			result.push(window)
		}

		return result
	}
}
