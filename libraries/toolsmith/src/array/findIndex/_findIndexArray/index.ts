//++ Private helper: finds index of first matching element (plain array path)
export default function _findIndexArray<T>(
	predicate: (item: T, index: number, array: ReadonlyArray<T>) => boolean,
) {
	return function _findIndexArrayWithPredicate(
		array: ReadonlyArray<T>,
	): number {
		//++ [EXCEPTION] Using native .findIndex() for performance
		//++ Native method is well-tested and optimized
		return array.findIndex(predicate)
	}
}
