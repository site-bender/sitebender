//++ Private helper: finds elements that appear more than once (plain array path)
export default function _findDuplicatesArray<T>(
	array: ReadonlyArray<T>,
): ReadonlyArray<T> {
	//++ [EXCEPTION] Using native .length for performance
	if (array.length === 0) {
		return []
	}

	//++ Track seen elements and their first index
	const seen: Map<T, number> = new Map()
	//++ Track duplicates we've already added to result
	const processedDuplicates: Set<T> = new Set()
	//++ Result array with duplicates in order of first occurrence
	const duplicatesWithIndex: Array<{ item: T; firstIndex: number }> = []

	//++ [EXCEPTION] Using loop for O(n) performance instead of recursion
	//++ [EXCEPTION] Using native .length, .get(), .set(), .has(), .add(), .push() for performance
	for (let index = 0; index < array.length; index++) {
		const item = array[index]
		const seenIndex = seen.get(item)

		if (seenIndex !== undefined) {
			// Item has been seen before
			if (!processedDuplicates.has(item)) {
				// First time we're seeing this as a duplicate
				duplicatesWithIndex.push({ item, firstIndex: seenIndex })
				processedDuplicates.add(item)
			}
		} else {
			// First occurrence of this item
			seen.set(item, index)
		}
	}

	//++ Sort by first occurrence index (ascending)
	//++ [EXCEPTION] Using native .sort() for performance
	duplicatesWithIndex.sort(function compareFirstIndex(a, b) {
		return a.firstIndex - b.firstIndex
	})

	//++ Extract items from result
	const result: Array<T> = []
	//++ [EXCEPTION] Using loop to extract items
	for (let i = 0; i < duplicatesWithIndex.length; i++) {
		result.push(duplicatesWithIndex[i].item)
	}

	return result
}
