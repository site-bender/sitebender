//++ Private helper: sorts plain array using multiple comparators
export default function _sortWithArray<T>(
	comparators: ReadonlyArray<(a: T, b: T) => number>,
) {
	return function _sortWithArrayWithComparators(
		array: ReadonlyArray<T>,
	): ReadonlyArray<T> {
		if (comparators.length === 0) {
			return Array.from(array)
		}

		//++ [EXCEPTION] Array.from and .sort() permitted in Toolsmith for performance
		return Array.from(array).sort(function combineComparators(a, b) {
			function applyComparators(index: number): number {
				if (index >= comparators.length) {
					return 0
				}

				const result = comparators[index](a, b)

				if (result !== 0) {
					return result
				}

				return applyComparators(index + 1)
			}

			return applyComparators(0)
		})
	}
}
