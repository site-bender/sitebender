import isNullish from "../../validation/isNullish/index.ts"

/*++
 | Groups array elements by the result of a key function
 |
 | Creates an object where keys are the results of the key function and
 | values are arrays of elements that produced that key. Useful for
 | categorizing, indexing, or aggregating data.
 */
const groupBy = <T, K extends string | number>(
	keyFn: (element: T) => K,
) =>
(
	array: ReadonlyArray<T> | null | undefined,
): Record<string, Array<T>> => {
	if (isNullish(array)) {
		return {}
	}

	return array.reduce((acc: Record<string, Array<T>>, element: T) => {
		const key = String(keyFn(element))
		const existing = Object.hasOwn(acc, key) ? acc[key] : []

		return {
			...acc,
			[key]: [...existing, element],
		}
	}, Object.create(null))
}

//?? [EXAMPLE] `groupBy((x: number) => x % 2)([1, 2, 3, 4]) // { "0": [2, 4], "1": [1, 3] }`
//?? [EXAMPLE] `groupBy((s: string) => s.length)(["a", "bb", "ccc"]) // { "1": ["a"], "2": ["bb"], "3": ["ccc"] }`
/*??
 | [EXAMPLE]
 | ```typescript
 | // Group people by age
 | const people = [
 |   { name: "Alice", age: 30 },
 |   { name: "Bob", age: 25 },
 |   { name: "Charlie", age: 30 }
 | ]
 | groupBy(p => p.age)(people)
 | // { "25": [{ name: "Bob", age: 25 }],
 | //   "30": [{ name: "Alice", age: 30 }, { name: "Charlie", age: 30 }] }
 | ```
 |
 | [EXAMPLE]
 | ```typescript
 | // Group by computed value
 | const byEvenOdd = groupBy((x: number) => x % 2 === 0 ? "even" : "odd")
 | byEvenOdd([1, 2, 3, 4, 5])
 | // { odd: [1, 3, 5], even: [2, 4] }
 | ```
 |
 | [EXAMPLE]
 | ```typescript
 | // Partial application
 | const groupByType = groupBy((item: { type: string }) => item.type)
 | groupByType([{ type: "A", value: 1 }, { type: "B", value: 2 }])
 | // { A: [{ type: "A", value: 1 }], B: [{ type: "B", value: 2 }] }
 | ```
 */

export default groupBy
