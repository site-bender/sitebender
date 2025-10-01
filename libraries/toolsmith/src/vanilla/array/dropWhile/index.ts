import not from "../../logic/not/index.ts"
import isArray from "../../validation/isArray/index.ts"
import isEqual from "../../validation/isEqual/index.ts"
import findIndex from "../findIndex/index.ts"
import slice from "../slice/index.ts"

//++ Drops leading elements while predicate is true
export default function dropWhile<T>(
	predicate: (element: T, index: number, array: ReadonlyArray<T>) => boolean,
) {
	return function dropWhileWithPredicate(
		array: ReadonlyArray<T> | null | undefined,
	): Array<T> {
		if (isArray(array)) {
			const validArray = array as Array<T>
			const dropIndex = findIndex(
				function stopDropping(element: T, index: number) {
					return not(predicate(element, index, validArray))
				},
			)(validArray)

			if (isEqual(dropIndex)(-1)) {
				return []
			}

			return slice(dropIndex)(undefined)(validArray)
		}

		return []
	}
}
