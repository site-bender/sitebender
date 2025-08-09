import GlobalOnly from "../../../../../constructors/abstracted/GlobalOnly/index.ts"

/**
 * Child filter for Ul element - allows li, script, and template elements
 */
const isValidUlChild = (child: any): boolean => {
	if (!child || typeof child !== "object" || !child.tag) {
		return false
	}
	return ["Li", "Script", "Template"].includes(child.tag)
}

/**
 * Creates a Ul element configuration object
 *
 * The ul element represents an unordered list of items.
 * It can only contain li, script, and template elements.
 *
 * @example
 * ```typescript
 * const ul = Ul({ id: "main-list", class: "list" })([
 *   Li()("First item"),
 *   Li()("Second item"),
 *   Li()("Third item")
 * ])
 * ```
 */
export const Ul = GlobalOnly("Ul")(isValidUlChild)

export default Ul
