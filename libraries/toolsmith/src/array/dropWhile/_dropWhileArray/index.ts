import not from "../../../logic/not/index.ts"
import findIndex from "../../findIndex/index.ts"
import slice from "../../slice/index.ts"

//++ Private helper: drops leading elements while predicate is true (plain array)
//++ [EXCEPTION] JS operators and methods permitted in Toolsmith for performance
export default function _dropWhileArray<T>(
	predicate: (element: T, index: number, array: ReadonlyArray<T>) => boolean,
) {
	return function _dropWhileArrayWithPredicate(
		array: ReadonlyArray<T>,
	): ReadonlyArray<T> {
		const dropIndex = findIndex(
			function stopDropping(element: T, index: number) {
				return not(predicate(element, index, array))
			},
		)(array)

		//++ If all elements match predicate, return empty array
		if (dropIndex === -1) {
			return []
		}

		//++ [EXCEPTION] Type assertion needed for slice compatibility
		return slice(dropIndex)(undefined)(array as Array<T>)
	}
}
