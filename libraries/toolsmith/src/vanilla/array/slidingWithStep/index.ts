import isNullish from "../../validation/isNullish/index.ts"

/*++
 | Creates sliding windows over array with custom step size
 |
 | Generates an array of overlapping or non-overlapping windows of specified
 | size, moving by a custom step amount. When step equals window size, windows
 | don't overlap. When step is less than window size, windows overlap. When
 | step is greater than window size, elements are skipped. Useful for signal
 | processing, time series analysis, and batch processing.
 */
const slidingWithStep =
	<T>(size: number, step: number) =>
	(array: Array<T> | null | undefined): Array<Array<T>> => {
		if (isNullish(array)) return []
		if (size <= 0 || step <= 0 || !Number.isFinite(size)) return []
		if (!Number.isFinite(step)) {
			// For infinite step, only return the first window if possible
			return array.length >= size ? [array.slice(0, size)] : []
		}
		if (array.length < size) return []

		// Use recursion instead of for loop
		const buildWindows = (index: number): Array<Array<T>> => {
			if (index > array.length - size) return []
			return [
				array.slice(index, index + size),
				...buildWindows(index + step),
			]
		}

		return buildWindows(0)
	}

export default slidingWithStep

//?? [EXAMPLE] `slidingWithStep(3, 1)([1, 2, 3, 4, 5]) // [[1, 2, 3], [2, 3, 4], [3, 4, 5]]`
//?? [EXAMPLE] `slidingWithStep(3, 3)([1, 2, 3, 4, 5, 6, 7, 8, 9]) // [[1, 2, 3], [4, 5, 6], [7, 8, 9]]`
//?? [EXAMPLE] `slidingWithStep(2, 3)([1, 2, 3, 4, 5, 6, 7, 8]) // [[1, 2], [4, 5], [7, 8]]`
//?? [EXAMPLE] `slidingWithStep(5, 1)([1, 2, 3]) // []`
//?? [EXAMPLE] `slidingWithStep(3, 1)(null) // []`
//?? [EXAMPLE] `slidingWithStep(3, 1)([]) // []`

//!! This is not curried.
