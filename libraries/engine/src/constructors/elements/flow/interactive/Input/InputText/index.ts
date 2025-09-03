import type { InputTextAriaAttributes } from "@engineSrc/constructors/elements/types/aria/index.ts"
import type { InputTextAttributes } from "@engineSrc/constructors/elements/types/attributes/index.ts"
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
import isDefined from "@engineSrc/utilities/isDefined/index.ts"

import Input from "../index.ts"

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
const InputText = Input("text")(filterAttributes)

export default InputText

export { default as filterAttributes } from "./filterAttributes/index.ts"
