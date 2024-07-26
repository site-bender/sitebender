import filterAttribute from "../../../../../../guards/filterAttribute"
import isBoolean from "../../../../../../guards/isBoolean"
import isMemberOf from "../../../../../../guards/isMemberOf"
import isNumber from "../../../../../../guards/isNumber"
import isString from "../../../../../../guards/isString"
import pickGlobalAttributes from "../../../../../../guards/pickGlobalAttributes"
import { AUTOCOMPLETES } from "../../../../../../rendering/constants"

const filterDateTimeAttributes = attributes => {
	const {
		autocomplete,
		form,
		list,
		max,
		min,
		name,
		readOnly,
		required,
		step,
		value,
		...attrs
	} = attributes || {}
	const globals = pickGlobalAttributes(attrs)

	return {
		...globals,
		...filterAttribute(isMemberOf(AUTOCOMPLETES))("autocomplete")(autocomplete),
		...filterAttribute(isString)("form")(form),
		...filterAttribute(isString)("list")(list),
		...filterAttribute(isString)("max")(max),
		...filterAttribute(isString)("min")(min),
		...filterAttribute(isString)("name")(name),
		...filterAttribute(isBoolean)("readOnly")(readOnly),
		...filterAttribute(isBoolean)("required")(required),
		...filterAttribute(isNumber)("step")(step),
		...filterAttribute(isString)("value")(value),
	}
}

export default filterDateTimeAttributes
