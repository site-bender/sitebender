import type { Serializable } from "../../../../types/index.ts"

//++ Compares two key-value pairs by their string keys for sorting
export default function sortByKey(
	[firstKey]: [string, Serializable],
	[secondKey]: [string, Serializable],
): number {
	return firstKey.localeCompare(secondKey)
}

//?? [EXAMPLE] [["b", 2], ["a", 1]].sort(sortByKey) // [["a", 1], ["b", 2]]
//?? [GOTCHA] Passed to sort method, so cannot be curried
