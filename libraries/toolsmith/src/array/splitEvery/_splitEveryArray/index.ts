//++ [EXCEPTION] Loop approved for O(1) stack depth vs O(n) recursion stack
//++ [EXCEPTION] JS operators and methods permitted in Toolsmith for performance
//++ Private helper: splits array into fixed-size chunks using loops for stack safety
export default function _splitEveryArray<T>(chunkSize: number) {
	return function _splitEveryArrayWithSize(
		array: ReadonlyArray<T>,
	): ReadonlyArray<ReadonlyArray<T>> {
		//++ Handle invalid chunk size
		if (chunkSize <= 0 || !Number.isInteger(chunkSize)) {
			return []
		}

		//++ Handle empty array
		if (array.length === 0) {
			return []
		}

		const result: Array<Array<T>> = []

		//++ [EXCEPTION] Loop with mutation of local array for performance
		for (let index = 0; index < array.length; index += chunkSize) {
			const chunk = array.slice(index, index + chunkSize)
			result.push(chunk)
		}

		return result
	}
}
