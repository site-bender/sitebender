//++ Private helper: computes set difference (plain array path)
//++ [EXCEPTION] Using native Set constructor and .has() method for performance
export default function _differenceArray<T>(subtrahend: ReadonlyArray<T>) {
	return function _differenceArrayWithSubtrahend(
		minuend: ReadonlyArray<T>,
	): ReadonlyArray<T> {
		//++ [EXCEPTION] Using native Set for O(1) lookups instead of O(n) array search
		const subtrahendSet = new Set(subtrahend)
		const result: Array<T> = []

		//++ [EXCEPTION] Using loop for stack safety instead of recursion
		//++ [EXCEPTION] Using native .length and .push() for performance
		for (let index = 0; index < minuend.length; index++) {
			const element = minuend[index]
			if (!subtrahendSet.has(element)) {
				result.push(element)
			}
		}

		return result
	}
}
