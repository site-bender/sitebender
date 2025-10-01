//++ Creates a predicate that checks if a value is greater than or equal to a threshold
export default function gte<T>(threshold: T) {
	return function isGreaterThanOrEqual<U extends T>(value: U): boolean {
		return value >= threshold
	}
}
