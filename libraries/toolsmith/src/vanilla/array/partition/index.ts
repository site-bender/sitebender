import isNullish from "../../validation/isNullish/index.ts"

//++ Splits array by predicate into two groups
const partition = <T>(
	predicate: (element: T, index: number, array: ReadonlyArray<T>) => boolean,
) =>
(
	array: ReadonlyArray<T> | null | undefined,
): [Array<T>, Array<T>] => {
	if (isNullish(array)) {
		return [[], []]
	}

	return array.reduce<[Array<T>, Array<T>]>(
		([pass, fail], element, index) =>
			predicate(element, index, array)
				? [[...pass, element], fail]
				: [pass, [...fail, element]],
		[[], []],
	)
}

export default partition
