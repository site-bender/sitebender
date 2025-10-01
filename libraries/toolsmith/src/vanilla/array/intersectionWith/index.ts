import isNullish from "../../validation/isNullish/index.ts"

//++ Finds intersection using custom comparator
const intersectionWith = <T, U>(
	comparator: (a: T, b: U) => boolean,
) =>
(
	array2: ReadonlyArray<U> | null | undefined,
) =>
(
	array1: ReadonlyArray<T> | null | undefined,
): Array<T> => {
	if (isNullish(array1) || array1.length === 0) {
		return []
	}

	if (isNullish(array2) || array2.length === 0) {
		return []
	}

	return array1.filter((element1) =>
		array2.some((element2) => comparator(element1, element2))
	)
}

export default intersectionWith
