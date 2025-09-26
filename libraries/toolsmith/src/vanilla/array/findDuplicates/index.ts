import not from "../../logic/not/index.ts"
import isNullish from "../../validation/isNullish/index.ts"

/*++
 | Returns array of elements that appear more than once
 |
 | Identifies all elements in an array that occur two or more times.
 | Each duplicate element appears only once in the result, preserving
 | the order of first occurrence.
 */
const findDuplicates = <T>(
	array: ReadonlyArray<T> | null | undefined,
): Array<T> => {
	if (isNullish(array) || array.length === 0) {
		return []
	}

	// Track duplicates and their first occurrence index
	interface AccType {
		seen: Map<T, number>
		duplicates: Array<{ item: T; firstIndex: number }>
		processedDuplicates: Set<T>
	}

	const result = array.reduce<AccType>(
		(acc, item, index) => {
			const seenIndex = acc.seen.get(item)

			if (seenIndex !== undefined) {
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
		},
		{
			seen: new Map(),
			duplicates: [],
			processedDuplicates: new Set(),
		},
	)

	// Sort by first occurrence index and extract items
	return result.duplicates
		.sort((a, b) => a.firstIndex - b.firstIndex)
		.map((entry) => entry.item)
}

//?? [EXAMPLE] `findDuplicates([1, 2, 3, 2, 4, 1, 5])      // [1, 2]`
//?? [EXAMPLE] `findDuplicates(["a", "b", "c", "b", "a"])  // ["a", "b"]`
//?? [EXAMPLE] `findDuplicates([1, 2, 3, 4, 5])            // [] (no duplicates)`
//?? [EXAMPLE] `findDuplicates([])                         // [] (empty array)`
//?? [EXAMPLE] `findDuplicates([NaN, NaN])                 // [NaN] (uses SameValueZero)`
/*??
 | [EXAMPLE]
 | ```typescript
 | // Objects by reference
 | const obj = { id: 1 }
 | findDuplicates([obj, { id: 1 }, obj])      // [obj] (same reference only)
 | ```
 */

export default findDuplicates
