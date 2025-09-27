import not from "../../logic/not/index.ts"
import isNullish from "../../validation/isNullish/index.ts"

//++ Splits at first failing predicate
const span = <T>(
	predicate: (element: T, index: number, array: ReadonlyArray<T>) => boolean,
) =>
(
	array: ReadonlyArray<T> | null | undefined,
): [Array<T>, Array<T>] => {
	if (isNullish(array)) {
		return [[], []]
	}

	if (array.length === 0) {
		return [[], []]
	}

	// Find the split point
	const splitIndex = array.findIndex((element, index) =>
		not(predicate(element, index, array))
	)

	if (splitIndex === -1) {
		// All elements match the predicate
		return [[...array], []]
	}

	if (splitIndex === 0) {
		// No elements match the predicate
		return [[], [...array]]
	}

	// Split the array at the found index
	return [
		array.slice(0, splitIndex),
		array.slice(splitIndex),
	]
}

export default span

//?? [EXAMPLE] `span((x: number) => x >= 0)([1, 2, 3, -1, 4, 5]) // [[1, 2, 3], [-1, 4, 5]]`
//?? [EXAMPLE] `span((x: number) => x % 2 === 0)([2, 4, 6, 7, 8, 10]) // [[2, 4, 6], [7, 8, 10]]`
//?? [EXAMPLE] `span((u: { active: boolean }) => u.active)([{ name: "Alice", active: true }, { name: "Bob", active: true }, { name: "Charlie", active: false }]) // [[{name: "Alice", active: true}, {name: "Bob", active: true}], [{name: "Charlie", active: false}]]`
//?? [EXAMPLE] `span((x: number) => x > 0)([1, 2, 3, 4]) // [[1, 2, 3, 4], []]`
//?? [EXAMPLE] `span((x: number) => x > 10)([1, 2, 3]) // [[], [1, 2, 3]]`
//?? [EXAMPLE] `span((x: number) => x > 0)(null) // [[], []]`
