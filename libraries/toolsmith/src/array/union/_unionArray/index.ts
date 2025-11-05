//++ Private helper: computes set union (plain array path)
//++ [EXCEPTION] Using native Set constructor, spread operator, and Array.from() for performance
export default function _unionArray<T>(array1: ReadonlyArray<T>) {
	return function _unionArrayWithArray1(
		array2: ReadonlyArray<T>,
	): ReadonlyArray<T> {
		//++ [EXCEPTION] Using native Set for automatic deduplication
		//++ [EXCEPTION] Using spread operator to combine arrays efficiently
		const uniqueElements = new Set([...array1, ...array2])
		//++ [EXCEPTION] Using Array.from() to convert Set back to array
		return Array.from(uniqueElements)
	}
}
