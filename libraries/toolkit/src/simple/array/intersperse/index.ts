/**
 * Inserts a separator element between all elements of an array
 *
 * Places the separator between each pair of adjacent elements in the array.
 * The separator is not added before the first element or after the last.
 * Useful for formatting, creating delimited lists, or adding spacing.
 *
 * @curried (separator) => (array) => result
 * @param separator - Element to insert between array elements
 * @param array - Array to intersperse with separator
 * @returns New array with separator between original elements
 * @example
 * ```typescript
 * // Add commas between numbers
 * intersperse(0)([1, 2, 3, 4])
 * // [1, 0, 2, 0, 3, 0, 4]
 *
 * // Add separator strings
 * intersperse(" | ")(["home", "products", "about", "contact"])
 * // ["home", " | ", "products", " | ", "about", " | ", "contact"]
 *
 * // Create breadcrumb trail
 * intersperse(" > ")(["Users", "Documents", "Reports", "2024"])
 * // ["Users", " > ", "Documents", " > ", "Reports", " > ", "2024"]
 *
 * // Add line breaks
 * intersperse("\n")(["Line 1", "Line 2", "Line 3"])
 * // ["Line 1", "\n", "Line 2", "\n", "Line 3"]
 *
 * // Intersperse objects
 * intersperse({ type: "divider" })([
 *   { type: "content", value: "A" },
 *   { type: "content", value: "B" },
 *   { type: "content", value: "C" }
 * ])
 * // [
 * //   { type: "content", value: "A" },
 * //   { type: "divider" },
 * //   { type: "content", value: "B" },
 * //   { type: "divider" },
 * //   { type: "content", value: "C" }
 * // ]
 *
 * // Single element (no separator added)
 * intersperse(",")([1])
 * // [1]
 *
 * // Empty array
 * intersperse(",")([])
 * // []
 *
 * // Build SQL-like syntax
 * intersperse(" AND ")(["age > 18", "status = 'active'", "verified = true"])
 * // ["age > 18", " AND ", "status = 'active'", " AND ", "verified = true"]
 *
 * // Create navigation menu
 * const menuItems = ["File", "Edit", "View", "Help"]
 * intersperse(" • ")(menuItems)
 * // ["File", " • ", "Edit", " • ", "View", " • ", "Help"]
 *
 * // Add padding elements
 * intersperse(null)([1, 2, 3])
 * // [1, null, 2, null, 3]
 *
 * // Partial application for reusable intersperser
 * const commaSeparate = intersperse(", ")
 * commaSeparate(["apple", "banana", "orange"])
 * // ["apple", ", ", "banana", ", ", "orange"]
 *
 * const addSpacing = intersperse({ spacer: true })
 * addSpacing([{ item: 1 }, { item: 2 }, { item: 3 }])
 * // [{ item: 1 }, { spacer: true }, { item: 2 }, { spacer: true }, { item: 3 }]
 *
 * // Build formatted output
 * const parts = ["2024", "03", "15"]
 * intersperse("-")(parts)
 * // ["2024", "-", "03", "-", "15"]
 * // Can join to get: "2024-03-15"
 *
 * // Handle null/undefined gracefully
 * intersperse(",")(null)       // []
 * intersperse(",")(undefined)  // []
 *
 * // Complex separator
 * const fancySep = { type: "separator", style: "double-line" }
 * intersperse(fancySep)([
 *   { type: "section", content: "Intro" },
 *   { type: "section", content: "Body" },
 *   { type: "section", content: "Conclusion" }
 * ])
 * // [
 * //   { type: "section", content: "Intro" },
 * //   { type: "separator", style: "double-line" },
 * //   { type: "section", content: "Body" },
 * //   { type: "separator", style: "double-line" },
 * //   { type: "section", content: "Conclusion" }
 * // ]
 *
 * // Two elements only
 * intersperse("between")([1, 2])
 * // [1, "between", 2]
 * ```
 * @property Immutable - doesn't modify input array
 * @property Regular - separator appears exactly between each pair
 * @property Type-flexible - separator can be any type
 */
const intersperse = <T, U>(
	separator: U,
) =>
(
	array: ReadonlyArray<T> | null | undefined,
): Array<T | U> => {
	if (array == null || !Array.isArray(array) || array.length === 0) {
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
