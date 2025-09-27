import isNullish from "../../validation/isNullish/index.ts"

//++ Creates sliding windows of consecutive elements
export default function aperture<T>(width: number) {
	return function apertureWithWidth(
		array: ReadonlyArray<T> | null | undefined,
	): Array<Array<T>> {
		if (isNullish(array) || !Array.isArray(array)) {
			return []
		}

		if (width <= 0 || width > array.length) {
			return []
		}

		// Create sliding window of size width using functional approach
		return Array.from(
			{ length: array.length - width + 1 },
			function createWindow(_, i) {
				return array.slice(i, i + width)
			},
		)
	}
}

//?? [EXAMPLE] `aperture(2)([1, 2, 3, 4, 5]) // [[1, 2], [2, 3], [3, 4], [4, 5]]`
//?? [EXAMPLE] `aperture(3)([1, 2, 3, 4, 5]) // [[1, 2, 3], [2, 3, 4], [3, 4, 5]]`
//?? [EXAMPLE] `aperture(5)([1, 2, 3])  // []`
//?? [EXAMPLE] `aperture(0)([1, 2, 3])  // []`
//?? [EXAMPLE] `aperture(2)([])         // []`
//?? [EXAMPLE] `aperture(2)(["the", "quick", "brown", "fox"]) // [["the", "quick"], ["quick", "brown"], ["brown", "fox"]]`
/*??
 | [EXAMPLE]
 | ```typescript
 | // Moving averages
 | const windows = aperture(3)([10, 20, 30, 40, 50])
 | windows.map(w => w.reduce((a, b) => a + b, 0) / w.length)
 | // [20, 30, 40]
 | ```
 |
 | [EXAMPLE]
 | ```typescript
 | // Partial application
 | const pairwise = aperture(2)
 | pairwise([1, 2, 3, 4])
 | // [[1, 2], [2, 3], [3, 4]]
 | ```
 */
