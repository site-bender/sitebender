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
 * Creates a Pre element configuration object
 *
 * The pre element represents preformatted text where whitespace is significant.
 * It can only contain phrasing content.
 *
 * @example
 * ```typescript
 * const pre = Pre({ id: "code-block", class: "syntax-highlight" })([
 *   Code()("function hello() {\n  console.log('Hello World!');\n}")
 * ])
 * ```
 */
export const Pre = GlobalOnly("Pre")(phrasingContentFilter)

export default Pre
