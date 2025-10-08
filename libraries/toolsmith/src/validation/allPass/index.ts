//++ Creates a predicate that returns true if all supplied predicates return true
export default function allPass<T>(predicates: ReadonlyArray<(value: T) => boolean>) {
	return function checkAllPass(value: T): boolean {
		return predicates.every(function applyPredicate(predicate) {
			return predicate(value)
		})
	}
}
