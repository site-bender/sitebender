import isNullish from "../../validation/isNullish/index.ts"

//++ Generates all possible pairs from two arrays
export default function cartesianProduct<T, U>(
	array1: ReadonlyArray<T> | null | undefined,
) {
	return function cartesianProductWithFirstArray(
		array2: ReadonlyArray<U> | null | undefined,
	): Array<[T, U]> {
		if (
			isNullish(array1) ||
			!Array.isArray(array1) ||
			array1.length === 0 ||
			isNullish(array2) ||
			!Array.isArray(array2) ||
			array2.length === 0
		) {
			return []
		}

		// Use flatMap for efficient generation
		return array1.flatMap(function mapFirstElement(element1) {
			return array2.map(function pairElements(element2) {
				return [element1, element2] as [T, U]
			})
		})
	}
}
