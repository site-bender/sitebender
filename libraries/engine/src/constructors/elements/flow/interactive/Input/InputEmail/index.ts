import type { InputEmailAriaAttributes } from "@engineSrc/constructors/elements/types/aria/index.ts"
import type { InputEmailAttributes } from "@engineSrc/constructors/elements/types/attributes/index.ts"
import type {
	ComparatorConfig,
	LogicalConfig,
	Operand,
	OperatorConfig,
	Value,
} from "@engineTypes/index.ts"
import filterAttributes from "./filterAttributes/index.ts"

import Input from "../index.ts"

/**
 * Extended InputEmail attributes including reactive properties and ARIA
 */
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

/**
 * Filters attributes for InputEmail element
 * Allows global attributes and validates email input-specific attributes
 */


/**
 * Creates an InputEmail element configuration object
 *
 * The email input field allows users to input and edit email addresses.
 *
 * @example
 * ```typescript
 * const input = InputEmail({
 *   name: "email",
 *   placeholder: "Enter your email address",
 *   required: true,
 *   multiple: true
 * })
 * ```
 */
const InputEmail = Input("email")(
	filterAttributes as unknown as (
		a: Record<string, Value>,
	) => Record<string, Value>,
)

export default InputEmail
