//++ Private helper: Plain array path for zipAll
//++ Uses native array methods for performance (marked with EXCEPTION comments)
export default function _zipAllArray<T, U>(
	array2: ReadonlyArray<U>,
) {
	return function zipAllWithSecondArray(
		array1: ReadonlyArray<T>,
	): ReadonlyArray<[T | undefined, U | undefined]> {
		//++ [EXCEPTION] Using native Math.max and array.length for performance
		const maxLength = Math.max(array1.length, array2.length)

		//++ [EXCEPTION] Using native Array.from for performance
		return Array.from({ length: maxLength }, function createTuple(
			_,
			index: number,
		): [T | undefined, U | undefined] {
			//++ [EXCEPTION] Using array.length and index access for performance
			const value1 = index < array1.length ? array1[index] : undefined
			const value2 = index < array2.length ? array2[index] : undefined
			return [value1, value2]
		})
	}
}
