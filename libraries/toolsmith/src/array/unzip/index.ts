import not from "../../logic/not/index.ts"
import isNullish from "../../predicates/isNullish/index.ts"

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
