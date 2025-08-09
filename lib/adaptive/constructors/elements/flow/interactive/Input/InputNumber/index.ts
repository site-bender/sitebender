import { AUTOCOMPLETES } from "../../../../../../constructors/elements/constants/index.ts"
import filterAttribute from "../../../../../../guards/filterAttribute/index.ts"
import isBoolean from "../../../../../../guards/isBoolean/index.ts"
import isMemberOf from "../../../../../../guards/isMemberOf/index.ts"
import isNumber from "../../../../../../guards/isNumber/index.ts"
import isString from "../../../../../../guards/isString/index.ts"
import pickGlobalAttributes from "../../../../../../guards/pickGlobalAttributes/index.ts"
import Input from "../index.ts"

/**
 * Filters attributes for InputNumber
 */
export const filterAttributes = (attributes: Record<string, any>) => {
	const {
		autocomplete,
		form,
		list,
		max,
		min,
		name,
		placeholder,
		readonly,
		required,
		step = "any",
		value,
		...attrs
	} = attributes
	const globals = pickGlobalAttributes(attrs)

	return {
		...globals,
		...filterAttribute(isMemberOf(AUTOCOMPLETES))("autocomplete")(autocomplete),
		...filterAttribute(isString)("form")(form),
		...filterAttribute(isString)("list")(list),
		...filterAttribute(isNumber)("max")(max),
		...filterAttribute(isNumber)("min")(min),
		...filterAttribute(isString)("name")(name),
		...filterAttribute(isString)("placeholder")(placeholder),
		...filterAttribute(isBoolean)("readonly")(readonly),
		...filterAttribute(isBoolean)("required")(required),
		...filterAttribute(isNumber)("step")(step),
		...filterAttribute(isMemberOf(["any"]))("step")(step),
		...filterAttribute(isString)("value")(value),
		...filterAttribute(isNumber)("value")(value),
	}
}

/**
 * Creates an InputNumber element configuration object
 *
 * The number input allows users to input numeric values.
 *
 * @example
 * ```typescript
 * const input = InputNumber({
 *   name: "quantity",
 *   min: 1,
 *   max: 100,
 *   step: 1,
 *   placeholder: "Enter quantity"
 * })
 * ```
 */
const InputNumber = Input("number")(filterAttributes)

export default InputNumber
