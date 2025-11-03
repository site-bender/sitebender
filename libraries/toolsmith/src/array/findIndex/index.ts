//++ Finds the index of the first matching element
export default function findIndex<T>(
	predicate: (item: T, index: number, array: Array<T>) => boolean,
) {
	return function findIndexWithPredicate(array: Array<T>): number {
		/*++
		 | [EXCEPTION] Using native findIndex for performance
		 | No toolsmith alternative exists for finding index
		 | Native method is well-tested and optimized
		 */
		return array.findIndex(predicate)
	}
}
