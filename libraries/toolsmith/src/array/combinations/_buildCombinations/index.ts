//++ Builds k-element combinations from an array using iteration (private)
export default function _buildCombinations<T>(
	elements: ReadonlyArray<T>,
	k: number,
	startIndex: number,
): Array<Array<T>> {
	//++ [EXCEPTION] Using === operator for primitive number comparison
	if (k === 0) {
		return [[]]
	}

	//++ [EXCEPTION] Using .length property for array length
	const n = elements.length
	const result: Array<Array<T>> = []

	/*++
	 | [EXCEPTION] Using loops instead of recursion to prevent stack overflow
	 | Recursion depth equals array length, would blow stack for large arrays
	 | Loop version handles any size input within memory constraints
	 */

	// Stack to simulate recursion: [current combination, next index, remaining size]
	const stack: Array<[Array<T>, number, number]> = [[[], startIndex, k]]

	//++ [EXCEPTION] Using .length property and comparison operators
	while (stack.length > 0) {
		const [combo, index, remaining] = stack.pop()!

		if (remaining === 0) {
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
