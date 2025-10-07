import type {
	ComparatorConfig,
	LogicalConfig,
	Operand,
	OperatorConfig,
	Value,
} from "@sitebender/architect-types/index.ts"
import type { BlockQuotationAttributes } from "@sitebender/architect/constructors/elements/types/attributes/index.ts"
import type { ElementConfig } from "@sitebender/architect/constructors/elements/types/index.ts"

import Filtered from "@sitebender/architect/constructors/abstracted/Filtered/index.ts"
import isFlowContent from "@sitebender/architect/guards/isFlowContent/index.ts"

import filterAttributes from "./filterAttributes/index.ts"

//-- [REFACTOR] Provide a concise description of this function here using Envoy description comment style

//-- [REFACTOR] Provide a concise description of this function here using Envoy description comment style
export type BlockQuoteElementAttributes = BlockQuotationAttributes & {
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
const BlockQuote =
	(attributes: Record<string, Value> = {}) =>
	(children: Array<ElementConfig> | ElementConfig | string = []) => {
		const kids = Array.isArray(children)
			? children.filter((c) => !c?.tag || isFlowContent()(c as ElementConfig))
			: (!children || typeof children !== "object" ||
					!("tag" in children) ||
					isFlowContent()(children as ElementConfig))
			? [children as ElementConfig]
			: []
		return Filtered("BlockQuote")(filterAttributes)(attributes)(
			kids as Array<ElementConfig>,
		)
	}

export default BlockQuote
