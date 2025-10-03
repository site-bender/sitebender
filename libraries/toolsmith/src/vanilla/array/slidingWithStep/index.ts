import isNullish from "../../validation/isNullish/index.ts"

//++ Creates windows with custom size and step
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

//!! This is not curried.
