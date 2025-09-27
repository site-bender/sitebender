import isNullish from "../../validation/isNullish/index.ts"

//++ Rotates elements left by n positions
const rotateLeft = <T>(
	n: number,
) =>
(
	array: ReadonlyArray<T> | null | undefined,
): Array<T> => {
	if (isNullish(array) || array.length === 0) {
		return []
	}

	// Normalize rotation amount to be within array bounds
	// Handles negative rotations and rotations larger than array length
	const len = array.length
	const normalizedN = ((n % len) + len) % len

	if (normalizedN === 0) {
		return [...array]
	}

	// Rotate by slicing and concatenating
	return [...array.slice(normalizedN), ...array.slice(0, normalizedN)]
}

export default rotateLeft

//?? [EXAMPLE] `rotateLeft(2)([1, 2, 3, 4, 5]) // [3, 4, 5, 1, 2]`
//?? [EXAMPLE] `rotateLeft(1)([1, 2, 3, 4, 5]) // [2, 3, 4, 5, 1]`
//?? [EXAMPLE] `rotateLeft(-2)([1, 2, 3, 4, 5]) // [4, 5, 1, 2, 3]`
//?? [EXAMPLE] `rotateLeft(7)([1, 2, 3, 4, 5]) // [3, 4, 5, 1, 2] (wraps around)`
//?? [EXAMPLE] `rotateLeft(0)([1, 2, 3]) // [1, 2, 3]`
//?? [EXAMPLE] `rotateLeft(2)(null) // []`
