import isNullish from "../../validation/isNullish/index.ts"

//++ Inserts a separator between elements
const intersperse = <T, U>(
	separator: U,
) =>
(
	array: ReadonlyArray<T> | null | undefined,
): Array<T | U> => {
	if (isNullish(array) || array.length === 0) {
		return []
	}

	if (array.length === 1) {
		return [...array]
	}

	// Use flatMap to intersperse the separator between elements
	// For each element except the last, return [element, separator]
	// For the last element, return just [element]
	return array.flatMap((element, index) =>
		index < array.length - 1 ? [element, separator] : [element]
	)
}

export default intersperse

/*??
 | [EXAMPLE]
 | ```typescript
 | intersperse(0)([1, 2, 3, 4])
 | // [1, 0, 2, 0, 3, 0, 4]
 | ```
 |
 | [EXAMPLE]
 | ```typescript
 | intersperse(" | ")(["home", "products", "about"])
 | // ["home", " | ", "products", " | ", "about"]
 | ```
 |
 | [EXAMPLE]
 | ```typescript
 | intersperse(" > ")(["Users", "Documents", "Reports"])
 | // ["Users", " > ", "Documents", " > ", "Reports"]
 | ```
 |
 | [EXAMPLE]
 | ```typescript
 | intersperse({ type: "divider" })([
 |   { type: "content", value: "A" },
 |   { type: "content", value: "B" }
 | ])
 | // [{ type: "content", value: "A" }, { type: "divider" }, { type: "content", value: "B" }]
 | ```
 |
 | [EXAMPLE]
 | ```typescript
 | const commaSeparate = intersperse(", ")
 | commaSeparate(["apple", "banana"]) // ["apple", ", ", "banana"]
 | ```
 |
 | [EXAMPLE]
 | ```typescript
 | intersperse(",")([1])      // [1] (single element)
 | intersperse(",")([])       // [] (empty array)
 | intersperse(",")(null)     // [] (null input)
 | ```
 */
