import isEqual from "../../../validation/isEqual/index.ts"
import length from "../../length/index.ts"

//++ Builds k-element combinations from an array using iteration (private)
export default function _buildCombinations<T>(
	elements: ReadonlyArray<T>,
	k: number,
	startIndex: number,
): Array<Array<T>> {
	if (isEqual(k)(0)) {
		return [[]]
	}

	const n = length(elements)
	const result: Array<Array<T>> = []

	/*++
	 | [EXCEPTION] Using loops instead of recursion to prevent stack overflow
	 | Recursion depth equals array length, would blow stack for large arrays
	 | Loop version handles any size input within memory constraints
	 */

	// Stack to simulate recursion: [current combination, next index, remaining size]
	const stack: Array<[Array<T>, number, number]> = [[[], startIndex, k]]

	while (stack.length > 0) {
		const [combo, index, remaining] = stack.pop()!

		if (isEqual(remaining)(0)) {
			result.push(combo)
			continue
		}

		if (index >= n) {
			continue
		}

		if (n - index < remaining) {
			continue
		}

		// Skip current element
		stack.push([combo, index + 1, remaining])

		// Include current element
		stack.push([[...combo, elements[index]], index + 1, remaining - 1])
	}

	return result
}
