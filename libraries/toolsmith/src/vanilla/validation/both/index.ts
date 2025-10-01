//++ Creates a predicate that returns true if both supplied predicates return true
export default function both<T>(pred1: (value: T) => unknown) {
	return function withSecondPredicate(pred2: (value: T) => unknown) {
		return function checkBoth(value: T): boolean {
			return Boolean(pred1(value)) && Boolean(pred2(value))
		}
	}
}
