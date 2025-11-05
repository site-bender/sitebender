//++ [EXCEPTION] Using native methods (.length) and loops for performance
//++ No recursion to avoid stack overflow on large arrays
export default function _indexByArray<T, K extends string | number | symbol>(
	keyFn: (element: T, index: number, array: ReadonlyArray<T>) => K,
) {
	return function _indexByArrayWithKeyFn(
		array: ReadonlyArray<T>,
	): Record<K, T> {
		const result: Record<K, T> = {} as Record<K, T>

		for (let index = 0; index < array.length; index++) {
			const element = array[index]
			const key = keyFn(element, index, array)
			result[key] = element
		}

		return result
	}
}
