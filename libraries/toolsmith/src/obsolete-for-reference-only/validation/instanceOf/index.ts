//++ Creates a predicate that checks if a value is an instance of a constructor
export default function instanceOf<T>(
	constructor: new (...args: Array<unknown>) => T,
) {
	return function isInstanceOf(value: unknown): value is T {
		return value instanceof constructor
	}
}
