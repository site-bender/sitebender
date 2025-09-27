import isNullish from "../../validation/isNullish/index.ts"

//++ Replaces all occurrences via function
const replaceAll =
	<T>(target: T) =>
	(replacer: (item: T) => T) =>
	(array: ReadonlyArray<T> | null | undefined): Array<T> => {
		if (isNullish(array)) {
			return []
		}
		return array.map((item) => (item === target ? replacer(item) : item))
	}

export default replaceAll

//?? [EXAMPLE] `replaceAll(2)((n) => n * 10)([1, 2, 3, 2, 4]) // [1, 20, 3, 20, 4]`
//?? [EXAMPLE] `replaceAll("old")(() => "new")(["old", "test", "old"]) // ["new", "test", "new"]`
//?? [EXAMPLE] `replaceAll(null)(() => 0)([1, null, 2, null]) // [1, 0, 2, 0]`
//?? [EXAMPLE] `replaceAll(5)((n) => n + 1)([1, 2, 3]) // [1, 2, 3] (no match)`
//?? [EXAMPLE] `replaceAll(1)((n) => n * 2)(null) // []`
