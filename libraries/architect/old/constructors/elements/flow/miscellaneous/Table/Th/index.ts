import type {
	ComparatorConfig,
	LogicalConfig,
	Operand,
	OperatorConfig,
	Value,
} from "@sitebender/architect-types/index.ts"
import type { TableHeaderCellAttributes } from "@sitebender/architect/constructors/elements/types/attributes/index.ts"

import Filtered from "@sitebender/architect/constructors/abstracted/Filtered/index.ts"

import filterAttributes from "./filterAttributes/index.ts"

//-- [REFACTOR] Provide a concise description of this function here using Envoy description comment style

//-- [REFACTOR] Provide a concise description of this function here using Envoy description comment style
export type ThElementAttributes = TableHeaderCellAttributes & {
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
const Th = Filtered("Th")(filterAttributes)

export default Th
