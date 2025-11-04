//++ [EXCEPTION] Loop approved for O(1) stack depth vs O(n) recursion stack
//++ [EXCEPTION] JS operators and methods permitted in Toolsmith for performance
export default function _indexByArray<T, K extends string | number | symbol>(
	keyFn: (element: T, index: number, array: ReadonlyArray<T>) => K,
) {
	return function _indexByArrayWithKeyFn(
		array: ReadonlyArray<T>,
	): Record<K, T> {
		const result: Record<K, T> = {} as Record<K, T>

		//++ [EXCEPTION] Loop with mutation of local record for performance
		for (let index = 0; index < array.length; index++) {
			const element = array[index]
			const key = keyFn(element, index, array)
			result[key] = element
		}

		return result
	}
}
