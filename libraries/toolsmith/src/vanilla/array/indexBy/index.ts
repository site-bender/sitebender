import isNotNullish from "../../validation/isNotNullish/index.ts"
import isNullish from "../../validation/isNullish/index.ts"

//++ Indexes elements by a key function
export default function indexBy<T, K extends string | number | symbol>(
	keyFn: (element: T, index: number, array: ReadonlyArray<T>) => K,
) {
	return function indexArrayByKey(
		array: ReadonlyArray<T> | null | undefined,
	): Record<K, T> {
		if (isNullish(array)) {
			return {} as Record<K, T>
		}

		return array.reduce(function buildIndex(result, element, index) {
			const key = keyFn(element, index, array)
			if (isNotNullish(key)) {
				result[key] = element
			}
			return result
		}, {} as Record<K, T>)
	}
}

/*??
 | [EXAMPLE]
 | ```typescript
 | // Basic usage - index by id
 | const users = [
 |   { id: 1, name: "Alice" },
 |   { id: 2, name: "Bob" },
 |   { id: 3, name: "Charlie" }
 | ]
 | indexBy(u => u.id)(users)
 | // { 1: { id: 1, name: "Alice" }, 2: { id: 2, name: "Bob" }, 3: { id: 3, name: "Charlie" } }
 | ```
 |
 | [EXAMPLE]
 | ```typescript
 | // Last value wins for duplicates
 | indexBy((s: string) => s.length)(["a", "bb", "ccc", "dd", "e"])
 | // { 1: "e", 2: "dd", 3: "ccc" }
 | ```
 |
 | [EXAMPLE]
 | ```typescript
 | // Partial application
 | const indexById = indexBy((x: { id: string }) => x.id)
 | indexById([{ id: "a", val: 1 }, { id: "b", val: 2 }])
 | // { "a": { id: "a", val: 1 }, "b": { id: "b", val: 2 } }
 | ```
 */
