import filterAttribute from "../../../../../guards/filterAttribute"
import isBoolean from "../../../../../guards/isBoolean"
import isMemberOf from "../../../../../guards/isMemberOf"
import isNumber from "../../../../../guards/isNumber"
import isString from "../../../../../guards/isString"
import pickGlobalAttributes from "../../../../../guards/pickGlobalAttributes"
import { AUTOCOMPLETES } from "../../../../../rendering/constants"
import Input from ".."

export const filterAttributes = attributes => {
	const {
		autocomplete,
		form,
		list,
		max,
		min,
		name,
		placeholder,
		readOnly,
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
		...filterAttribute(isBoolean)("readOnly")(readOnly),
		...filterAttribute(isBoolean)("required")(required),
		...filterAttribute(isNumber)("step")(step),
		...filterAttribute(isMemberOf(["any"]))("step")(step),
		...filterAttribute(isString)("value")(value),
		...filterAttribute(isNumber)("value")(value),
	}
}

const InputNumber = Input("Number")(filterAttributes)

export default InputNumber
