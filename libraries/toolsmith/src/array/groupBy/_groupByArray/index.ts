//++ [EXCEPTION] Loop approved for O(1) stack depth vs O(n) recursion stack
//++ [EXCEPTION] JS operators and methods permitted in Toolsmith for performance
export default function _groupByArray<T, K extends string | number>(
	keyFn: (element: T) => K,
) {
	return function _groupByArrayWithKeyFn(
		array: ReadonlyArray<T>,
	): Record<string, ReadonlyArray<T>> {
		const result: Record<string, Array<T>> = Object.create(null)

		//++ [EXCEPTION] Loop with mutation of local record for performance
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
