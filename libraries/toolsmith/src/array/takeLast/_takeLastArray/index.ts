//++ Private helper for plain array path
//++ Takes last n elements using native slice
export default function _takeLastArray<T>(n: number) {
	return function _takeLastArrayWithN(
		array: ReadonlyArray<T>,
	): ReadonlyArray<T> {
		//++ Early return if n <= 0
		if (n <= 0) {
			return []
		}

		//++ [EXCEPTION] Using native .slice() with negative index for performance
		//++ Native method is well-tested and optimized for tail access
		return array.slice(-n)
	}
}
