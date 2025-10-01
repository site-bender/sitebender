import type {
	ComparatorConfig,
	LogicalConfig,
	Operand,
	OperatorConfig,
	Value,
} from "@sitebender/architect-types/index.ts"
// Filtering is delegated to filterAttributes; no local guards needed
import type { InputNumberAriaAttributes } from "@sitebender/architect/constructors/elements/types/aria/index.ts"
import type { InputNumberAttributes } from "@sitebender/architect/constructors/elements/types/attributes/index.ts"

import Input from "../index.ts"
import filterAttributes from "./filterAttributes/index.ts"

//-- [REFACTOR] Provide a concise description of this function here using Envoy description comment style
export type InputNumberElementAttributes =
	& InputNumberAttributes
	& InputNumberAriaAttributes
	& {
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
const InputNumber = Input("number")(
	filterAttributes as unknown as (
		a: Record<string, Value>,
	) => Record<string, Value>,
)

export default InputNumber
