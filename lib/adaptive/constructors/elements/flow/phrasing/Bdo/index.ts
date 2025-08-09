import GlobalOnly from "../../../../../constructors/abstracted/GlobalOnly/index.ts"
import isPhrasingContent from "../../../../../guards/isPhrasingContent/index.ts"

/**
 * Creates a Bdo element configuration object
 *
 * The bdo element represents explicit text directionality formatting control
 * for its children. It allows you to override the Unicode bidirectional algorithm.
 *
 * @example
 * ```typescript
 * const bdo = Bdo({
 *   dir: "rtl"
 * })([
 *   TextNode("Hello World")
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

export const Bdo = GlobalOnly("Bdo")(phrasingContentFilter)

export default Bdo
