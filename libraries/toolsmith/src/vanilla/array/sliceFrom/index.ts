//++ Slices from index with specified length
const sliceFrom = (startIndex: number) =>
(length: number) =>
<T>(
	array: Array<T>,
): Array<T> => {
	if (length <= 0) return []

	// Normalize negative index
	const normalizedStart = startIndex < 0
		? Math.max(0, array.length + startIndex)
		: startIndex

	return array.slice(normalizedStart, normalizedStart + length)
}

export default sliceFrom

//?? [EXAMPLE] `sliceFrom(1)(2)([1, 2, 3, 4, 5]) // [2, 3]`
//?? [EXAMPLE] `sliceFrom(0)(3)(["a", "b", "c", "d"]) // ["a", "b", "c"]`
//?? [EXAMPLE] `sliceFrom(-3)(2)([1, 2, 3, 4, 5]) // [3, 4]`
//?? [EXAMPLE] `sliceFrom(2)(10)([1, 2, 3, 4]) // [3, 4] (length exceeds bounds)`
//?? [EXAMPLE] `sliceFrom(5)(3)([1, 2, 3]) // []`
//?? [EXAMPLE] `sliceFrom(0)(0)([1, 2, 3]) // []`
