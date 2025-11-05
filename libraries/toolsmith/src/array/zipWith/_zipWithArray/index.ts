//++ Private helper: Plain array path for zipWith
//++ Uses native array methods for performance (marked with EXCEPTION comments)
export default function _zipWithArray<T, U, V>(
	fn: (a: T) => (b: U) => V,
) {
	return function zipWithWithFunction(
		array1: ReadonlyArray<T>,
	) {
		return function zipWithWithFirstArray(
			array2: ReadonlyArray<U>,
		): ReadonlyArray<V> {
			//++ [EXCEPTION] Using native Math.min and array.length for performance
			const minLength = Math.min(array1.length, array2.length)

			//++ [EXCEPTION] Using native Array.from for performance
			return Array.from({ length: minLength }, function applyFunction(
				_,
				index: number,
			): V {
				//++ [EXCEPTION] Using index access for performance
				return fn(array1[index])(array2[index])
			})
		}
	}
}
