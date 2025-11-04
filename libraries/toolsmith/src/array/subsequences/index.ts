import isNullish from "../../predicates/isNullish/index.ts"

//++ Generates all possible subsequences
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
