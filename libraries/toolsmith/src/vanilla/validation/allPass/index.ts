//++ Creates a predicate that returns true if all supplied predicates return true
export default function allPass<T>(predicates: Array<(value: T) => boolean>) {
	return function checkAllPass(value: T): boolean {
		for (const predicate of predicates) {
			if (!predicate(value)) {
				return false
			}
		}
		return true
	}
}
