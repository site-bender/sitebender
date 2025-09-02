import type { TableCaptionAttributes } from "@adaptiveSrc/constructors/elements/types/attributes/index.ts"
import type { ElementConfig } from "@adaptiveSrc/constructors/elements/types/index.ts"
import type {
	ComparatorConfig,
	LogicalConfig,
	Operand,
	OperatorConfig,
} from "@adaptiveTypes/index.ts"
import type { Value } from "@adaptiveTypes/index.ts"

import GlobalOnly from "@adaptiveSrc/constructors/abstracted/GlobalOnly/index.ts"
import isFlowContent from "@adaptiveSrc/guards/isFlowContent/index.ts"

/**
 * Child filter that validates flow content
 */
const flowContentFilter = (child: ElementConfig): boolean => {
	if (typeof child === "object" && child !== null && "tag" in child) {
		return isFlowContent()(
			child as ElementConfig,
		)
	}
	// Accept text nodes and other primitive content
	return true
}

/**
 * Creates a Caption element configuration object
 *
 * The caption element represents a title or legend for a table.
 * It can contain flow content.
 *
 * @example
 * ```typescript
 * const caption = Caption({ id: "table-caption" })([
 *   TextNode("Sales Report for Q1 2023")
 * ])
 * ```
 */

/**
 * Extended Caption attributes including reactive properties
 */
export type CaptionElementAttributes = TableCaptionAttributes & {
	aria?: Record<string, Value>
	calculation?: Operand
	dataset?: Record<string, Value>
	display?: ComparatorConfig | LogicalConfig
	format?: OperatorConfig
	scripts?: string[]
	stylesheets?: string[]
	validation?: ComparatorConfig | LogicalConfig
}

export const Caption = GlobalOnly("Caption")(flowContentFilter)

export default Caption
