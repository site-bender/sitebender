import isNullish from "../../validation/isNullish/index.ts"

//++ Returns n random elements without replacement
export default function sampleSize<T>(n: number) {
	return function sampleFromArray(
		array: ReadonlyArray<T> | null | undefined,
	): Array<T> {
		if (
			isNullish(array) || !Array.isArray(array) || array.length === 0 ||
			n <= 0
		) {
			return []
		}

		// If requesting more than available, return all in random order
		const sampleCount = Math.min(n, array.length)

		// Fisher-Yates shuffle algorithm (functional approach)
		const indices = Array.from(
			{ length: array.length },
			function createIndex(_, i) {
				return i
			},
		)
		const selected: Array<number> = []

		function selectRandom(
			remaining: Array<number>,
			count: number,
		): Array<number> {
			if (count === 0 || remaining.length === 0) return selected
			const randomIndex = Math.floor(Math.random() * remaining.length)
			selected.push(remaining[randomIndex])
			return selectRandom(
				[
					...remaining.slice(0, randomIndex),
					...remaining.slice(randomIndex + 1),
				],
				count - 1,
			)
		}

		selectRandom(indices, sampleCount)
		return selected.map(function getElement(i) {
			return array[i]
		})
	}
}

//?? [EXAMPLE] `sampleSize(3)([1, 2, 3, 4, 5, 6, 7, 8]) // [7, 2, 5] (3 random)`
//?? [EXAMPLE] `sampleSize(3)(["Alice", "Bob", "Charlie", "David", "Eve"]) // ["Charlie", "Alice", "Eve"]`
//?? [EXAMPLE] `sampleSize(10)([1, 2, 3]) // [3, 1, 2] (all in random order)`
//?? [EXAMPLE] `sampleSize(0)([1, 2, 3]) // []`
//?? [EXAMPLE] `sampleSize(1)([1, 2, 3]) // [2] (single element)`
//?? [EXAMPLE] `sampleSize(3)(null) // []`
