import not from "../../logic/not/index.ts"
import isNullish from "../../validation/isNullish/index.ts"

//++ Set difference between arrays
const difference = <T>(
	subtrahend: ReadonlyArray<T> | null | undefined,
) =>
(
	minuend: ReadonlyArray<T> | null | undefined,
): Array<T> => {
	if (isNullish(minuend)) {
		return []
	}

	if (
		isNullish(subtrahend) ||
		subtrahend.length === 0
	) {
		return [...minuend]
	}

	const set2 = new Set(subtrahend)

	// Use filter for O(n) time with O(1) lookups
	// This preserves duplicates in the minuend
	return minuend.filter((element) => not(set2.has(element)))
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

export default difference
