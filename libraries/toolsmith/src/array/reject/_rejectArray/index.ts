import not from "../../../logic/not/index.ts"

//++ Private helper: removes elements that satisfy predicate (plain array)
//++ [EXCEPTION] Loop approved for O(1) stack depth vs O(n) recursion stack
//++ [EXCEPTION] JS operators and methods permitted in Toolsmith for performance
export default function _rejectArray<T>(
	predicate: (element: T, index: number, array: ReadonlyArray<T>) => boolean,
) {
	return function _rejectArrayWithPredicate(
		array: ReadonlyArray<T>,
	): ReadonlyArray<T> {
		const result: Array<T> = []

		//++ [EXCEPTION] Loop with mutation of local array for performance
		for (let index = 0; index < array.length; index++) {
			const element = array[index]

			if (not(predicate(element, index, array))) {
				result.push(element)
			}
		}

		return result
	}
}
