//++ [EXCEPTION] Using native methods (.length, Object.create, Object.hasOwn) and loops for performance
//++ No recursion to avoid stack overflow on large arrays
export default function _countByArray<T, K extends string | number | symbol>(
	fn: (element: T) => K,
) {
	return function _countByArrayWithFn(
		array: ReadonlyArray<T>,
	): Record<K, number> {
		const result: Record<K, number> = Object.create(null) as Record<K, number>

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
