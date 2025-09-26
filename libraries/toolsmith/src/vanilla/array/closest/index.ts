import isNullish from "../../validation/isNullish/index.ts"

/*++
Finds the value closest to a target number

Searches through an array of numbers to find the value that has the
smallest absolute difference from the target. When multiple values
are equally close, returns the first one encountered.
*/
const closest = (
	target: number,
) =>
(
	array: ReadonlyArray<number> | null | undefined,
): number | null => {
	if (isNullish(array) || !Array.isArray(array) || array.length === 0) {
		return null
	}

	// Filter out non-finite numbers
	const validNumbers = array.filter((n) => Number.isFinite(n))

	if (validNumbers.length === 0) {
		return null
	}

	// Use reduce to find the closest value
	const result = validNumbers.reduce((closestValue, currentValue) => {
		const currentDistance = Math.abs(currentValue - target)
		const closestDistance = Math.abs(closestValue - target)

		return currentDistance < closestDistance ? currentValue : closestValue
	})

	return result
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

export default closest
