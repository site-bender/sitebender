//++ [EXCEPTION] Loop approved for O(1) stack depth vs O(n) recursion stack
//++ [EXCEPTION] JS operators and methods permitted in Toolsmith for performance
//++ Private helper: chunks array into fixed-size subarrays using loops for stack safety
export default function _chunkArray<T>(size: number) {
	return function _chunkArrayWithSize(
		array: ReadonlyArray<T>,
	): ReadonlyArray<ReadonlyArray<T>> {
		//++ Handle invalid chunk size
		if (size <= 0 || !Number.isInteger(size)) {
			return []
		}

		//++ Handle empty array
		if (array.length === 0) {
			return []
		}

		const result: Array<Array<T>> = []

		//++ [EXCEPTION] Loop with mutation of local array for performance
		for (let index = 0; index < array.length; index += size) {
			const chunk = array.slice(index, index + size)
			result.push(chunk)
		}

		return result
	}
}
