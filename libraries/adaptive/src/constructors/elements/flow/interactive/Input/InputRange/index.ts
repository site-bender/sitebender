import type { Value } from "@adaptiveTypes/index.ts"
import type {
	ComparatorConfig,
	LogicalConfig,
	Operand,
	OperatorConfig,
} from "@adaptiveTypes/index.ts"
import type { InputRangeAttributes } from "@adaptiveSrc/constructors/elements/types/attributes/index.ts"

import { AUTOCOMPLETES } from "@adaptiveSrc/constructors/elements/constants/index.ts"
import filterAttribute from "@adaptiveSrc/guards/filterAttribute/index.ts"
import isBoolean from "@adaptiveSrc/guards/isBoolean/index.ts"
import isMemberOf from "@adaptiveSrc/guards/isMemberOf/index.ts"
import isNumber from "@adaptiveSrc/guards/isNumber/index.ts"
import isString from "@adaptiveSrc/guards/isString/index.ts"
import pickGlobalAttributes from "@adaptiveSrc/guards/pickGlobalAttributes/index.ts"
import Input from "@adaptiveSrc/constructors/elements/flow/interactive/Input/index.ts"

/**
 * Filters attributes for InputRange
 */

/**
 * Extended InputRange attributes including reactive properties
 */
export type InputRangeElementAttributes = InputRangeAttributes & {
	aria?: Record<string, Value>
	calculation?: Operand
	dataset?: Record<string, Value>
	display?: ComparatorConfig | LogicalConfig
	format?: OperatorConfig
	scripts?: string[]
	stylesheets?: string[]
	validation?: ComparatorConfig | LogicalConfig
}

export const filterAttributes = (attributes: Record<string, Value>) => {
	const {
		autocomplete,
		autofocus,
		disabled,
		form,
		list,
		max,
		min,
		name,
		step,
		value,
		...attrs
	} = attributes as unknown as InputRangeAttributes
	const globals = pickGlobalAttributes(attrs)

	return {
		...globals,
		...filterAttribute(isMemberOf(AUTOCOMPLETES))("autocomplete")(autocomplete),
		...filterAttribute(isBoolean)("autofocus")(autofocus),
		...filterAttribute(isBoolean)("disabled")(disabled),
		...filterAttribute(isString)("form")(form),
		...filterAttribute(isString)("list")(list),
		...filterAttribute(isNumber)("max")(max),
		...filterAttribute(isNumber)("min")(min),
		...filterAttribute(isString)("name")(name),
		...filterAttribute(isNumber)("step")(step),
		...filterAttribute(isString)("value")(value),
	}
}

/**
 * Creates an InputRange element configuration object
 *
 * The range input allows users to select a numeric value from a range.
 *
 * @example
 * ```typescript
 * const input = InputRange({
 *   name: "volume",
 *   min: 0,
 *   max: 100,
 *   step: 1,
 *   value: 50
 * })
 * ```
 */
const InputRange = Input("range")(filterAttributes)

export default InputRange
