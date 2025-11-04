import not from "../../logic/not/index.ts"
import isNullish from "../../predicates/isNullish/index.ts"

//++ Takes from end while predicate is true
const takeLastWhile = <T>(
	predicate: (value: T, index: number, array: ReadonlyArray<T>) => boolean,
) =>
(
	array: ReadonlyArray<T> | null | undefined,
): Array<T> => {
	if (isNullish(array) || array.length === 0) {
		return []
	}

	// Find the index where predicate becomes false (scanning from end)
	const findBreakpoint = (idx: number): number => {
		if (idx < 0 || not(predicate(array[idx], idx, array))) {
			return idx
		}
		return findBreakpoint(idx - 1)
	}

	const breakpoint = findBreakpoint(array.length - 1)
	return array.slice(breakpoint + 1)
}

export default takeLastWhile
