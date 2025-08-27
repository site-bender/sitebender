import type { ElementConfig } from "@adaptiveSrc/constructors/elements/types/index.ts"
import type { ComparatorConfig, LogicalConfig, Operand, OperatorConfig, Value } from "@adaptiveTypes/index.ts"
import type { RubyTextAttributes } from "@adaptiveSrc/constructors/elements/types/attributes/index.ts"

import GlobalOnly from "@adaptiveSrc/constructors/abstracted/GlobalOnly/index.ts"
import isPhrasingContent from "@adaptiveSrc/guards/isPhrasingContent/index.ts"

/**
 * Creates an Rt element configuration object
 *
 * The rt element marks the ruby text component of a ruby annotation.
 * It provides pronunciation or meaning for the base text.
 *
 * @example
 * ```typescript
 * const rt = Rt({
 *   id: "kanji-reading"
 * })([
 *   TextNode("かんじ")
 * ])
 * ```
 */
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
 * Extended Rt attributes including reactive properties
 */
export type RtElementAttributes = RubyTextAttributes & {
	aria?: Record<string, Value>
	calculation?: Operand
	dataset?: Record<string, Value>
	display?: ComparatorConfig | LogicalConfig
	format?: OperatorConfig
	scripts?: string[]
	stylesheets?: string[]
	validation?: ComparatorConfig | LogicalConfig
}

export const Rt = GlobalOnly("rt")(phrasingContentFilter)

export default Rt
