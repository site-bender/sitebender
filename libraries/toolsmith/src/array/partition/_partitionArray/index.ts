//++ Private helper: splits array by predicate into two groups (plain array)
//++ [EXCEPTION] Using native methods (.length, .push) and loops for performance
//++ No recursion to avoid stack overflow on large arrays
export default function _partitionArray<T>(
	predicate: (element: T, index: number, array: ReadonlyArray<T>) => boolean,
) {
	return function _partitionArrayWithPredicate(
		array: ReadonlyArray<T>,
	): [ReadonlyArray<T>, ReadonlyArray<T>] {
		const pass: Array<T> = []
		const fail: Array<T> = []

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
