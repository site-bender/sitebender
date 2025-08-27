import type { ComparatorConfig, LogicalConfig, Operand, OperatorConfig, Value } from "@adaptiveTypes/index.ts"
import type { ElementConfig } from "@adaptiveSrc/constructors/elements/types/index.ts"
import type { SlotAttributes } from "@adaptiveSrc/constructors/elements/types/attributes/index.ts"

import Filtered from "@adaptiveSrc/constructors/abstracted/Filtered/index.ts"
import getId from "@adaptiveSrc/constructors/helpers/getId/index.ts"
import filterAttribute from "@adaptiveSrc/guards/filterAttribute/index.ts"
import isFlowContent from "@adaptiveSrc/guards/isFlowContent/index.ts"
import isString from "@adaptiveSrc/guards/isString/index.ts"
import TextNode from "@adaptiveSrc/constructors/elements/TextNode/index.ts"
import pickGlobalAttributes from "@adaptiveSrc/guards/pickGlobalAttributes/index.ts"

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

export const filterAttributes = (attributes: SlotAttributes) => {
	const { id, name, ...otherAttributes } = attributes
	const globals = pickGlobalAttributes(otherAttributes)

	return {
		...getId(id),
		...globals,
		...filterAttribute(isString)("name")(name),
	}
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

export const Slot =
	(attributes: Record<string, Value> = {}) =>
	(children: Array<ElementConfig> | ElementConfig | string = []) => {
		const filteredChildren = isString(children)
			? [TextNode(children) as unknown as ElementConfig]
			: Array.isArray(children)
			? children.filter(isValidSlotChild)
			: isValidSlotChild(children)
			? [children]
			: []

		return Filtered("slot")(filterAttributes as (a: Record<string, unknown>) => Record<string, unknown>)(attributes)(filteredChildren as Array<ElementConfig>)
	}

export default Slot
