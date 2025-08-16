import type {
	ElementConfig,
	GlobalAttributes,
	Value,
} from "../../../../../../types/index.ts"
import type {
	ComparatorConfig,
	LogicalConfig,
	Operand,
	OperatorConfig,
} from "../../../../../types/index.ts"
import type { InputButtonAttributes } from "../../types/attributes/index.ts"

import filterAttribute from "../../../../../../guards/filterAttribute/index.ts"
import isBoolean from "../../../../../../guards/isBoolean/index.ts"
import isString from "../../../../../../guards/isString/index.ts"
import pickGlobalAttributes from "../../../../../../guards/pickGlobalAttributes/index.ts"
import Input from "../index.ts"

/**
 * Filters attributes for InputButton
 */

/**
 * Extended InputButton attributes including reactive properties
 */
export type InputButtonElementAttributes = InputButtonAttributes & {
	aria?: Record<string, Value>
	calculation?: Operand
	dataset?: Record<string, Value>
	display?: ComparatorConfig | LogicalConfig
	format?: OperatorConfig
	scripts?: string[]
	stylesheets?: string[]
	validation?: ComparatorConfig | LogicalConfig
}

export const filterAttributes = (attributes: InputButtonAttributes) => {
	const { autofocus, disabled, form, name, value, ...attrs } = attributes
	const globals = pickGlobalAttributes(attrs)

	return {
		...globals,
		...filterAttribute(isBoolean)("autofocus")(autofocus),
		...filterAttribute(isBoolean)("disabled")(disabled),
		...filterAttribute(isString)("form")(form),
		...filterAttribute(isString)("name")(name),
		...filterAttribute(isString)("value")(value),
	}
}

/**
 * Creates an InputButton element configuration object
 *
 * The button input creates a clickable button.
 *
 * @example
 * ```typescript
 * const input = InputButton({
 *   name: "action",
 *   value: "Click me",
 *   disabled: false
 * })
 * ```
 */
const InputButton = Input("button")(filterAttributes)

export default InputButton
