//++ Performs SameValue comparison using Object.is
export default function is<T>(a: T) {
	return function isSameAs<U>(b: U): boolean {
		return Object.is(a, b)
	}
}
