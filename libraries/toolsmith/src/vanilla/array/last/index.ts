import isNullish from "../../validation/isNullish/index.ts"

//++ Returns the last element
const last = <T>(
	array: ReadonlyArray<T> | null | undefined,
): T | null => {
	if (isNullish(array) || !Array.isArray(array)) {
		return null
	}

	const element = array.at(-1)

	return element === undefined ? null : element
}

export default last
