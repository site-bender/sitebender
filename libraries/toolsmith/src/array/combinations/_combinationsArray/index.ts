import _buildCombinations from "../_buildCombinations/index.ts"

//++ Private helper: generates all k-element combinations from array
export default function _combinationsArray<T>(k: number) {
	return function _combinationsArrayWithK(
		array: ReadonlyArray<T>,
	): ReadonlyArray<ReadonlyArray<T>> {
		//++ Special case: k = 0 returns one empty combination
		if (k === 0) {
			return [[]]
		}

		//++ Validate k is positive integer within array length
		if (
			k < 0 || !Number.isInteger(k) || k > array.length || array.length === 0
		) {
			return []
		}

		//++ Special case: k equals array length, return single combination of all elements
		if (k === array.length) {
			return [[...array]]
		}

		//++ Generate combinations using iterative helper
		return _buildCombinations(array, k, 0)
	}
}
