import not from "../../logic/not/index.ts"
import isArray from "../../validation/isArray/index.ts"
import isEmpty from "../isEmpty/index.ts"
import filter from "../filter/index.ts"
import toSet from "../toSet/index.ts"

//++ Set difference between arrays
export default function difference<T>(
	subtrahend: ReadonlyArray<T> | null | undefined,
) {
	return function differenceWithSubtrahend(
		minuend: ReadonlyArray<T> | null | undefined,
	): Array<T> {
		if (isArray(minuend)) {
			if (isArray(subtrahend) && not(isEmpty(subtrahend))) {
				const set2 = toSet(subtrahend)

				// Use filter for O(n) time with O(1) lookups
				// This preserves duplicates in the minuend
				return filter(function notInSet(element: T) {
					return not(set2.has(element))
				})(minuend as Array<T>)
			}

			return [...minuend]
		}

		return []
	}
}

//?? [EXAMPLE] `difference([2, 3])([1, 2, 3, 4, 5]) // [1, 4, 5]`
//?? [EXAMPLE] `difference(["b", "c"])(["a", "b", "c", "d"]) // ["a", "d"]`
//?? [EXAMPLE] `difference([])([1, 2, 3])          // [1, 2, 3]`
//?? [EXAMPLE] `difference([1, 2])([])              // []`
//?? [EXAMPLE] `difference([1, 2, 3])([1, 2, 3])   // []`
//?? [EXAMPLE] `difference([1, 2])(null)     // []`
//?? [EXAMPLE] `difference(null)([1, 2, 3])  // [1, 2, 3]`
/*??
 | [EXAMPLE]
 | ```typescript
 | // Partial application for filtering
 | const removeStopWords = difference(["the", "a", "an", "and"])
 | removeStopWords(["the", "quick", "brown", "fox", "and", "lazy"])
 | // ["quick", "brown", "fox", "lazy"]
 | ```
 |
 | [EXAMPLE]
 | ```typescript
 | // Objects use reference equality
 | const obj1 = { id: 1 }
 | const obj2 = { id: 2 }
 | difference([obj2])([obj1, obj2])  // [obj1]
 | ```
 */
