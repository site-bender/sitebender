//++ Private helper for plain array path
//++ Drops first n elements using native slice
export default function _dropArray<T>(n: number) {
	return function _dropArrayWithN(
		array: ReadonlyArray<T>,
	): ReadonlyArray<T> {
		//++ Early return if n <= 0
		if (n <= 0) {
			return array
		}

		//++ [EXCEPTION] Using native .slice() for performance
		//++ Native method is well-tested and optimized
		return array.slice(n)
	}
}
