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
