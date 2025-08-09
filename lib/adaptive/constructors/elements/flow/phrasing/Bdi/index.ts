import GlobalOnly from "../../../../../constructors/abstracted/GlobalOnly/index.ts"
import isPhrasingContent from "../../../../../guards/isPhrasingContent/index.ts"

/**
 * Creates a Bdi element configuration object
 *
 * The bdi element represents a span of text that is to be isolated from
 * its surroundings for the purposes of bidirectional text formatting.
 *
 * @example
 * ```typescript
 * const bdi = Bdi({
 *   id: "user-name"
 * })([
 *   TextNode("أهلا")
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

export const Bdi = GlobalOnly("Bdi")(phrasingContentFilter)

export default Bdi
