import absoluteValue from "../../math/absoluteValue/index.ts"
import isArray from "../../validation/isArray/index.ts"
import isEmpty from "../isEmpty/index.ts"
import isNotEmpty from "../isNotEmpty/index.ts"
import filter from "../filter/index.ts"
import reduce from "../reduce/index.ts"

//++ Finds the value closest to a target
export default function closest(target: number) {
	return function closestWithTarget(
		array: ReadonlyArray<number> | null | undefined,
	): number | null {
		if (isArray(array) && isNotEmpty(array)) {
			// Filter out non-finite numbers
			const validNumbers = filter(function isFiniteNumber(n: number) {
				return Number.isFinite(n)
			})(array)

			if (isNotEmpty(validNumbers)) {
				// Use reduce to find the closest value
				const result = reduce(
					function findClosest(closestValue: number, currentValue: number) {
						const currentDistance = absoluteValue(currentValue - target)
						const closestDistance = absoluteValue(closestValue - target)

						return currentDistance < closestDistance
							? currentValue
							: closestValue
					},
				)(validNumbers[0])(validNumbers)

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
