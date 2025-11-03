//++ Private helper: concatenates two plain arrays
export default function _concatArray<T>(first: ReadonlyArray<T>) {
	return function _concatArrayWithFirst(
		second: ReadonlyArray<T>,
	): ReadonlyArray<T> {
		//++ [EXCEPTION] Spread operator permitted in Toolsmith for immutable concatenation
		return [...first, ...second]
	}
}
