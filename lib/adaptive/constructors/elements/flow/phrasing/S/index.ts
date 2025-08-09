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
 * Creates an S element configuration object
 *
 * The s element represents contents that are no longer accurate
 * or no longer relevant.
 *
 * @example
 * ```typescript
 * const s = S({
 *   id: "old-price"
 * })([
 *   TextNode("$19.99")
 * ])
 * ```
 */
export const S = GlobalOnly("S")(phrasingContentFilter)

export default S
