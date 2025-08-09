import GlobalOnly from "../../../../../constructors/abstracted/GlobalOnly/index.ts"
import isPhrasingContent from "../../../../../guards/isPhrasingContent/index.ts"

/**
 * Creates a Kbd element configuration object
 *
 * The kbd element represents user input (typically keyboard input).
 * It can contain phrasing content.
 *
 * @example
 * ```typescript
 * const kbd = Kbd({
 *   id: "keyboard-shortcut",
 *   class: "key-combination"
 * })([
 *   TextNode("Ctrl+C")
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

export const Kbd = GlobalOnly("Kbd")(phrasingContentFilter)

export default Kbd
