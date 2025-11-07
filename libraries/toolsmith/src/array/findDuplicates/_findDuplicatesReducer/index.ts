import type { FindDuplicatesAccumulator } from "../types/index.ts"

import not from "../../../logic/not/index.ts"
import isUndefined from "../../../predicates/isUndefined/index.ts"

//++ Reducer for finding duplicates (private, not curried for use in reduce)
export default function _findDuplicatesReducer<T>(
	acc: FindDuplicatesAccumulator<T>,
	item: T,
	index: number,
): FindDuplicatesAccumulator<T> {
	const seenIndex = acc.seen.get(item)

	if (not(isUndefined(seenIndex))) {
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
