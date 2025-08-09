import GlobalOnly from "../../../../../../constructors/abstracted/GlobalOnly/index.ts"

/**
 * Child filter that validates table row content (tr, script, template)
 */
const tableRowFilter = (child: unknown): boolean => {
	if (typeof child === "object" && child !== null && "tag" in child) {
		const tag = (child as { tag?: string }).tag?.toLowerCase()
		return tag === "tr" || tag === "script" || tag === "template"
	}
	return false
}

/**
 * Creates a TBody element configuration object
 *
 * The tbody element represents a block of rows that comprise the body of a table.
 * It can contain tr, script, and template elements.
 *
 * @example
 * ```typescript
 * const tbody = TBody({ id: "table-body" })([
 *   Tr()([
 *     Td()([TextNode("Cell 1")]),
 *     Td()([TextNode("Cell 2")])
 *   ])
 * ])
 * ```
 */
export const TBody = GlobalOnly("TBody")(tableRowFilter)

export default TBody
