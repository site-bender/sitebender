import isArray from "../../predicates/isArray/index.ts"
import isFinite from "../../predicates/isFinite/index.ts"
import _findClosest from "./_findClosest/index.ts"

//++ Finds the value closest to a target
//++ NOTE: This is a plain function (single return path). Will be migrated to three-path pattern in Batch 22.
export default function closest(target: number) {
	return function closestWithTarget(
		array?: ReadonlyArray<number> | null,
	): number | null {
		if (!isArray(array) || array.length === 0) {
			return null
		}

		//++ [EXCEPTION] Using native .filter() and .reduce() is explicitly allowed for performance in Toolsmith implementations
		const validNumbers = array.filter(isFinite)

		if (validNumbers.length === 0) {
			return null
		}

		const result = validNumbers.reduce(function useHelper(
			closestValue: number,
			currentValue: number,
		) {
			return _findClosest(target, closestValue, currentValue)
		})

		return result
	}
}
