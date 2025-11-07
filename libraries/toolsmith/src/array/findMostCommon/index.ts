import isArray from "../../predicates/isArray/index.ts"
import _buildFrequencyMaps from "./_buildFrequencyMaps/index.ts"
import _extractFirstItem from "./_extractFirstItem/index.ts"
import _filterMaxFrequency from "./_filterMaxFrequency/index.ts"
import _sortByFirstOccurrence from "./_sortByFirstOccurrence/index.ts"

//++ Finds the most frequently occurring elements
//++ NOTE: This is a plain function (single return path). Will be migrated to three-path pattern in future batch.
export default function findMostCommon<T>(
	array: ReadonlyArray<T> | null | undefined,
): Array<T> {
	if (!isArray(array) || array.length === 0) {
		return []
	}

	//++ [EXCEPTION] Using native .reduce() for significant performance benefit and index parameter support
	// Build frequency and first occurrence maps
	const { frequencyMap, firstOccurrence } = array.reduce(
		_buildFrequencyMaps,
		{
			frequencyMap: new Map<T, number>(),
			firstOccurrence: new Map<T, number>(),
		},
	)

	// Find the maximum frequency
	const frequencies = Array.from(frequencyMap.values())
	//++ [EXCEPTION] Using Math.max with spread for significant performance benefit
	const maxFrequency = Math.max(...frequencies)

	// Collect all elements with maximum frequency
	const entries = Array.from(frequencyMap.entries())

	//++ [EXCEPTION] Using native .filter() for significant performance benefit
	const maxItems = entries.filter(_filterMaxFrequency(maxFrequency))

	//++ [EXCEPTION] Using native .map() for significant performance benefit
	const items = maxItems.map(_extractFirstItem)

	//++ [EXCEPTION] Using native .sort() on a mutable copy for significant performance benefit
	const sortedItems = [...items].sort(_sortByFirstOccurrence(firstOccurrence))

	return sortedItems
}
