import type { ElementConfig } from "../../../../../../types/index.ts"

import GlobalOnly from "../../../../../../constructors/abstracted/GlobalOnly/index.ts"

/**
 * Child filter that validates table row content (tr, script, template)
 */
const tableRowFilter = (child: ElementConfig): boolean => {
	if (typeof child === "object" && child !== null && "tag" in child) {
		const tag = (child as { tag?: string }).tag?.toLowerCase()
		return tag === "tr" || tag === "script" || tag === "template"
	}
	return false
}

/**
 * Creates a THead element configuration object
 *
 * The thead element represents a block of rows that comprise the header of a table.
 * It can contain tr, script, and template elements.
 *
 * @example
 * ```typescript
 * const thead = THead({ id: "table-header" })([
 *   Tr()([
 *     Th()([TextNode("Product")]),
 *     Th()([TextNode("Price")])
 *   ])
 * ])
 * ```
 */
export const THead = GlobalOnly("THead")(tableRowFilter)

export default THead
