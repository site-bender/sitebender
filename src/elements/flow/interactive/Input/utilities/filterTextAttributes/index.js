import filterAttribute from "../../../../../../guards/filterAttribute"
import isBoolean from "../../../../../../guards/isBoolean"
import isInteger from "../../../../../../guards/isInteger"
import isMemberOf from "../../../../../../guards/isMemberOf"
import isString from "../../../../../../guards/isString"
import pickGlobalAttributes from "../../../../../../guards/pickGlobalAttributes"
import { AUTOCOMPLETES } from "../../../../../../rendering/constants"

export const filterTextAttributes = attributes => {
	const {
		autocomplete,
		dirname,
		form,
		list,
		maxLength,
		minLength,
		name,
		pattern,
		placeholder,
		readOnly,
		required,
		size,
		value,
		...attrs
	} = attributes || {}
	const globals = pickGlobalAttributes(attrs)

	return {
		...globals,
		...filterAttribute(isMemberOf(AUTOCOMPLETES))("autocomplete")(autocomplete),
		...filterAttribute(isString)("dirname")(dirname),
		...filterAttribute(isString)("form")(form),
		...filterAttribute(isString)("list")(list),
		...filterAttribute(isInteger)("maxLength")(maxLength),
		...filterAttribute(isInteger)("minLength")(minLength),
		...filterAttribute(isString)("name")(name),
		...filterAttribute(isString)("pattern")(pattern),
		...filterAttribute(isString)("placeholder")(placeholder),
		...filterAttribute(isBoolean)("readOnly")(readOnly),
		...filterAttribute(isBoolean)("required")(required),
		...filterAttribute(isInteger)("size")(size),
		...filterAttribute(isString)("value")(value),
	}
}

export default filterTextAttributes
