import isNullish from "../../validation/isNullish/index.ts"

//++ Returns a random element
const sample = <T>(
	array: ReadonlyArray<T> | null | undefined,
): T | undefined => {
	if (isNullish(array) || array.length === 0) {
		return undefined
	}

	const index = Math.floor(Math.random() * array.length)
	return array[index]
}

export default sample
