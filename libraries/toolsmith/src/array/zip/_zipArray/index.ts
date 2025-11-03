//++ Private helper: zips two plain arrays into pairs
export default function _zipArray<T, U>(first: ReadonlyArray<T>) {
	return function _zipArrayWithFirst(
		second: ReadonlyArray<U>,
	): ReadonlyArray<[T, U]> {
		const length = Math.min(first.length, second.length)

		//++ [EXCEPTION] Recursion permitted in Toolsmith for performance
		function buildPairs(index: number): ReadonlyArray<[T, U]> {
			if (index >= length) {
				return []
			}

			return [
				[first[index], second[index]] as [T, U],
				...buildPairs(index + 1),
			]
		}

		return buildPairs(0)
	}
}
