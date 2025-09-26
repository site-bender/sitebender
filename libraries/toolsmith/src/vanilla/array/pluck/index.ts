import isNotNullish from "../../validation/isNotNullish/index.ts"
import isNullish from "../../validation/isNullish/index.ts"

/*++
 | Extracts a list of property values from an array of objects
 |
 | Maps over an array of objects and extracts the value of a specified
 | property from each object. Returns an array of the extracted values.
 | If an object doesn't have the property, undefined is included in the
 | result. This is a specialized map operation for property extraction.
 */
const pluck = <T, K extends keyof T>(
	key: K,
) =>
(
	array: ReadonlyArray<T> | null | undefined,
): Array<T[K] | undefined> => {
	if (isNullish(array)) {
		return []
	}

	return array.map((item) => {
		if (isNotNullish(item) && typeof item === "object") {
			return (item as Record<string | number | symbol, unknown>)[
				key as unknown as string
			] as T[K] | undefined
		}
		return undefined
	})
}

export default pluck

//?? [EXAMPLE] `pluck("name")([{ id: 1, name: "Alice", age: 30 }, { id: 2, name: "Bob", age: 25 }, { id: 3, name: "Charlie", age: 35 }]) // ["Alice", "Bob", "Charlie"]`
//?? [EXAMPLE] `pluck("age")([{ id: 1, name: "Alice", age: 30 }, { id: 2, name: "Bob", age: 25 }, { id: 3, name: "Charlie", age: 35 }]) // [30, 25, 35]`
//?? [EXAMPLE] `pluck("a")([{ a: 1, b: 2 }, { a: 3 }, { b: 7 }]) // [1, 3, undefined]`
//?? [EXAMPLE] `pluck("key")(null) // []`
//?? [EXAMPLE] `pluck("key")(undefined) // []`
//?? [EXAMPLE] `pluck("key")([]) // []`
