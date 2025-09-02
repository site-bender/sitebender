import type { ElementConfig } from "../../../../../../types/index.ts"

import GlobalOnly from "../../../../../../constructors/abstracted/GlobalOnly/index.ts"
import isFlowContent from "../../../../../../guards/isFlowContent/index.ts"

/**
 * Child filter that validates flow content
 */
const flowContentFilter = (child: ElementConfig): boolean => {
	// Accept text nodes and other primitive content
	if (!child || typeof child !== "object" || !child.tag) {
		return true
	}

	// For element configs, check if they're valid flow content
	return isFlowContent()(child)
}

/**
 * Creates a Dt element configuration object
 *
 * The dt element represents a term or name in a description list.
 *
 * @example
 * ```typescript
 * const dt = Dt({
 *   id: "html-term"
 * })([
 *   TextNode("HTML")
 * ])
 * ```
 */
export const Dt = GlobalOnly("Dt")(flowContentFilter)

export default Dt
