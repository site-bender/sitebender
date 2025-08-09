import GlobalOnly from "../../../../../constructors/abstracted/GlobalOnly/index.ts"
import isPhrasingContent from "../../../../../guards/isPhrasingContent/index.ts"

/**
 * Creates a Sup element configuration object
 *
 * The sup element represents a superscript.
 *
 * @example
 * ```typescript
 * const sup = Sup({
 *   id: "exponent"
 * })([
 *   TextNode("2")
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

export const Sup = GlobalOnly("Sup")(phrasingContentFilter)

export default Sup
