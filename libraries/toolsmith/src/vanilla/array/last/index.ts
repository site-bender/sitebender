import isNullish from "../../validation/isNullish/index.ts"

//++ Return the last element of an array; null/undefined or empty arrays yield undefined
const last = <T>(
	array: ReadonlyArray<T> | null | undefined,
): T | undefined =>
	isNullish(array) || !Array.isArray(array) ? undefined : array.at(-1)

export default last

//?? [EXAMPLE] `last([1, 2, 3]) // 3`
//?? [EXAMPLE] `last(["a", "b", "c"]) // "c"`
//?? [EXAMPLE] `last([]) // undefined`
//?? [EXAMPLE] `last(null) // undefined`
//?? [EXAMPLE] `last(undefined) // undefined`
