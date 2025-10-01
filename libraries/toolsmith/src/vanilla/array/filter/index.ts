//++ Filters elements that satisfy a predicate
export default function filter<T>(predicate: (item: T) => boolean) {
	return function filterWithPredicate(array: Array<T>): Array<T> {
		/*++
		 | [EXCEPTION] Using native filter for performance
		 | No toolsmith alternative exists for filtering
		 | Native method is well-tested and optimized
		 */
		return array.filter(predicate)
	}
}
