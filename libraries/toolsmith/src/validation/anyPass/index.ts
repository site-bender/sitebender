//++ Creates a predicate that returns true if any supplied predicate returns true
export default function anyPass<T>(predicates: ReadonlyArray<(value: T) => unknown>) {
	return function checkAnyPass(value: T): boolean {
		return predicates.some(function applyPredicate(predicate) {
			return Boolean(predicate(value))
		})
	}
}
