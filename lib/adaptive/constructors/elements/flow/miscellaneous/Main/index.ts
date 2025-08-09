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
 * Creates a Main element configuration object
 *
 * @example
 * ```typescript
 * const main = Main({ id: "main-content", class: "content" })([
 *   TextNode("Main content here")
 * ])
 * ```
 */
export const Main = GlobalOnly("Main")(flowContentFilter)

export default Main
