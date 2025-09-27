import not from "../../../logic/not/index.ts"
import isNotUndefined from "../../../validation/isNotUndefined/index.ts"
import type { FindDuplicatesAccumulator } from "../types/index.ts"

//++ Reducer for finding duplicates (private, not curried for use in reduce)
export default function _findDuplicatesReducer<T>(
	acc: FindDuplicatesAccumulator<T>,
	item: T,
	index: number,
): FindDuplicatesAccumulator<T> {
	const seenIndex = acc.seen.get(item)

	if (isNotUndefined(seenIndex)) {
		// Item has been seen before
		if (not(acc.processedDuplicates.has(item))) {
			// First time we're seeing this as a duplicate
			acc.duplicates.push({ item, firstIndex: seenIndex })
			acc.processedDuplicates.add(item)
		}
	} else {
		// First occurrence of this item
		acc.seen.set(item, index)
	}

	return acc
}
