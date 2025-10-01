//++ Finds the first element matching a predicate
export default function find<T>(predicate: (item: T) => boolean) {
	return function findWithPredicate(array: Array<T>): T | null {
		/*++
		 | [EXCEPTION] Using native find for performance
		 | No toolsmith alternative exists for finding elements
		 | Native method is well-tested and optimized
		 */
		const element = array.find(predicate)

		return element === undefined ? null : element
	}
}
