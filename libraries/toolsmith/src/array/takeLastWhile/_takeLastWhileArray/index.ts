//++ Private helper for plain array path
//++ Takes elements from end while predicate is true
export default function _takeLastWhileArray<T>(
	predicate: (item: T, index: number, array: ReadonlyArray<T>) => boolean,
) {
	return function _takeLastWhileArrayWithPredicate(
		array: ReadonlyArray<T>,
	): ReadonlyArray<T> {
		//++ Early return for empty array
		//++ [EXCEPTION] Using array.length for early return check
		if (array.length === 0) {
			return []
		}

		//++ Find the index where predicate becomes false (scanning from end)
		//++ [EXCEPTION] Using loop for O(1) stack depth vs O(n) recursion stack
		//++ [EXCEPTION] JS operators and methods permitted in Toolsmith for performance
		let breakpoint = -1 //++ -1 means all elements match

		//++ Scan backwards to find first element where predicate is false
		for (let i = array.length - 1; i >= 0; i--) {
			if (!predicate(array[i], i, array)) {
				breakpoint = i
				break
			}
		}

		//++ If breakpoint is -1, all elements match - return entire array
		if (breakpoint === -1) {
			return array
		}

		//++ [EXCEPTION] Using native .slice() for performance
		return array.slice(breakpoint + 1)
	}
}
