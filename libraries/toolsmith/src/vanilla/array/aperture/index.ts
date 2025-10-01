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
