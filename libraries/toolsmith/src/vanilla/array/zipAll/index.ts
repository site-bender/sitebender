//++ Zips arrays filling missing with undefined
const zipAll = <T, U>(
	array2: ReadonlyArray<U> | null | undefined,
) =>
(
	array1: ReadonlyArray<T> | null | undefined,
): Array<[T | undefined, U | undefined]> => {
	// Normalize null/undefined arrays
	const normalizedArray1 = array1 ?? []
	const normalizedArray2 = array2 ?? []

	const maxLength = Math.max(normalizedArray1.length, normalizedArray2.length)

	// Recursively build pairs with undefined filling
	const buildPairs = (
		index: number,
	): Array<[T | undefined, U | undefined]> => {
		if (index >= maxLength) {
			return []
		}

		const value1 = index < normalizedArray1.length
			? normalizedArray1[index]
			: undefined
		const value2 = index < normalizedArray2.length
			? normalizedArray2[index]
			: undefined

		return [
			[value1, value2] as [T | undefined, U | undefined],
			...buildPairs(index + 1),
		]
	}

	return buildPairs(0)
}

export default zipAll

//?? [EXAMPLE] `zipAll([4, 5, 6, 7])([1, 2, 3]) // [[1, 4], [2, 5], [3, 6], [undefined, 7]]`
//?? [EXAMPLE] `zipAll([4, 5])([1, 2, 3, 4]) // [[1, 4], [2, 5], [3, undefined], [4, undefined]]`
//?? [EXAMPLE] `zipAll([85, 92, 78])(["Alice", "Bob", "Charlie", "David"]) // [["Alice", 85], ["Bob", 92], ["Charlie", 78], ["David", undefined]]`
//?? [EXAMPLE] `zipAll([1, 2, 3])(null) // []`
//?? [EXAMPLE] `zipAll(null)([1, 2, 3]) // []`
//?? [EXAMPLE] `zipAll([])(["a", "b", "c"]) // [["a", undefined], ["b", undefined], ["c", undefined]]`
