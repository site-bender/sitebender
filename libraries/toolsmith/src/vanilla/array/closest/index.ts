import isNotEmpty from "../isNotEmpty/index.ts"
import filter from "../filter/index.ts"
import reduce from "../reduce/index.ts"
import isFinite from "../../validation/isFinite/index.ts"
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

//?? [EXAMPLE] `closest(5)([1, 3, 6, 9])      // 6`
//?? [EXAMPLE] `closest(10)([2, 5, 8, 14, 20]) // 8`
//?? [EXAMPLE] `closest(0)([-5, -2, 3, 7])     // -2`
//?? [EXAMPLE] `closest(5)([3, 7, 2, 8]) // 3 (both 3 and 7 are distance 2, but 3 comes first)`
//?? [EXAMPLE] `closest(5)([])                       // null`
//?? [EXAMPLE] `closest(5)([1, 3, NaN, 7, Infinity]) // 3 (non-finite filtered)`
//?? [EXAMPLE] `closest(5)([NaN, Infinity])          // null`
/*??
 | [EXAMPLE]
 | ```typescript
 | // Practical examples
 | const targetTemp = 72
 | const readings = [68, 70, 74, 76, 80]
 | closest(targetTemp)(readings)  // 70
 | ```
 |
 | [EXAMPLE]
 | ```typescript
 | // Partial application
 | const findClosestToZero = closest(0)
 | findClosestToZero([-10, -5, 3, 8])  // 3
 | findClosestToZero([1, -1, 2, -2])   // 1
 | ```
 */
