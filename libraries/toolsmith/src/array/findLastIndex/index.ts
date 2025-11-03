import isArray from "../../validation/isArray/index.ts"

/*++
 | [EXCEPTION] Using native findLastIndex for performance
 | Native method is optimized for backward iteration
 | Returns null instead of -1 for consistency with toolsmith patterns
 */

//++ Finds the index of the last matching element
export default function findLastIndex<T>(
	predicate: (item: T, index: number, array: ReadonlyArray<T>) => boolean,
) {
	return function findLastIndexWithPredicate(
		array: ReadonlyArray<T>,
	): number | null {
		if (isArray(array)) {
			const index = array.findLastIndex(predicate)

			return index === -1 ? null : index
		}

		return null
	}
}
