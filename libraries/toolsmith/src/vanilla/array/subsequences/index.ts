import isNullish from "../../validation/isNullish/index.ts"

//++ Generates all possible subsequences
//?? [WARNING] `Exponential complexity - 2^n subsequences for n elements`
const subsequences = <T>(
	array: ReadonlyArray<T> | null | undefined,
): Array<Array<T>> => {
	if (isNullish(array)) {
		return [[]]
	}

	if (array.length === 0) {
		return [[]]
	}

	// Build subsequences recursively
	// For each element, we have two choices: include it or exclude it
	const buildSubsequences = (
		remaining: ReadonlyArray<T>,
	): Array<Array<T>> => {
		if (remaining.length === 0) {
			return [[]]
		}

		const [head, ...tail] = remaining
		const tailSubsequences = buildSubsequences(tail)

		// For each subsequence of the tail, create two versions:
		// one without the head, and one with the head
		return tailSubsequences.reduce<Array<Array<T>>>(
			(acc, subseq) => [
				...acc,
				subseq, // Without head
				[head, ...subseq], // With head
			],
			[],
		)
	}

	return buildSubsequences(array)
}

export default subsequences

//?? [EXAMPLE] `subsequences([1, 2, 3]) // [[], [1], [2], [1, 2], [3], [1, 3], [2, 3], [1, 2, 3]]`
//?? [EXAMPLE] `subsequences([1]) // [[], [1]]`
//?? [EXAMPLE] `subsequences([]) // [[]]`
//?? [EXAMPLE] `subsequences(["a", "b"]) // [[], ["a"], ["b"], ["a", "b"]]`
//?? [EXAMPLE] `subsequences(null) // [[]]`
//?? [EXAMPLE] `subsequences([1, 2]).filter(sub => sub.length === 1) // [[1], [2]]`
