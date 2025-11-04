import isNullish from "../../predicates/isNullish/index.ts"

//++ Returns a random element
const sample = <T>(
	array: ReadonlyArray<T> | null | undefined,
): T | null => {
	if (isNullish(array) || array.length === 0) {
		return null
	}

	const index = Math.floor(Math.random() * array.length)
	return array[index]
}

export default sample
