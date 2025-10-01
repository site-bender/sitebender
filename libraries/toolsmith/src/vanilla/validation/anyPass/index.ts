//++ Creates a predicate that returns true if any supplied predicate returns true
export default function anyPass<T>(predicates: Array<(value: T) => unknown>) {
	return function checkAnyPass(value: T): boolean {
		for (const predicate of predicates) {
			if (predicate(value)) {
				return true
			}
		}
		return false
	}
}
