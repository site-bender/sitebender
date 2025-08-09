import GlobalOnly from "../../../../../constructors/abstracted/GlobalOnly/index.ts"
import isPhrasingContent from "../../../../../guards/isPhrasingContent/index.ts"

/**
 * Creates a Small element configuration object
 *
 * The small element represents side comments such as small print.
 *
 * @example
 * ```typescript
 * const small = Small({
 *   id: "fine-print"
 * })([
 *   TextNode("Terms and conditions apply")
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

export const Small = GlobalOnly("Small")(phrasingContentFilter)

export default Small
