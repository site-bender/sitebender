//++ Filters entries with maximum frequency (private, not curried for use in filter)
export default function _filterMaxFrequency<T>(
	maxFrequency: number | null,
) {
	return function filterByMaxFrequency([_, count]: [T, number]): boolean {
		return count === maxFrequency
	}
}
