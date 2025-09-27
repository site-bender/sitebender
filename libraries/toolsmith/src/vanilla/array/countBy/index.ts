import isNotNullish from "../../validation/isNotNullish/index.ts"
import isNullish from "../../validation/isNullish/index.ts"

//++ Counts elements by grouping criteria
const countBy = <T, K extends string | number | symbol>(
	fn: (element: T) => K,
) =>
(
	array: ReadonlyArray<T> | null | undefined,
): Record<K, number> => {
	if (isNullish(array)) {
		return Object.create(null) as Record<K, number>
	}

	return array.reduce((acc, element) => {
		const key = fn(element)
		if (isNotNullish(key)) {
			return Object.assign(
				Object.create(null),
				acc,
				{ [key]: (acc[key] || 0) + 1 },
			) as Record<K, number>
		}
		return acc
	}, Object.create(null) as Record<K, number>)
}

//?? [EXAMPLE] `countBy((x: number) => x % 2 === 0 ? "even" : "odd")([1, 2, 3, 4, 5]) // { odd: 3, even: 2 }`
//?? [EXAMPLE] `countBy((x: number) => x)([])        // {}`
//?? [EXAMPLE] `countBy(() => "same")([1, 2, 3])     // { same: 3 }`
//?? [EXAMPLE] `countBy((x: number) => x)(null)      // {}`
/*??
 | [EXAMPLE]
 | ```typescript
 | // Count by property
 | const people = [
 |   { name: "Alice", age: 25 },
 |   { name: "Bob", age: 30 },
 |   { name: "Charlie", age: 25 }
 | ]
 | countBy((p: { age: number }) => p.age)(people)
 | // { "25": 2, "30": 1 }
 | ```
 |
 | [EXAMPLE]
 | ```typescript
 | // Count by grade level
 | const scores = [95, 87, 73, 91, 82]
 | countBy((score: number) => {
 |   if (score >= 90) return "A"
 |   if (score >= 80) return "B"
 |   return "C"
 | })(scores)
 | // { A: 2, B: 2, C: 1 }
 | ```
 |
 | [EXAMPLE]
 | ```typescript
 | // Partial application
 | const countByType = countBy((x: unknown) => typeof x)
 | countByType([1, "hello", true, 42])
 | // { number: 2, string: 1, boolean: 1 }
 | ```
 */

export default countBy
