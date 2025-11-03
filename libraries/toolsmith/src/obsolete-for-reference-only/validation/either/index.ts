//++ Creates a predicate that returns true if either supplied predicate returns true
export default function either<T>(pred1: (value: T) => unknown) {
	return function withSecondPredicate(pred2: (value: T) => unknown) {
		return function checkEither(value: T): boolean {
			return Boolean(pred1(value)) || Boolean(pred2(value))
		}
	}
}
