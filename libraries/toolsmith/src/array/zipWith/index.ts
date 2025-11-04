import isNullish from "../../predicates/isNullish/index.ts"

//++ Combines arrays using a function
const zipWith = <T, U, V>(
	fn: (a: T, b: U) => V,
) =>
(
	array1: ReadonlyArray<T> | null | undefined,
) =>
(
	array2: ReadonlyArray<U> | null | undefined,
): Array<V> => {
	if (
		isNullish(array1) || !Array.isArray(array1) || array1.length === 0 ||
		isNullish(array2) || !Array.isArray(array2) || array2.length === 0
	) {
		return []
	}

	const minLength = Math.min(array1.length, array2.length)

	// Build result using recursion
	const zipRecursive = (index: number): Array<V> => {
		if (index >= minLength) {
			return []
		}

		return [
			fn(array1[index], array2[index]),
			...zipRecursive(index + 1),
		]
	}

	return zipRecursive(0)
}

export default zipWith
