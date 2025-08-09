import GlobalOnly from "../../../../../constructors/abstracted/GlobalOnly/index.ts"
import isPhrasingContent from "../../../../../guards/isPhrasingContent/index.ts"

/**
 * Creates a Cite element configuration object
 *
 * The cite element represents the title of a creative work.
 * It can contain phrasing content.
 *
 * @example
 * ```typescript
 * const cite = Cite({
 *   id: "book-title",
 *   class: "citation"
 * })([
 *   TextNode("The Great Gatsby")
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

export const Cite = GlobalOnly("Cite")(phrasingContentFilter)

export default Cite
