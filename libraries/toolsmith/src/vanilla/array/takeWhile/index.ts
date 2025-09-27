import not from "../../logic/not/index.ts"
import isNullish from "../../validation/isNullish/index.ts"

//++ Takes from start while predicate is true
const takeWhile = <T>(
	predicate: (element: T, index: number, array: ReadonlyArray<T>) => boolean,
) =>
(
	array: ReadonlyArray<T> | null | undefined,
): Array<T> => {
	if (isNullish(array)) {
		return []
	}

	const takeIndex = array.findIndex((element, index) =>
		not(predicate(element, index, array))
	)

	return takeIndex === -1 ? [...array] : array.slice(0, takeIndex)
}

export default takeWhile

//?? [EXAMPLE] `takeWhile((x: number) => x < 5)([1, 3, 5, 7, 2, 1]) // [1, 3]`
//?? [EXAMPLE] `takeWhile((x: number) => x % 2 === 0)([2, 4, 6, 7, 8]) // [2, 4, 6]`
//?? [EXAMPLE] `takeWhile((item: { active: boolean }) => item.active)([{ id: 1, active: true }, { id: 2, active: true }, { id: 3, active: false }, { id: 4, active: true }]) // [{ id: 1, active: true }, { id: 2, active: true }]`
//?? [EXAMPLE] `takeWhile((x: number) => x < 5)([]) // []`
//?? [EXAMPLE] `takeWhile((x: number) => x > 0)([1, 2, 3]) // [1, 2, 3]`
//?? [EXAMPLE] `takeWhile((x: number) => x > 0)(null) // []`
