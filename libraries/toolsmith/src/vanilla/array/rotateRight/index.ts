import isNullish from "../../validation/isNullish/index.ts"

//++ Rotates elements right by n positions
const rotateRight = <T>(
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

	// Rotate right by slicing from the end and concatenating
	return [...array.slice(-normalizedN), ...array.slice(0, -normalizedN)]
}

export default rotateRight
