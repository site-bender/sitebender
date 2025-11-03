import filter from "../filter/index.ts"
import isNotEmpty from "../isNotEmpty/index.ts"
import map from "../map/index.ts"
import max from "../max/index.ts"
import reduce from "../reduce/index.ts"
import sort from "../sort/index.ts"
import _buildFrequencyMaps from "./_buildFrequencyMaps/index.ts"
import _extractFirstItem from "./_extractFirstItem/index.ts"
import _filterMaxFrequency from "./_filterMaxFrequency/index.ts"
import _sortByFirstOccurrence from "./_sortByFirstOccurrence/index.ts"

//++ Finds the most frequently occurring elements
export default function findMostCommon<T>(
	array: ReadonlyArray<T> | null | undefined,
): Array<T> {
	if (isNotEmpty(array)) {
		// Build frequency and first occurrence maps
		const { frequencyMap, firstOccurrence } = reduce<T, {
			frequencyMap: Map<T, number>
			firstOccurrence: Map<T, number>
		}>(_buildFrequencyMaps)({
			frequencyMap: new Map<T, number>(),
			firstOccurrence: new Map<T, number>(),
		})(array as ReadonlyArray<T>)

		// Find the maximum frequency
		const frequencies = Array.from(frequencyMap.values())
		const maxFrequency = max(frequencies)

		// Collect all elements with maximum frequency and sort by first occurrence
		const entries = Array.from(frequencyMap.entries())

		const maxItems = filter<[T, number]>(_filterMaxFrequency(maxFrequency))(
			entries,
		)

		const items = map<[T, number], T>(_extractFirstItem)(maxItems)

		return sort<T>(_sortByFirstOccurrence(firstOccurrence))(items)
	}
	return []
}
