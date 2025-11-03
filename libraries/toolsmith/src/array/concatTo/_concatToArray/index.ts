//++ Private helper: appends a fixed array to any plain array
export default function _concatToArray<T>(toAppend: ReadonlyArray<T>) {
	return function _concatToArrayWithAppend(
		baseArray: ReadonlyArray<T>,
	): ReadonlyArray<T> {
		//++ [EXCEPTION] Spread operator permitted in Toolsmith for immutable concatenation
		return [...baseArray, ...toAppend]
	}
}
