//++ Private helper: splits array by predicate into two groups (plain array)
//++ [EXCEPTION] Loop approved for O(1) stack depth vs O(n) recursion stack
//++ [EXCEPTION] JS operators and methods permitted in Toolsmith for performance
export default function _partitionArray<T>(
	predicate: (element: T, index: number, array: ReadonlyArray<T>) => boolean,
) {
	return function _partitionArrayWithPredicate(
		array: ReadonlyArray<T>,
	): [ReadonlyArray<T>, ReadonlyArray<T>] {
		const pass: Array<T> = []
		const fail: Array<T> = []

		//++ [EXCEPTION] Loop with mutation of local arrays for performance
		for (let index = 0; index < array.length; index++) {
			const element = array[index]

			if (predicate(element, index, array)) {
				pass.push(element)
			} else {
				fail.push(element)
			}
		}

		return [pass, fail]
	}
}
