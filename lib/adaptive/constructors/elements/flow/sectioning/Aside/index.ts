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
 * Creates an Aside element configuration object
 *
 * The aside element represents content that is related to the
 * primary content but is separate from it, such as sidebars,
 * pull quotes, or advertising.
 *
 * @example
 * ```typescript
 * const aside = Aside({ id: "sidebar", class: "sidebar" })([
 *   P()("Related content..."),
 *   Nav()([...])
 * ])
 * ```
 */
export const Aside = GlobalOnly("Aside")(flowContentFilter)

export default Aside
