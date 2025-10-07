import type {
	ComparatorConfig,
	LogicalConfig,
	Operand,
	OperatorConfig,
	Value,
} from "@sitebender/architect-types/index.ts"
import type { InputEmailAriaAttributes } from "@sitebender/architect/constructors/elements/types/aria/index.ts"
import type { InputEmailAttributes } from "@sitebender/architect/constructors/elements/types/attributes/index.ts"

import Input from "../index.ts"
import filterAttributes from "./filterAttributes/index.ts"

//-- [REFACTOR] Provide a concise description of this function here using Envoy description comment style
export type InputEmailElementAttributes =
	& InputEmailAttributes
	& InputEmailAriaAttributes
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
const InputEmail = Input("email")(
	filterAttributes as unknown as (
		a: Record<string, Value>,
	) => Record<string, Value>,
)

export default InputEmail
