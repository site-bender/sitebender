//++ [EXCEPTION] Using native methods (.length, Object.create, Object.hasOwn, String) and loops for performance
//++ No recursion to avoid stack overflow on large arrays
export default function _frequencyArray<T>(array: ReadonlyArray<T>): Record<
	string,
	number
> {
	const result: Record<string, number> = Object.create(null)

	for (let index = 0; index < array.length; index++) {
		const element = array[index]
		const key = String(element)

		if (Object.hasOwn(result, key)) {
			result[key] = result[key] + 1
		} else {
			result[key] = 1
		}
	}

	return result
}
