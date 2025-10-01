import type { Serializable } from "../../../../types/index.ts"

//++ Compares two key-value pairs by their string keys for sorting
export default function sortByKey(
	[firstKey]: [string, Serializable],
	[secondKey]: [string, Serializable],
): number {
	return firstKey.localeCompare(secondKey)
}
