import not from "../../../logic/not/index.ts"

//++ Private helper: removes elements that satisfy predicate (plain array)
export default function _rejectArray<T>(
	predicate: (element: T, index: number, array: ReadonlyArray<T>) => boolean,
) {
	return function _rejectArrayWithPredicate(
		array: ReadonlyArray<T>,
	): ReadonlyArray<T> {
		//++ [EXCEPTION] Recursion permitted in Toolsmith for functional iteration
		function rejectRecursive(index: number): ReadonlyArray<T> {
			if (index >= array.length) {
				return []
			}

			const element = array[index]
			const rest = rejectRecursive(index + 1)

			if (not(predicate(element, index, array))) {
				//++ [EXCEPTION] Spread operator permitted in Toolsmith for immutable prepend
				return [element, ...rest]
			}

			return rest
		}

		return rejectRecursive(0)
	}
}
