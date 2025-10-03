import isFinite from "../../validation/isFinite/index.ts"
import filter from "../filter/index.ts"
import isNotEmpty from "../isNotEmpty/index.ts"
import reduce from "../reduce/index.ts"
import _findClosest from "./_findClosest/index.ts"

//++ Finds the value closest to a target
export default function closest(target: number) {
	return function closestWithTarget(
		array?: ReadonlyArray<number> | null,
	): number | null {
		if (isNotEmpty(array)) {
			// Filter out non-finite numbers
			const validNumbers = filter<number>(isFinite)(array as Array<number>)

			if (isNotEmpty(validNumbers)) {
				// Use reduce to find the closest value
				const result = reduce(function useHelper(
					closestValue: number,
					currentValue: number,
				) {
					return _findClosest(target, closestValue, currentValue)
				})(validNumbers[0])(validNumbers)

				return result
			}
		}

		return null
	}
}
