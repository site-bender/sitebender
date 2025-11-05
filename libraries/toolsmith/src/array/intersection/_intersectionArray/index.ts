//++ Private helper: computes set intersection (plain array path)
//++ [EXCEPTION] Using native Set constructor and .has() method for performance
export default function _intersectionArray<T>(array2: ReadonlyArray<T>) {
	return function _intersectionArrayWithArray2(
		array1: ReadonlyArray<T>,
	): ReadonlyArray<T> {
		//++ [EXCEPTION] Using native Set for O(1) lookups instead of O(n) array search
		const set2 = new Set(array2)
		const result: Array<T> = []

		//++ [EXCEPTION] Using loop for stack safety instead of recursion
		//++ [EXCEPTION] Using native .length and .push() for performance
		for (let index = 0; index < array1.length; index++) {
			const element = array1[index]
			if (set2.has(element)) {
				result.push(element)
			}
		}

		return result
	}
}
