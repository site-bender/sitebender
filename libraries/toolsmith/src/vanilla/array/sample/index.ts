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

//?? [EXAMPLE] `sample([1, 2, 3, 4, 5]) // 3 (random element)`
//?? [EXAMPLE] `sample(["red", "green", "blue"]) // "blue" (random)`
//?? [EXAMPLE] `sample(["common", "common", "rare"]) // "common" (66% chance)`
//?? [EXAMPLE] `sample([42]) // 42 (single element)`
//?? [EXAMPLE] `sample([]) // undefined`
//?? [EXAMPLE] `sample(null) // undefined`
