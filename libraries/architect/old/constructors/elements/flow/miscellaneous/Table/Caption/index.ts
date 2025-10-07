import type {
	ComparatorConfig,
	LogicalConfig,
	Operand,
	OperatorConfig,
} from "@sitebender/architect-types/index.ts"
import type { Value } from "@sitebender/architect-types/index.ts"
import type { TableCaptionAttributes } from "@sitebender/architect/constructors/elements/types/attributes/index.ts"
import type { ElementConfig } from "@sitebender/architect/constructors/elements/types/index.ts"

import GlobalOnly from "@sitebender/architect/constructors/abstracted/GlobalOnly/index.ts"
import isFlowContent from "@sitebender/architect/guards/isFlowContent/index.ts"

//-- [REFACTOR] Provide a concise description of this function here using Envoy description comment style
const flowContentFilter = (child: ElementConfig): boolean => {
	if (typeof child === "object" && child !== null && "tag" in child) {
		return isFlowContent()(
			child as ElementConfig,
		)
	}
	// Accept text nodes and other primitive content
	return true
}

//-- [REFACTOR] Provide a concise description of this function here using Envoy description comment style

//-- [REFACTOR] Provide a concise description of this function here using Envoy description comment style
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

const Caption = GlobalOnly("Caption")(flowContentFilter)

export default Caption
