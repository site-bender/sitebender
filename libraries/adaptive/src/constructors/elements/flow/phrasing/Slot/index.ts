import type {
	ComparatorConfig,
	LogicalConfig,
	Operand,
	OperatorConfig,
} from "../../../../../types/index.ts"
import type {
	ElementConfig,
	GlobalAttributes,
	Value,
} from "../../../../../types/index.ts"
import type { SlotAttributes } from "../types/attributes/index.ts"

import Filtered from "../../../../../constructors/abstracted/Filtered/index.ts"
import getId from "../../../../../constructors/helpers/getId/index.ts"
import filterAttribute from "../../../../../guards/filterAttribute/index.ts"
import isFlowContent from "../../../../../guards/isFlowContent/index.ts"
import isString from "../../../../../guards/isString/index.ts"
import pickGlobalAttributes from "../../../../../guards/pickGlobalAttributes/index.ts"

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
	(children: Record<string, Value> = []) => {
		const filteredChildren = Array.isArray(children)
			? children.filter(isValidSlotChild)
			: isValidSlotChild(children)
			? [children]
			: []

		return Filtered("Slot")(filterAttributes)(attributes)(filteredChildren)
	}

export default Slot
