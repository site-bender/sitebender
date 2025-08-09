import GlobalOnly from "../../../../../constructors/abstracted/GlobalOnly/index.ts"
import isFlowContent from "../../../../../guards/isFlowContent/index.ts"

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
 * Creates a Div element configuration object
 *
 * @example
 * ```typescript
 * const div = Div({ id: "container", class: "main" })([
 *   TextNode("Hello, World!")
 * ])
 * ```
 */
export const Div = GlobalOnly("Div")(flowContentFilter)

export default Div
