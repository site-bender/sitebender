//++ Private helper for plain array path
//++ Drops last n elements using native slice
export default function _dropLastArray<T>(n: number) {
	return function _dropLastArrayWithN(
		array: ReadonlyArray<T>,
	): ReadonlyArray<T> {
		//++ Early return if n <= 0
		if (n <= 0) {
			return array
		}

		//++ [EXCEPTION] Using native .slice() for performance
		//++ Native method is well-tested and optimized
		//++ [EXCEPTION] Using array.length for slice calculation
		const endIndex = array.length - n
		return array.slice(0, endIndex >= 0 ? endIndex : 0)
	}
}
