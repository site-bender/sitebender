//++ lte(threshold)(value) — inclusive <= comparison predicate
export default function lte<T>(threshold: T) {
	return function isLessThanOrEqual<U extends T>(value: U): boolean {
		return value <= threshold
	}
}
