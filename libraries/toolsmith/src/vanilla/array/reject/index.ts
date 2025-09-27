import not from "../../logic/not/index.ts"
import isNullish from "../../validation/isNullish/index.ts"

//++ Removes elements that satisfy predicate
const reject = <T>(
	predicate: (value: T, index: number, array: ReadonlyArray<T>) => boolean,
) =>
(
	array: ReadonlyArray<T> | null | undefined,
): Array<T> => {
	if (isNullish(array)) {
		return []
	}

	return array.filter((value, index, arr) => not(predicate(value, index, arr)))
}

export default reject

//?? [EXAMPLE] `reject((x: number) => x % 2 === 0)([1, 2, 3, 4, 5, 6]) // [1, 3, 5]`
//?? [EXAMPLE] `reject((x: unknown) => x == null)([1, null, 2, undefined, 3]) // [1, 2, 3]`
//?? [EXAMPLE] `reject((u: { active: boolean }) => !u.active)([{ name: "Alice", active: true }, { name: "Bob", active: false }, { name: "Charlie", active: true }]) // [{ name: "Alice", active: true }, { name: "Charlie", active: true }]`
//?? [EXAMPLE] `reject((val: number, idx: number) => idx % 2 === 0)([10, 20, 30, 40, 50]) // [20, 40]`
//?? [EXAMPLE] `reject(() => true)([1, 2, 3]) // [] (reject all)`
//?? [EXAMPLE] `reject(() => false)([1, 2, 3]) // [1, 2, 3] (reject none)`
//?? [EXAMPLE] `reject(() => true)(null) // []`
