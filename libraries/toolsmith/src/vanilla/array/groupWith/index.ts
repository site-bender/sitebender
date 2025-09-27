import isNullish from "../../validation/isNullish/index.ts"

//++ Groups consecutive elements by predicate
const groupWith = <T>(
	predicate: (a: T, b: T) => boolean,
) =>
(
	array: ReadonlyArray<T> | null | undefined,
): Array<Array<T>> => {
	if (isNullish(array) || array.length === 0) {
		return []
	}

	return array.slice(1).reduce(
		(acc, curr, i) => {
			const lastGroup = acc[acc.length - 1]
			const prevElement = array[i] // i is already offset by 1 due to slice

			if (predicate(prevElement, curr)) {
				lastGroup.push(curr)
			} else {
				acc.push([curr])
			}
			return acc
		},
		[[array[0]]],
	)
}

//?? [EXAMPLE] `groupWith((a: number, b: number) => a === b)([1, 1, 2, 2, 3]) // [[1, 1], [2, 2], [3]]`
//?? [EXAMPLE] `groupWith((a: number, b: number) => b - a === 1)([1, 2, 3, 5, 6]) // [[1, 2, 3], [5, 6]]`
/*??
 | [EXAMPLE]
 | ```typescript
 | // Group consecutive equal elements
 | const equal = (a: number, b: number) => a === b
 | groupWith(equal)([1, 1, 2, 2, 2, 3, 1, 1])
 | // [[1, 1], [2, 2, 2], [3], [1, 1]]
 | ```
 |
 | [EXAMPLE]
 | ```typescript
 | // Group ascending sequences
 | const ascending = (a: number, b: number) => b >= a
 | groupWith(ascending)([1, 2, 3, 2, 3, 4, 1, 5])
 | // [[1, 2, 3], [2, 3, 4], [1, 5]]
 | ```
 |
 | [EXAMPLE]
 | ```typescript
 | // Group by property
 | const items = [
 |   { category: "A", value: 1 },
 |   { category: "A", value: 2 },
 |   { category: "B", value: 3 }
 | ]
 | groupWith((a, b) => a.category === b.category)(items)
 | // [[{ category: "A", value: 1 }, { category: "A", value: 2 }],
 | //  [{ category: "B", value: 3 }]]
 | ```
 */

export default groupWith
