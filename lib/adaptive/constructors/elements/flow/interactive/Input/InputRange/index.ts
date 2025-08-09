import { AUTOCOMPLETES } from "../../../../../../constructors/elements/constants/index.ts"
import filterAttribute from "../../../../../../guards/filterAttribute/index.ts"
import isBoolean from "../../../../../../guards/isBoolean/index.ts"
import isMemberOf from "../../../../../../guards/isMemberOf/index.ts"
import isNumber from "../../../../../../guards/isNumber/index.ts"
import isString from "../../../../../../guards/isString/index.ts"
import pickGlobalAttributes from "../../../../../../guards/pickGlobalAttributes/index.ts"
import Input from "../index.ts"

/**
 * Filters attributes for InputRange
 */
export const filterAttributes = (attributes: Record<string, any>) => {
	const {
		autocomplete,
		autofocus,
		disabled,
		form,
		list,
		max,
		min,
		name,
		readonly,
		required,
		step,
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
		...filterAttribute(isNumber)("max")(max),
		...filterAttribute(isNumber)("min")(min),
		...filterAttribute(isString)("name")(name),
		...filterAttribute(isBoolean)("readonly")(readonly),
		...filterAttribute(isBoolean)("required")(required),
		...filterAttribute(isNumber)("step")(step),
		...filterAttribute(isString)("value")(value),
		...filterAttribute(isNumber)("value")(value),
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
