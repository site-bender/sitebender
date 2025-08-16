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
import type { InputHiddenAttributes } from "../../types/attributes/index.ts"

import filterAttribute from "../../../../../../guards/filterAttribute/index.ts"
import isString from "../../../../../../guards/isString/index.ts"
import pickGlobalAttributes from "../../../../../../guards/pickGlobalAttributes/index.ts"
import Input from "../index.ts"

/**
 * Filters attributes for InputHidden
 */

/**
 * Extended InputHidden attributes including reactive properties
 */
export type InputHiddenElementAttributes = InputHiddenAttributes & {
	aria?: Record<string, Value>
	calculation?: Operand
	dataset?: Record<string, Value>
	display?: ComparatorConfig | LogicalConfig
	format?: OperatorConfig
	scripts?: string[]
	stylesheets?: string[]
	validation?: ComparatorConfig | LogicalConfig
}

export const filterAttributes = (attributes: InputHiddenAttributes) => {
	const { form, name, value, ...attrs } = attributes
	const globals = pickGlobalAttributes(attrs)

	return {
		...globals,
		...filterAttribute(isString)("form")(form),
		...filterAttribute(isString)("name")(name),
		...filterAttribute(isString)("value")(value),
	}
}

/**
 * Creates an InputHidden element configuration object
 *
 * The hidden input stores data that should be submitted with the form but not displayed.
 *
 * @example
 * ```typescript
 * const input = InputHidden({
 *   name: "token",
 *   value: "abc123"
 * })
 * ```
 */
const InputHidden = Input("hidden")(filterAttributes)

export default InputHidden
