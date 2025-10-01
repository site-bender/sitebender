import type {
	ComparatorConfig,
	LogicalConfig,
	Operand,
	OperatorConfig,
	Value,
} from "@sitebender/architect-types/index.ts"
import type { SlotAttributes } from "@sitebender/architect/constructors/elements/types/attributes/index.ts"
import type { ElementConfig } from "@sitebender/architect/constructors/elements/types/index.ts"

import Filtered from "@sitebender/architect/constructors/abstracted/Filtered/index.ts"
import TextNode from "@sitebender/architect/constructors/elements/TextNode/index.ts"
import isFlowContent from "@sitebender/architect/guards/isFlowContent/index.ts"
import isString from "@sitebender/architect/guards/isString/index.ts"

import filterAttributes from "./filterAttributes/index.ts"

//-- [REFACTOR] Provide a concise description of this function here using Envoy description comment style

//-- [REFACTOR] Provide a concise description of this function here using Envoy description comment style
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

//-- [REFACTOR] Provide a concise description of this function here using Envoy description comment style
//-- [REFACTOR] Provide a concise description of this function here using Envoy description comment style
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
