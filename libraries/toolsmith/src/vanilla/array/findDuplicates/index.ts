import isNotEmpty from "../isNotEmpty/index.ts"
import reduce from "../reduce/index.ts"
import sort from "../sort/index.ts"
import map from "../map/index.ts"
import subtract from "../../math/subtract/index.ts"
import _findDuplicatesReducer from "./_findDuplicatesReducer/index.ts"
import type {
	DuplicateEntry,
	FindDuplicatesAccumulator,
} from "./types/index.ts"

//++ Finds elements that appear more than once
export default function findDuplicates<T>(
	array: ReadonlyArray<T> | null | undefined,
): Array<T> {
	if (isNotEmpty(array)) {
		const validArray = array as Array<T>

		const result = reduce(function findDups(
			acc: FindDuplicatesAccumulator<T>,
			item: T,
			index: number,
		) {
			return _findDuplicatesReducer(acc, item, index)
		})({
			seen: new Map(),
			duplicates: [],
			processedDuplicates: new Set(),
		})(validArray)

		// Sort by first occurrence index and extract items
		const sorted = sort(function byFirstIndex(
			a: DuplicateEntry<T>,
			b: DuplicateEntry<T>,
		) {
			return subtract(b.firstIndex)(a.firstIndex) as number
		})(result.duplicates)

		return map(function extractItem(entry: DuplicateEntry<T>) {
			return entry.item
		})(sorted)
	}

	return []
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
