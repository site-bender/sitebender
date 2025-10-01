//-- [REFACTOR] Provide a concise description of this function here using Envoy description comment style
export default function map<T, U>(fn: (item: T, index: number) => U) {
	return function (array: readonly T[]): U[] {
		return array.map(fn)
	}
}
