//++ [EXCEPTION] Loop approved for O(1) stack depth vs O(n) recursion stack
//++ [EXCEPTION] JS operators and methods permitted in Toolsmith for performance
//++ Private helper: creates sliding windows with configurable size and step using loops for stack safety
export default function _slidingArray<T>(size: number) {
	return function _slidingArrayWithSize(step: number) {
		return function _slidingArrayWithStep(
			array: ReadonlyArray<T>,
		): ReadonlyArray<ReadonlyArray<T>> {
			//++ Handle invalid parameters
			if (
				size <= 0 || step <= 0 || !Number.isInteger(size) ||
				!Number.isInteger(step)
			) {
				return []
			}

			//++ Handle empty array or array smaller than window size
			if (array.length === 0 || array.length < size) {
				return []
			}

			const result: Array<Array<T>> = []

			//++ [EXCEPTION] Loop with mutation of local array for performance
			for (let index = 0; index + size <= array.length; index += step) {
				const window = array.slice(index, index + size)
				result.push(window)
			}

			return result
		}
	}
}
