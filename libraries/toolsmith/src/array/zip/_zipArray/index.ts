//++ Private helper: zips two plain arrays into pairs
//++ [EXCEPTION] Using native methods (.length, .push, Math.min) and loops for performance
//++ No recursion to avoid stack overflow on large arrays
export default function _zipArray<T, U>(first: ReadonlyArray<T>) {
	return function _zipArrayWithFirst(
		second: ReadonlyArray<U>,
	): ReadonlyArray<[T, U]> {
		const length = Math.min(first.length, second.length)
		const result: Array<[T, U]> = []

		for (let index = 0; index < length; index++) {
			result.push([first[index], second[index]])
		}

		return result
	}
}
