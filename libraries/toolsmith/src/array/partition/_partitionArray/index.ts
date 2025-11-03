//++ Private helper: splits array by predicate into two groups (plain array)
export default function _partitionArray<T>(
	predicate: (element: T, index: number, array: ReadonlyArray<T>) => boolean,
) {
	return function _partitionArrayWithPredicate(
		array: ReadonlyArray<T>,
	): [ReadonlyArray<T>, ReadonlyArray<T>] {
		//++ [EXCEPTION] Recursion permitted in Toolsmith for functional iteration
		function partitionRecursive(
			index: number,
		): [ReadonlyArray<T>, ReadonlyArray<T>] {
			if (index >= array.length) {
				return [[], []]
			}

			const element = array[index]
			const [passRest, failRest] = partitionRecursive(index + 1)

			if (predicate(element, index, array)) {
				//++ [EXCEPTION] Spread operator permitted in Toolsmith for immutable prepend
				return [[element, ...passRest], failRest]
			}

			//++ [EXCEPTION] Spread operator permitted in Toolsmith for immutable prepend
			return [passRest, [element, ...failRest]]
		}

		return partitionRecursive(0)
	}
}
