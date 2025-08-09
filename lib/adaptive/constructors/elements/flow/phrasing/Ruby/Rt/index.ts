import GlobalOnly from "../../../../../../constructors/abstracted/GlobalOnly/index.ts"
import isPhrasingContent from "../../../../../../guards/isPhrasingContent/index.ts"

/**
 * Creates an Rt element configuration object
 *
 * The rt element marks the ruby text component of a ruby annotation.
 * It provides pronunciation or meaning for the base text.
 *
 * @example
 * ```typescript
 * const rt = Rt({
 *   id: "kanji-reading"
 * })([
 *   TextNode("かんじ")
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

export const Rt = GlobalOnly("Rt")(phrasingContentFilter)

export default Rt
