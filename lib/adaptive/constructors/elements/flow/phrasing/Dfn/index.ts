import GlobalOnly from "../../../../../constructors/abstracted/GlobalOnly/index.ts"
import isPhrasingContent from "../../../../../guards/isPhrasingContent/index.ts"

/**
 * Creates a Dfn element configuration object
 *
 * The dfn element represents the defining instance of a term.
 * It can contain phrasing content.
 *
 * @example
 * ```typescript
 * const dfn = Dfn({
 *   id: "html-definition",
 *   title: "HyperText Markup Language"
 * })([
 *   TextNode("HTML")
 * ])
 * ```
 */
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

export const Dfn = GlobalOnly("Dfn")(phrasingContentFilter)

export default Dfn
