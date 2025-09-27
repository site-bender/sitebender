import isNullish from "../../validation/isNullish/index.ts"

//++ Replaces first occurrence via function
const replaceFirst =
	<T>(target: T) =>
	(replacer: (item: T) => T) =>
	(array: ReadonlyArray<T> | null | undefined): Array<T> => {
		if (isNullish(array)) {
			return []
		}
		const idx = (array as Array<T>).indexOf(target)
		if (idx === -1) return [...array]
		const out = [...array]
		out[idx] = replacer(out[idx] as T)
		return out
	}

export default replaceFirst

//?? [EXAMPLE] `replaceFirst(2)(n => n * 10)([1, 2, 3, 2, 4]) // [1, 20, 3, 2, 4]`
//?? [EXAMPLE] `replaceFirst("old")(s => "new")(["old", "test", "old"]) // ["new", "test", "old"]`
//?? [EXAMPLE] `replaceFirst(5)(n => n)([1, 2, 3]) // [1, 2, 3] (not found)`
//?? [EXAMPLE] `replaceFirst("ERROR")(s => "WARNING")(["ERROR", "info", "ERROR"]) // ["WARNING", "info", "ERROR"]`
//?? [EXAMPLE] `replaceFirst(null)(() => 0)([null, 1, null]) // [0, 1, null]`
//?? [EXAMPLE] `replaceFirst(1)(x => x * 2)(null) // []`
