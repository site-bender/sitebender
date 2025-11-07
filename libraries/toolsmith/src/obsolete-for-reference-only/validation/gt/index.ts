//++ Creates a predicate that checks if a value is greater than a threshold
export default function gt<T>(threshold: T) {
	return function isGreaterThan<U extends T>(value: U): boolean {
		return value > threshold
	}
}
