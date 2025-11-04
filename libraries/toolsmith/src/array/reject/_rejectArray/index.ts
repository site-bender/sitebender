//++ Private helper: removes elements that satisfy predicate (plain array)
//++ [EXCEPTION] Using native .filter() method for performance
//++ This is a thin wrapper around native JavaScript .filter() with negation
export default function _rejectArray<T>(
	predicate: (element: T, index: number, array: ReadonlyArray<T>) => boolean,
) {
	return function _rejectArrayWithPredicate(
		array: ReadonlyArray<T>,
	): ReadonlyArray<T> {
		return array.filter(function filterPredicate(element, index, arr) {
			return !predicate(element, index, arr)
		})
	}
}
