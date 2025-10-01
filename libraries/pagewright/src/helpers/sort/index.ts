//-- [REFACTOR] Provide a concise description of this function here using Envoy description comment style
export default function sort<T>(compareFn?: (a: T, b: T) => number) {
	return function (array: readonly T[]): T[] {
		return [...array].sort(compareFn)
	}
}
