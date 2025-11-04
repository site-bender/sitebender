import not from "../../logic/not/index.ts"
import isNullish from "../../predicates/isNullish/index.ts"

//++ Reduces while predicate is true
const reduceWhile = <T, U>(
	predicate: (
		accumulator: U,
		element: T,
		index: number,
		array: ReadonlyArray<T>,
	) => boolean,
) =>
(
	reducer: (
		accumulator: U,
		element: T,
		index: number,
		array: ReadonlyArray<T>,
	) => U,
) =>
(
	initial: U,
) =>
(
	array: ReadonlyArray<T> | null | undefined,
): U => {
	if (isNullish(array)) {
		return initial
	}

	const recurse = (acc: U, idx: number): U => {
		if (idx >= array.length) {
			return acc
		}
		if (not(predicate(acc, array[idx], idx, array))) {
			return acc
		}
		return recurse(reducer(acc, array[idx], idx, array), idx + 1)
	}

	return recurse(initial, 0)
}

export default reduceWhile
