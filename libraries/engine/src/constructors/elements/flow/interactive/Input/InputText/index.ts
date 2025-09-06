import type {
	ComparatorConfig,
	LogicalConfig,
	Operand,
	OperatorConfig,
	Value,
} from "@sitebender/engine-types/index.ts"
import type { InputTextAriaAttributes } from "@sitebender/engine/constructors/elements/types/aria/index.ts"
import type { InputTextAttributes } from "@sitebender/engine/constructors/elements/types/attributes/index.ts"

import Input from "@sitebender/engine/constructors/elements/flow/interactive/Input/index.ts"

import filterAttributes from "./filterAttributes/index.ts"

/**
 * Extended InputText attributes including reactive properties and ARIA
 */
export type InputTextElementAttributes =
	& InputTextAttributes
	& InputTextAriaAttributes
	& {
		calculation?: Operand
		dataset?: Record<string, Value>
		display?: ComparatorConfig | LogicalConfig
		format?: OperatorConfig
		scripts?: string[]
		stylesheets?: string[]
		validation?: ComparatorConfig | LogicalConfig
	}

/**
 * Filters attributes for InputText element
 * Allows global attributes and validates text input-specific attributes
 */

/**
 * Creates an InputText element configuration object
 *
 * The text input field allows users to input and edit text.
 *
 * @example
 * ```typescript
 * const input = InputText({
 *   name: "username",
 *   placeholder: "Enter your username",
 *   required: true
 * })
 * ```
 */
const InputText = Input("text")(
	filterAttributes as unknown as (
		a: Record<string, Value>,
	) => Record<string, Value>,
)

export default InputText
