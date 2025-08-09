import GlobalAllowText from "../../../../../../constructors/abstracted/GlobalAllowText/index.ts"
import isHeadingContent from "../../../../../../guards/isHeadingContent/index.ts"
import isPhrasingContent from "../../../../../../guards/isPhrasingContent/index.ts"

/**
 * Creates a Summary element configuration object
 *
 * The summary element represents a summary, caption, or legend for the
 * rest of the contents of the details element.
 *
 * @example
 * ```typescript
 * const summary = Summary({
 *   id: "details-summary"
 * })([
 *   TextNode("Click to expand"),
 *   Strong()(TextNode(" (Important)"))
 * ])
 * ```
 */
export const Summary = GlobalAllowText("Summary")(
	(child: any) => isPhrasingContent()(child) || isHeadingContent(child),
)

export default Summary
