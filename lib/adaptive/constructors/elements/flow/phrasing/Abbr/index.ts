import GlobalOnly from "../../../../../constructors/abstracted/GlobalOnly/index.ts"
import isPhrasingContent from "../../../../../guards/isPhrasingContent/index.ts"

/**
 * Creates an Abbr element configuration object
 *
 * The abbr element represents an abbreviation or acronym.
 * It can contain phrasing content.
 *
 * @example
 * ```typescript
 * const abbr = Abbr({
 *   id: "html-abbr",
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

export const Abbr = GlobalOnly("Abbr")(phrasingContentFilter)

export default Abbr
