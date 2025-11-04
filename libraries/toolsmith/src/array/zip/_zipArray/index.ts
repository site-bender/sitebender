//++ Private helper: zips two plain arrays into pairs
//++ [EXCEPTION] Loop approved for O(1) stack depth vs O(n) recursion stack
//++ [EXCEPTION] JS operators and methods permitted in Toolsmith for performance
export default function _zipArray<T, U>(first: ReadonlyArray<T>) {
	return function _zipArrayWithFirst(
		second: ReadonlyArray<U>,
	): ReadonlyArray<[T, U]> {
		const length = Math.min(first.length, second.length)
		const result: Array<[T, U]> = []

		//++ [EXCEPTION] Loop with mutation of local array for performance
		for (let index = 0; index < length; index++) {
			result.push([first[index], second[index]])
		}

		return result
	}
}
