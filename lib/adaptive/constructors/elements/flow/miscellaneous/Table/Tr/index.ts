import GlobalOnly from "../../../../../../constructors/abstracted/GlobalOnly/index.ts"

/**
 * Child filter that validates table cell content (td, th, script, template)
 */
const tableCellFilter = (child: unknown): boolean => {
	if (typeof child === "object" && child !== null && "tag" in child) {
		const tag = (child as { tag?: string }).tag?.toLowerCase()
		return tag === "td" || tag === "th" || tag === "script" ||
			tag === "template"
	}
	return false
}

/**
 * Creates a Tr element configuration object
 *
 * The tr element represents a row of cells in a table.
 * It can contain td, th, script, and template elements.
 *
 * @example
 * ```typescript
 * const tr = Tr({ id: "table-row" })([
 *   Td()([TextNode("Cell 1")]),
 *   Td()([TextNode("Cell 2")])
 * ])
 * ```
 */
export const Tr = GlobalOnly("Tr")(tableCellFilter)

export default Tr
