import GlobalOnly from "../../../../../../constructors/abstracted/GlobalOnly/index.ts"
import isFlowContent from "../../../../../../guards/isFlowContent/index.ts"

/**
 * Child filter that validates flow content
 */
const flowContentFilter = (child: unknown): boolean => {
	if (typeof child === "object" && child !== null && "tag" in child) {
		return isFlowContent()(
			child as { tag?: string; attributes?: Record<string, unknown> },
		)
	}
	// Accept text nodes and other primitive content
	return true
}

/**
 * Creates a Caption element configuration object
 *
 * The caption element represents a title or legend for a table.
 * It can contain flow content.
 *
 * @example
 * ```typescript
 * const caption = Caption({ id: "table-caption" })([
 *   TextNode("Sales Report for Q1 2023")
 * ])
 * ```
 */
export const Caption = GlobalOnly("Caption")(flowContentFilter)

export default Caption
