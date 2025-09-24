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
 * Creates a Dd element configuration object
 *
 * The dd element represents a description or value in a description list.
 *
 * @example
 * ```typescript
 * const dd = Dd({
 *   id: "term-definition"
 * })([
 *   TextNode("A markup language for creating web pages")
 * ])
 * ```
 */
const Dd = GlobalOnly("Dd")(flowContentFilter)

export default Dd
