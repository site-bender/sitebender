import _deepEquals from "./_deepEquals/index.ts"

//++ Performs deep equality comparison between two values
export default function isEqual<T>(a: T) {
	return function compareWith<U>(b: U): boolean {
		// Start comparison with empty seen map
		return _deepEquals(a, b, new WeakMap<object, unknown>())
	}
}
