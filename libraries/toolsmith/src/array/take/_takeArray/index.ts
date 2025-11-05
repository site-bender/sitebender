//++ Private helper for plain array path
//++ Takes first n elements using native slice
export default function _takeArray<T>(n: number) {
	return function _takeArrayWithN(
		array: ReadonlyArray<T>,
	): ReadonlyArray<T> {
		//++ Early return if n <= 0
		if (n <= 0) {
			return []
		}

		//++ [EXCEPTION] Using native .slice() for performance
		//++ Native method is well-tested and optimized
		return array.slice(0, n)
	}
}
