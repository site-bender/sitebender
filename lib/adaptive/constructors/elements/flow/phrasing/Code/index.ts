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
 * Creates a Code element configuration object
 *
 * The code element represents a fragment of computer code.
 * It can contain phrasing content.
 *
 * @example
 * ```typescript
 * const code = Code({
 *   id: "example-code",
 *   class: "language-javascript"
 * })([
 *   TextNode("console.log('Hello, World!')")
 * ])
 * ```
 */
export const Code = GlobalOnly("Code")(phrasingContentFilter)

export default Code
