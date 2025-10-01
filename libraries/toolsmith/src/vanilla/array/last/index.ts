import isNullish from "../../validation/isNullish/index.ts"

//++ Returns the last element
const last = <T>(
	array: ReadonlyArray<T> | null | undefined,
): T | undefined =>
	isNullish(array) || !Array.isArray(array) ? undefined : array.at(-1)

export default last
