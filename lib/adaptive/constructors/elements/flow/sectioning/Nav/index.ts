import GlobalOnly from "../../../../../constructors/abstracted/GlobalOnly/index.ts"
import isFlowContent from "../../../../../guards/isFlowContent/index.ts"

/**
 * Child filter that validates flow content
 */
const flowContentFilter = (child: unknown): boolean => {
	if (typeof child === "object" && child !== null && "tag" in child) {
		return isFlowContent()(
			child as { tag?: string; attributes?: Record<string, unknown> },
		)
	}
	// Accept text nodes and other primitive content
	return true
}

/**
 * Creates a Nav element configuration object
 *
 * The nav element represents a section of navigation links.
 * It is appropriate for major navigation blocks.
 *
 * @example
 * ```typescript
 * const nav = Nav({ id: "main-nav", class: "navigation" })([
 *   Ul()([
 *     Li()([A({ href: "/" })("Home")]),
 *     Li()([A({ href: "/about" })("About")]),
 *     Li()([A({ href: "/contact" })("Contact")])
 *   ])
 * ])
 * ```
 */
export const Nav = GlobalOnly("Nav")(flowContentFilter)

export default Nav
