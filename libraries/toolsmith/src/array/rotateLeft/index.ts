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
