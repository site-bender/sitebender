import isNullish from "../../validation/isNullish/index.ts"

/*++
 | Accumulates values progressively, returning all intermediate results
 |
 | Like reduce, but returns an array of all intermediate accumulator values
 | including the initial value. Useful for running totals, progressive
 | transformations, or tracking state changes over time.
 */
const scan = <T, U>(
	fn: (acc: U, item: T, index?: number) => U,
) =>
(
	initial: U,
) =>
(
	array: ReadonlyArray<T> | null | undefined,
): Array<U> => {
	if (isNullish(array) || !Array.isArray(array) || array.length === 0) {
		return [initial]
	}

	// Build result array with all intermediate values
	const scanRecursive = (
		acc: U,
		remaining: ReadonlyArray<T>,
		index: number,
		results: Array<U>,
	): Array<U> => {
		if (remaining.length === 0) {
			return results
		}

		const [head, ...tail] = remaining
		const newAcc = fn(acc, head, index)

		return scanRecursive(
			newAcc,
			tail,
			index + 1,
			[...results, newAcc],
		)
	}

	return scanRecursive(initial, array, 0, [initial])
}

export default scan

//?? [EXAMPLE] `scan((acc: number, n: number) => acc + n)(0)([1, 2, 3, 4]) // [0, 1, 3, 6, 10]`
//?? [EXAMPLE] `scan((acc: number, n: number) => acc * n)(1)([2, 3, 4]) // [1, 2, 6, 24]`
//?? [EXAMPLE] `scan((acc: string, char: string) => acc + char)("")(["h", "e", "l", "l", "o"]) // ["", "h", "he", "hel", "hell", "hello"]`
//?? [EXAMPLE] `scan((max: number, n: number) => Math.max(max, n))(-Infinity)([3, 1, 4, 1, 5]) // [-Infinity, 3, 3, 4, 4, 5]`
//?? [EXAMPLE] `scan((acc: number, n: number) => acc + n)(0)(null) // [0]`
//?? [EXAMPLE] `scan((acc: number, n: number) => acc + n)(0)([]) // [0]`
