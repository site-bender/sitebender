import isNullish from "../../predicates/isNullish/index.ts"

//++ Randomly shuffles array elements
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
