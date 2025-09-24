import type { StrikethroughAttributes } from "@sitebender/architect/constructors/elements/types/attributes/index.ts"

import type {
	ComparatorConfig,
	LogicalConfig,
	Operand,
	OperatorConfig,
} from "../../../../../types/index.ts"
import type { ElementConfig, Value } from "../../../../../types/index.ts"

import GlobalOnly from "../../../../../constructors/abstracted/GlobalOnly/index.ts"
import isPhrasingContent from "../../../../../guards/isPhrasingContent/index.ts"

/**
 * Child filter that validates phrasing content
 */
const phrasingContentFilter = (child: ElementConfig): boolean => {
	if (typeof child === "object" && child !== null && "tag" in child) {
		return isPhrasingContent()(
			child as ElementConfig,
		)
	}
	// Accept text nodes and other primitive content
	return true
}

/**
 * Creates an S element configuration object
 *
 * The s element represents contents that are no longer accurate
 * or no longer relevant.
 *
 * @example
 * ```typescript
 * const s = S({
 *   id: "old-price"
 * })([
 *   TextNode("$19.99")
 * ])
 * ```
 */

/**
 * Extended S attributes including reactive properties
 */
export type SElementAttributes = StrikethroughAttributes & {
	aria?: Record<string, Value>
	calculation?: Operand
	dataset?: Record<string, Value>
	display?: ComparatorConfig | LogicalConfig
	format?: OperatorConfig
	scripts?: string[]
	stylesheets?: string[]
	validation?: ComparatorConfig | LogicalConfig
}

const S = GlobalOnly("S")(phrasingContentFilter)

export default S
