import type { InputEmailAriaAttributes } from "@engineSrc/constructors/elements/types/aria/index.ts"
import type { InputEmailAttributes } from "@engineSrc/constructors/elements/types/attributes/index.ts"
import type {
import filterAttributes from "./filterAttributes/index.ts"
	ComparatorConfig,
	LogicalConfig,
	Operand,
	OperatorConfig,
	Value,
} from "@engineTypes/index.ts"

import { AUTOCOMPLETES } from "@engineSrc/constructors/elements/constants/index.ts"
import getId from "@engineSrc/constructors/helpers/getId/index.ts"
import filterAttribute from "@engineSrc/guards/filterAttribute/index.ts"
import isBoolean from "@engineSrc/guards/isBoolean/index.ts"
import isInteger from "@engineSrc/guards/isInteger/index.ts"
import isMemberOf from "@engineSrc/guards/isMemberOf/index.ts"
import isString from "@engineSrc/guards/isString/index.ts"
import pickGlobalAttributes from "@engineSrc/guards/pickGlobalAttributes/index.ts"
import isDefined from "@toolkit/simple/validation/isDefined/index.ts"

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

export { default as filterAttributes } from "./filterAttributes/index.ts"
