import isArray from "../../validation/isArray/index.ts"

/*++
 | [EXCEPTION] Using native findLast for performance
 | Native method is optimized for backward iteration
 | No toolsmith alternative exists for reverse iteration
 */

//++ Finds the last element matching a predicate
export default function findLast<T>(
	predicate: (item: T, index: number, array: Array<T>) => boolean,
) {
	return function findLastWithPredicate(
		array: Array<T>,
	): T | null {
		if (isArray(array)) {
			const element = array.findLast(predicate)

			return element === undefined ? null : element
		}
		return null
	}
}
