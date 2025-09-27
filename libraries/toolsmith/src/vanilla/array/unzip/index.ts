import not from "../../logic/not/index.ts"
import isNullish from "../../validation/isNullish/index.ts"

//++ Separates array of pairs into two arrays
const unzip = <T, U>(
	pairs: ReadonlyArray<readonly [T, U]> | null | undefined,
): [Array<T>, Array<U>] => {
	if (isNullish(pairs) || pairs.length === 0) {
		return [[], []]
	}

	// Recursively extract elements from pairs
	const extractElements = (
		remainingPairs: ReadonlyArray<readonly [T, U]>,
		firstAcc: Array<T> = [],
		secondAcc: Array<U> = [],
	): [Array<T>, Array<U>] => {
		if (remainingPairs.length === 0) {
			return [firstAcc, secondAcc]
		}

		const [head, ...tail] = remainingPairs

		if (not(Array.isArray(head)) || head.length < 2) {
			return extractElements(tail, firstAcc, secondAcc)
		}

		return extractElements(
			tail,
			[...firstAcc, head[0]],
			[...secondAcc, head[1]],
		)
	}

	return extractElements(pairs)
}

export default unzip

//?? [EXAMPLE] `unzip([[1, "a"], [2, "b"], [3, "c"]]) // [[1, 2, 3], ["a", "b", "c"]]`
//?? [EXAMPLE] `unzip([["Alice", 25], ["Bob", 30], ["Charlie", 35]]) // [["Alice", "Bob", "Charlie"], [25, 30, 35]]`
//?? [EXAMPLE] `unzip([]) // [[], []]`
//?? [EXAMPLE] `unzip(null) // [[], []]`
//?? [EXAMPLE] `unzip([["Product A", 100], ["Product B", 200], ["Product C", 150]]) // [["Product A", "Product B", "Product C"], [100, 200, 150]]`
//?? [EXAMPLE] `unzip([[true, 1], [false, 0]]) // [[true, false], [1, 0]]`
