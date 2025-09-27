import isNotEmpty from "../isNotEmpty/index.ts"
import reduce from "../reduce/index.ts"
import filter from "../filter/index.ts"
import map from "../map/index.ts"
import sort from "../sort/index.ts"
import max from "../max/index.ts"
import _buildFrequencyMaps from "./_buildFrequencyMaps/index.ts"
import _filterMaxFrequency from "./_filterMaxFrequency/index.ts"
import _extractFirstItem from "./_extractFirstItem/index.ts"
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

//?? [EXAMPLE] `findMostCommon([1, 2, 3, 2, 4, 2, 5])         // [2]`
//?? [EXAMPLE] `findMostCommon([1, 1, 2, 2, 3, 3])            // [1, 2, 3] (tie)`
//?? [EXAMPLE] `findMostCommon([1, 2, 3, 4, 5])               // [1, 2, 3, 4, 5] (all unique)`
//?? [EXAMPLE] `findMostCommon([])                            // []`
//?? [EXAMPLE] `findMostCommon([NaN, NaN, 1, 1])              // [NaN, 1] (uses SameValueZero)`
//?? [EXAMPLE] `findMostCommon([3, 1, 2, 1, 3, 2])            // [3, 1, 2] (first occurrence order)`
/*??
 | [EXAMPLE]
 | ```typescript
 | // String arrays
 | const words = "the quick brown fox the".split(" ")
 | findMostCommon(words)                         // ["the"]
 | ```
 */
