import isNullish from "../../validation/isNullish/index.ts"

/*++
 | Returns a new array with elements randomly shuffled
 |
 | Creates a new array with all elements randomly reordered using the
 | Fisher-Yates shuffle algorithm. Produces a uniform distribution where
 | each permutation has equal probability. The original array is not modified.
 */
export default function shuffle<T>(
	array: ReadonlyArray<T> | null | undefined,
): Array<T> {
	if (isNullish(array) || !Array.isArray(array) || array.length === 0) {
		return []
	}

	// Fisher-Yates shuffle (pure functional approach)
	function shuffleRecursive(arr: Array<T>, i: number): Array<T> {
		if (i <= 0) return arr
		const j = Math.floor(Math.random() * (i + 1))
		// Create new array with swapped elements (no mutation)
		const shuffled = arr.map(function swapElements(item, idx) {
			if (idx === i) return arr[j]
			if (idx === j) return arr[i]
			return item
		})
		return shuffleRecursive(shuffled, i - 1)
	}

	return shuffleRecursive([...array], array.length - 1)
}

//?? [EXAMPLE] `shuffle([1, 2, 3, 4, 5]) // [3, 1, 5, 2, 4] (random order)`
//?? [EXAMPLE] `shuffle(["a", "b", "c", "d"]) // ["c", "a", "d", "b"] (random)`
//?? [EXAMPLE] `shuffle([{ id: 1 }, { id: 2 }, { id: 3 }]) // random order`
//?? [EXAMPLE] `shuffle([42]) // [42] (single element)`
//?? [EXAMPLE] `shuffle([]) // []`
//?? [EXAMPLE] `shuffle(null) // []`
