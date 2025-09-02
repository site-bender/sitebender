import type { InputColorAttributes } from "@adaptiveSrc/constructors/elements/types/attributes/index.ts"
import type {
	ComparatorConfig,
	LogicalConfig,
	Operand,
	OperatorConfig,
	Value,
} from "@adaptiveTypes/index.ts"

import { AUTOCOMPLETES } from "@adaptiveSrc/constructors/elements/constants/index.ts"
import Input from "@adaptiveSrc/constructors/elements/flow/interactive/Input/index.ts"
import filterAttribute from "@adaptiveSrc/guards/filterAttribute/index.ts"
import isBoolean from "@adaptiveSrc/guards/isBoolean/index.ts"
import isMemberOf from "@adaptiveSrc/guards/isMemberOf/index.ts"
import isString from "@adaptiveSrc/guards/isString/index.ts"
import pickGlobalAttributes from "@adaptiveSrc/guards/pickGlobalAttributes/index.ts"

/**
 * Filters attributes for InputColor
 */

/**
 * Extended InputColor attributes including reactive properties
 */
export type InputColorElementAttributes = InputColorAttributes & {
	aria?: Record<string, Value>
	calculation?: Operand
	dataset?: Record<string, Value>
	display?: ComparatorConfig | LogicalConfig
	format?: OperatorConfig
	scripts?: string[]
	stylesheets?: string[]
	validation?: ComparatorConfig | LogicalConfig
}

export const filterAttributes = (attributes: InputColorAttributes) => {
	const {
		autocomplete,
		autofocus,
		disabled,
		form,
		list,
		name,
		value,
		...attrs
	} = attributes
	const globals = pickGlobalAttributes(attrs)

	return {
		...globals,
		...filterAttribute(isMemberOf(AUTOCOMPLETES))("autocomplete")(autocomplete),
		...filterAttribute(isBoolean)("autofocus")(autofocus),
		...filterAttribute(isBoolean)("disabled")(disabled),
		...filterAttribute(isString)("form")(form),
		...filterAttribute(isString)("list")(list),
		...filterAttribute(isString)("name")(name),
		...filterAttribute(isString)("value")(value),
	}
}

/**
 * Creates an InputColor element configuration object
 *
 * The color input allows users to select a color.
 *
 * @example
 * ```typescript
 * const input = InputColor({
 *   name: "background",
 *   value: "#ff0000",
 *   required: true
 * })
 * ```
 */
const InputColor = Input("color")(filterAttributes)

export default InputColor
