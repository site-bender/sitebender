import type {
	ElementConfig,
	GlobalAttributes,
} from "../../../../../../types/index.ts"

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
 * Creates a TFoot element configuration object
 *
 * The tfoot element represents a block of rows that comprise the footer of a table.
 * It can contain tr, script, and template elements.
 *
 * @example
 * ```typescript
 * const tfoot = TFoot({ id: "table-footer" })([
 *   Tr()([
 *     Td()([TextNode("Total")]),
 *     Td()([TextNode("$100.00")])
 *   ])
 * ])
 * ```
 */
export const TFoot = GlobalOnly("TFoot")(tableRowFilter)

export default TFoot
