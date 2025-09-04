import type {
	ComparatorConfig,
	LogicalConfig,
	Operand,
	OperatorConfig,
	Value,
} from "@sitebender/engine-types/index.ts"
import type { SlotAttributes } from "@sitebender/engine/constructors/elements/types/attributes/index.ts"
import type { ElementConfig } from "@sitebender/engine/constructors/elements/types/index.ts"

import Filtered from "@sitebender/engine/constructors/abstracted/Filtered/index.ts"
import TextNode from "@sitebender/engine/constructors/elements/TextNode/index.ts"
import isFlowContent from "@sitebender/engine/guards/isFlowContent/index.ts"
import isString from "@sitebender/engine/guards/isString/index.ts"

import filterAttributes from "./filterAttributes/index.ts"

/**
 * Filters attributes for Slot element
 * Allows global attributes and validates slot-specific attributes
 */

/**
 * Extended Slot attributes including reactive properties
 */
export type SlotElementAttributes = SlotAttributes & {
	aria?: Record<string, Value>
	calculation?: Operand
	dataset?: Record<string, Value>
	display?: ComparatorConfig | LogicalConfig
	format?: OperatorConfig
	scripts?: string[]
	stylesheets?: string[]
	validation?: ComparatorConfig | LogicalConfig
}



/**
 * Creates a Slot element configuration object
 *
 * The slot element represents a placeholder inside a web component that
 * you can fill with your own markup.
 *
 * @example
 * ```typescript
 * const slot = Slot({
 *   name: "header",
 *   id: "main-header-slot"
 * })([
 *   TextNode("Default header content")
 * ])
 * ```
 */
/**
 * Child filter that validates flow content
 */
const isValidSlotChild = (child: ElementConfig): boolean => {
	// Accept text nodes and other primitive content
	if (!child || typeof child !== "object" || !child.tag) {
		return true
	}

	// For element configs, check if they're valid flow content
	return isFlowContent()(child)
}

const Slot =
	(attributes: Record<string, Value> = {}) =>
	(children: Array<ElementConfig> | ElementConfig | string = []) => {
		const filteredChildren = isString(children)
			? [TextNode(children) as unknown as ElementConfig]
			: Array.isArray(children)
			? children.filter(isValidSlotChild)
			: isValidSlotChild(children)
			? [children]
			: []

		return Filtered("slot")(
			filterAttributes as (
				a: Record<string, unknown>,
			) => Record<string, unknown>,
		)(attributes)(filteredChildren as Array<ElementConfig>)
	}

export default Slot
