//++ Counts occurrences of each element
const frequency = <T>(array: Array<T>): Map<T, number> => {
	return array.reduce((freq, item) => {
		freq.set(item, (freq.get(item) ?? 0) + 1)
		return freq
	}, new Map<T, number>())
}

export default frequency
