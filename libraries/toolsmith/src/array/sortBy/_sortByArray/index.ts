//++ Private helper: sorts plain array by mapping function
export default function _sortByArray<T, U>(fn: (value: T) => U) {
	return function _sortByArrayWithFunction(
		array: ReadonlyArray<T>,
	): ReadonlyArray<T> {
		if (array.length === 0) {
			return []
		}

		//++ [EXCEPTION] Array.from, .map(), and .sort() permitted in Toolsmith for performance
		const mapped = Array.from(array).map(function mapWithIndex(element, index) {
			return {
				element,
				sortKey: fn(element),
				index,
			}
		})

		mapped.sort(function compareItems(a, b) {
			if (a.sortKey < b.sortKey) {
				return -1
			}
			if (a.sortKey > b.sortKey) {
				return 1
			}

			return a.index - b.index
		})

		return mapped.map(function extractElement(item) {
			return item.element
		})
	}
}
