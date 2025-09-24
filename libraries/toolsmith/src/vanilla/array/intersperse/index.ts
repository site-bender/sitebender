import isNullish from "../../validation/isNullish/index.ts"

/**
 * Inserts a separator element between all elements of an array
 *
 * Places the separator between each pair of adjacent elements in the array.
 * The separator is not added before the first element or after the last.
 * Useful for formatting, creating delimited lists, or adding spacing.
 *
 * @param separator - Element to insert between array elements
 * @param array - Array to intersperse with separator
 * @returns New array with separator between original elements
 *
 * @pure
 * @curried
 * @immutable
 *
 * @example
 * ```typescript
 * // Basic usage
 * intersperse(0)([1, 2, 3, 4])
 * // [1, 0, 2, 0, 3, 0, 4]
 *
 * // String separators
 * intersperse(" | ")(["home", "products", "about"])
 * // ["home", " | ", "products", " | ", "about"]
 *
 * // Breadcrumb trail
 * intersperse(" > ")(["Users", "Documents", "Reports"])
 * // ["Users", " > ", "Documents", " > ", "Reports"]
 *
 * // Object separator
 * intersperse({ type: "divider" })([
 *   { type: "content", value: "A" },
 *   { type: "content", value: "B" }
 * ])
 * // [{ type: "content", value: "A" }, { type: "divider" }, { type: "content", value: "B" }]
 *
 * // Partial application
 * const commaSeparate = intersperse(", ")
 * commaSeparate(["apple", "banana"]) // ["apple", ", ", "banana"]
 *
 * // Edge cases
 * intersperse(",")([1])      // [1] (single element)
 * intersperse(",")([])       // [] (empty array)
 * intersperse(",")(null)     // [] (null input)
 * ```
 */
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
