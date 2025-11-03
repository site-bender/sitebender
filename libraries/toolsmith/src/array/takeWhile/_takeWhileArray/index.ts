import not from "../../../logic/not/index.ts"
import findIndex from "../../findIndex/index.ts"
import slice from "../../slice/index.ts"

//++ Private helper: takes from start while predicate is true (plain array)
export default function _takeWhileArray<T>(
	predicate: (element: T, index: number, array: ReadonlyArray<T>) => boolean,
) {
	return function _takeWhileArrayWithPredicate(
		array: ReadonlyArray<T>,
	): ReadonlyArray<T> {
		const takeIndex = findIndex(
			function stopTaking(element: T, index: number) {
				return not(predicate(element, index, array))
			},
		)(array)

		//++ If all elements match predicate, return entire array
		if (takeIndex === -1) {
			//++ [EXCEPTION] Spread operator permitted in Toolsmith for immutable copy
			return [...array]
		}

		//++ [EXCEPTION] Type assertion needed for slice compatibility
		return slice(0)(takeIndex)(array as Array<T>)
	}
}
