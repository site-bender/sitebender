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
 * Creates a Mark element configuration object
 *
 * The mark element represents text which is marked or highlighted
 * for reference or notation purposes.
 *
 * @example
 * ```typescript
 * const mark = Mark({
 *   id: "search-highlight"
 * })([
 *   TextNode("important text")
 * ])
 * ```
 */
export const Mark = GlobalOnly("Mark")(phrasingContentFilter)

export default Mark
