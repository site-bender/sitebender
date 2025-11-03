//++ Private helper: sorts plain array with optional comparator
export default function _sortArray<T>(compareFn?: (a: T, b: T) => number) {
	return function _sortArrayWithComparator(
		array: ReadonlyArray<T>,
	): ReadonlyArray<T> {
		//++ [EXCEPTION] Array.from and .sort() permitted in Toolsmith for performance
		return Array.from(array).sort(compareFn)
	}
}
