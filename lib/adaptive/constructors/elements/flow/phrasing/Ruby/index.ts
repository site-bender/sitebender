import GlobalOnly from "../../../../../constructors/abstracted/GlobalOnly/index.ts"
import isPhrasingContent from "../../../../../guards/isPhrasingContent/index.ts"

/**
 * Creates a Ruby element configuration object
 *
 * The ruby element represents a ruby annotation, which is used to show
 * pronunciation or meaning of East Asian characters.
 *
 * @example
 * ```typescript
 * const ruby = Ruby({
 *   id: "pronunciation-guide"
 * })([
 *   TextNode("漢字"),
 *   Rt()(TextNode("kanji"))
 * ])
 * ```
 */
/**
 * Child filter that validates ruby content (phrasing content + Rt + Rp)
 */
const rubyContentFilter = (child: any): boolean => {
	// Accept text nodes and other primitive content
	if (!child || typeof child !== "object" || !child.tag) {
		return true
	}

	// Allow ruby-specific elements
	if (child.tag === "Rt" || child.tag === "Rp") {
		return true
	}

	// For other element configs, check if they're valid phrasing content
	return isPhrasingContent()(child)
}

export const Ruby = GlobalOnly("Ruby")(rubyContentFilter)

export default Ruby
