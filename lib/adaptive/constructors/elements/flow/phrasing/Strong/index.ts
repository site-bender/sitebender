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
 * Creates a Strong element configuration object
 *
 * @example
 * ```typescript
 * const strong = Strong({ id: "important", class: "highlight" })([
 *   TextNode("Important text")
 * ])
 * ```
 */
export const Strong = GlobalOnly("Strong")(phrasingContentFilter)

export default Strong
