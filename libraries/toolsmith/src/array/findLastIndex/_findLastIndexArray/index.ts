//++ Private helper: finds index of last matching element (plain array path)
export default function _findLastIndexArray<T>(
	predicate: (item: T, index: number, array: ReadonlyArray<T>) => boolean,
) {
	return function _findLastIndexArrayWithPredicate(
		array: ReadonlyArray<T>,
	): number | null {
		//++ [EXCEPTION] Using native .findLastIndex() for performance
		//++ Native method is optimized for backward iteration
		const index = array.findLastIndex(predicate)

		return index === -1 ? null : index
	}
}
