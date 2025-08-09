import GlobalOnly from "../../../../../constructors/abstracted/GlobalOnly/index.ts"
import isPhrasingContent from "../../../../../guards/isPhrasingContent/index.ts"

/**
 * Child filter that validates phrasing content
 */
const phrasingContentFilter = (child: unknown): boolean => {
	if (typeof child === "object" && child !== null && "tag" in child) {
		return isPhrasingContent()(
			child as { tag?: string; attributes?: Record<string, unknown> },
		)
	}
	// Accept text nodes and other primitive content
	return true
}

/**
 * Creates a B element configuration object
 *
 * @example
 * ```typescript
 * const b = B({ id: "bold", class: "highlight" })([
 *   TextNode("Bold text")
 * ])
 * ```
 */
export const B = GlobalOnly("B")(phrasingContentFilter)

export default B
