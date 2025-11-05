//++ Private helper: creates sliding windows of consecutive elements using loops for stack safety
//++ [EXCEPTION] Using native methods (.length, .slice, .push, Number.isInteger) and loops for performance
//++ No recursion to avoid stack overflow on large arrays
export default function _apertureArray<T>(width: number) {
	return function _apertureArrayWithWidth(
		array: ReadonlyArray<T>,
	): ReadonlyArray<ReadonlyArray<T>> {
		if (width <= 0 || !Number.isInteger(width)) {
			return []
		}

		if (width > array.length) {
			return []
		}

		if (array.length === 0) {
			return []
		}

		const result: Array<Array<T>> = []
		const windowCount = array.length - width + 1

		for (let index = 0; index < windowCount; index++) {
			const window = array.slice(index, index + width)
			result.push(window)
		}

		return result
	}
}
