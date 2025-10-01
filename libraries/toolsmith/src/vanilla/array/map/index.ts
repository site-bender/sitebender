import isNullish from "../../validation/isNullish/index.ts"

//++ Transforms each element using a function
const map = <T, U>(
	fn: (element: T, index: number, array: ReadonlyArray<T>) => U,
) =>
(
	array: ReadonlyArray<T> | null | undefined,
): Array<U> => {
	if (isNullish(array) || !Array.isArray(array)) {
		return []
	}

	return array.map(fn)
}

export default map
