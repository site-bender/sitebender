//++ [EXCEPTION] Using native methods (.length, .push, Object.create, Object.hasOwn, String) and loops for performance
//++ No recursion to avoid stack overflow on large arrays
export default function _groupByArray<T, K extends string | number>(
	keyFn: (element: T) => K,
) {
	return function _groupByArrayWithKeyFn(
		array: ReadonlyArray<T>,
	): Record<string, ReadonlyArray<T>> {
		const result: Record<string, Array<T>> = Object.create(null)

		for (let index = 0; index < array.length; index++) {
			const element = array[index]
			const key = String(keyFn(element))

			if (Object.hasOwn(result, key)) {
				result[key].push(element)
			} else {
				result[key] = [element]
			}
		}

		return result
	}
}
