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
 * Creates an Em element configuration object
 *
 * @example
 * ```typescript
 * const em = Em({ id: "emphasis", class: "highlight" })([
 *   TextNode("Emphasized text")
 * ])
 * ```
 */
export const Em = GlobalOnly("Em")(phrasingContentFilter)

export default Em
