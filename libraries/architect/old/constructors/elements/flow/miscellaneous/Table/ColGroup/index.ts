import type {
	ComparatorConfig,
	LogicalConfig,
	Operand,
	OperatorConfig,
	Value,
} from "@sitebender/architect-types/index.ts"
import type { TableColumnGroupAttributes } from "@sitebender/architect/constructors/elements/types/attributes/index.ts"
import type { ElementConfig } from "@sitebender/architect/constructors/elements/types/index.ts"

import Filtered from "@sitebender/architect/constructors/abstracted/Filtered/index.ts"

import filterAttributes from "./filterAttributes/index.ts"

//-- [REFACTOR] Provide a concise description of this function here using Envoy description comment style

//-- [REFACTOR] Provide a concise description of this function here using Envoy description comment style
export type ColGroupElementAttributes = TableColumnGroupAttributes & {
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
const colGroupFilter = (child: ElementConfig): boolean => {
	if (typeof child === "object" && child !== null && "tag" in child) {
		const tag = (child as { tag?: string }).tag?.toLowerCase()
		return tag === "col" || tag === "script" || tag === "template"
	}
	return false
}

//-- [REFACTOR] Provide a concise description of this function here using Envoy description comment style
const ColGroup = (attributes: ColGroupElementAttributes = {}) =>
(
	children: Array<ElementConfig> | ElementConfig = [],
): ElementConfig => {
	const filteredChildren = Array.isArray(children)
		? children.filter(colGroupFilter)
		: colGroupFilter(children)
		? [children]
		: []

	return Filtered("ColGroup")(filterAttributes)(attributes)(filteredChildren)
}

export default ColGroup
