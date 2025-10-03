import isNullish from "../../validation/isNullish/index.ts"

//++ Groups consecutive elements by predicate
const groupWith = <T>(
	predicate: (a: T, b: T) => boolean,
) =>
(
	array: ReadonlyArray<T> | null | undefined,
): Array<Array<T>> => {
	if (isNullish(array) || array.length === 0) {
		return []
	}

	return array.slice(1).reduce(
		(acc, curr, i) => {
			const lastGroup = acc[acc.length - 1]
			const prevElement = array[i] // i is already offset by 1 due to slice

			if (predicate(prevElement, curr)) {
				lastGroup.push(curr)
			} else {
				acc.push([curr])
			}
			return acc
		},
		[[array[0]]],
	)
}

export default groupWith
