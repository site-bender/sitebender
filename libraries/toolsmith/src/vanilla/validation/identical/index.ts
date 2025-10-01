//++ Performs strict equality comparison using the === operator
export default function identical<T>(a: T) {
	return function isIdenticalTo(b: T): boolean {
		return a === b
	}
}
