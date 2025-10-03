import isNullish from "../../validation/isNullish/index.ts"

//++ Flattens nested arrays to specified depth
const flatten = <T, D extends number = 1>(
	depth: D = 1 as D,
) =>
(
	array: ReadonlyArray<T> | null | undefined,
): Array<T extends ReadonlyArray<infer U> ? U : T> => {
	if (isNullish(array) || !Array.isArray(array)) {
		return []
	}

	return array.flat(depth) as Array<T extends ReadonlyArray<infer U> ? U : T>
}

export default flatten
