//++ [EXCEPTION] Loop approved for O(1) stack depth vs O(n) recursion stack
//++ [EXCEPTION] JS operators and methods permitted in Toolsmith for performance
export default function _frequencyArray<T>(array: ReadonlyArray<T>): Record<
	string,
	number
> {
	const result: Record<string, number> = Object.create(null)

	//++ [EXCEPTION] Loop with mutation of local record for performance
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
