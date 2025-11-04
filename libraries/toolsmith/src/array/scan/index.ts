import isNullish from "../../predicates/isNullish/index.ts"

//++ Returns all intermediate accumulator values
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
