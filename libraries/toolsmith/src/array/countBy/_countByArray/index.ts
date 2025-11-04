//++ [EXCEPTION] Loop approved for O(1) stack depth vs O(n) recursion stack
//++ [EXCEPTION] JS operators and methods permitted in Toolsmith for performance
export default function _countByArray<T, K extends string | number | symbol>(
	fn: (element: T) => K,
) {
	return function _countByArrayWithFn(
		array: ReadonlyArray<T>,
	): Record<K, number> {
		const result: Record<K, number> = Object.create(null) as Record<K, number>

		//++ [EXCEPTION] Loop with mutation of local record for performance
		for (let index = 0; index < array.length; index++) {
			const element = array[index]
			const key = fn(element)

			if (Object.hasOwn(result, key as string | number | symbol)) {
				result[key] = result[key] + 1
			} else {
				result[key] = 1
			}
		}

		return result
	}
}
