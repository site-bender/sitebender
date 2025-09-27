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

//?? [EXAMPLE] `partition((x: number) => x % 2 === 0)([1, 2, 3, 4, 5, 6]) // [[2, 4, 6], [1, 3, 5]]`
//?? [EXAMPLE] `partition((x: number) => x > 10)([5, 15, 8, 20, 3, 12]) // [[15, 20, 12], [5, 8, 3]]`
//?? [EXAMPLE] `partition((user: { active: boolean }) => user.active)([{ name: "Alice", active: true }, { name: "Bob", active: false }, { name: "Charlie", active: true }]) // [[{ name: "Alice", active: true }, { name: "Charlie", active: true }], [{ name: "Bob", active: false }]]`
//?? [EXAMPLE] `partition((x: number) => x > 0)([]) // [[], []]`
//?? [EXAMPLE] `partition((x: number) => x > 0)(null) // [[], []]`
//?? [EXAMPLE] `partition((x: number) => x > 0)(undefined) // [[], []]`
