//++ Private helper: generates all permutations of array elements using iteration
export default function _permutationsArray<T>(
	array: ReadonlyArray<T>,
): ReadonlyArray<ReadonlyArray<T>> {
	//++ [EXCEPTION] Using .length property for array length check
	if (array.length === 0) {
		return [[]]
	}

	if (array.length === 1) {
		return [[...array]]
	}

	const result: Array<Array<T>> = []

	/*++
	 | [EXCEPTION] Using loops and iteration instead of recursion
	 | Permutations of n elements requires O(n!) space and time
	 | Using iterative approach with stack to avoid recursion depth issues
	 */

	//++ Stack contains: [current permutation, remaining elements indices]
	const stack: Array<[Array<T>, Array<number>]> = [[
		[],
		Array.from(
			{ length: array.length },
			function makeIndex(_, i) {
				return i
			},
		),
	]]

	//++ [EXCEPTION] Using .length property and comparison operators
	while (stack.length > 0) {
		const [current, remaining] = stack.pop()!

		if (remaining.length === 0) {
			result.push(current)
			continue
		}

		//++ Generate new states by choosing each remaining element
		for (let i = 0; i < remaining.length; i++) {
			const chosenIndex = remaining[i]
			const newCurrent = [...current, array[chosenIndex]]
			const newRemaining = [
				...remaining.slice(0, i),
				...remaining.slice(i + 1),
			]
			stack.push([newCurrent, newRemaining])
		}
	}

	return result
}
