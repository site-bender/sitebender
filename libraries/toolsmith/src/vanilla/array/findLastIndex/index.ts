import isArray from "../../validation/isArray/index.ts"

/*++
 | [EXCEPTION] Using native findLastIndex for performance
 | Native method is optimized for backward iteration
 | Returns undefined instead of -1 for consistency with toolsmith patterns
 */

//++ Finds the index of the last matching element
export default function findLastIndex<T>(
	predicate: (item: T, index: number, array: ReadonlyArray<T>) => boolean,
) {
	return function findLastIndexWithPredicate(
		array: ReadonlyArray<T>,
	): number | undefined {
		if (isArray(array)) {
			const index = array.findLastIndex(predicate)

			return index === -1 ? undefined : index
		}

		return undefined
	}
}
