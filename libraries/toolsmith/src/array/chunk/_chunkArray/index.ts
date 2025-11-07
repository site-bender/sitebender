//++ Private helper: chunks array into fixed-size subarrays using loops for stack safety
//++ [EXCEPTION] Using native methods (.length, .slice, .push, Number.isInteger) and loops for performance
//++ No recursion to avoid stack overflow on large arrays
export default function _chunkArray<T>(size: number) {
	return function _chunkArrayWithSize(
		array: ReadonlyArray<T>,
	): ReadonlyArray<ReadonlyArray<T>> {
		if (size <= 0 || !Number.isInteger(size)) {
			return []
		}

		if (array.length === 0) {
			return []
		}

		const result: Array<Array<T>> = []

		for (let index = 0; index < array.length; index += size) {
			const chunk = array.slice(index, index + size)
			result.push(chunk)
		}

		return result
	}
}
