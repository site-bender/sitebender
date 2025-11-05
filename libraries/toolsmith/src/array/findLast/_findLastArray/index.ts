//++ Private helper: finds last matching element (plain array path)
export default function _findLastArray<T>(
	predicate: (item: T, index: number, array: ReadonlyArray<T>) => boolean,
) {
	return function _findLastArrayWithPredicate(
		array: ReadonlyArray<T>,
	): T | null {
		//++ [EXCEPTION] Using native .findLast() for performance
		//++ Native method is optimized for backward iteration
		const element = array.findLast(predicate)

		return element === undefined ? null : element
	}
}
