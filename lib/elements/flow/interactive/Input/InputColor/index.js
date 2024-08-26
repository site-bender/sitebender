import filterAttribute from "../../../../../guards/filterAttribute"
import isMemberOf from "../../../../../guards/isMemberOf"
import isString from "../../../../../guards/isString"
import pickGlobalAttributes from "../../../../../guards/pickGlobalAttributes"
import { AUTOCOMPLETES } from "../../../../../rendering/constants"
import Input from ".."

export const filterAttributes = attributes => {
	const { autocomplete, form, list, name, value, ...attrs } = attributes
	const globals = pickGlobalAttributes(attrs)

	return {
		...globals,
		...filterAttribute(isMemberOf(AUTOCOMPLETES))("autocomplete")(autocomplete),
		...filterAttribute(isString)("form")(form),
		...filterAttribute(isString)("list")(list),
		...filterAttribute(isString)("name")(name),
		...filterAttribute(isString)("value")(value),
	}
}

const InputColor = Input("Color")(filterAttributes)

export default InputColor
