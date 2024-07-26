import filterAttribute from "../../../../../guards/filterAttribute"
import isMemberOf from "../../../../../guards/isMemberOf"
import isString from "../../../../../guards/isString"
import pickGlobalAttributes from "../../../../../guards/pickGlobalAttributes"
import { AUTOCOMPLETES } from "../../../../../rendering/constants"
import Input from ".."

export const filterAttributes = attributes => {
	const { autocomplete, dirname, form, name, value, ...attrs } =
		attributes || {}
	const globals = pickGlobalAttributes(attrs)

	return {
		...globals,
		...filterAttribute(isMemberOf(AUTOCOMPLETES))("autocomplete")(autocomplete),
		...filterAttribute(isString)("dirname")(dirname),
		...filterAttribute(isString)("form")(form),
		...filterAttribute(isString)("name")(name),
		...filterAttribute(isString)("value")(value),
	}
}

const InputHidden = Input("Hidden")(filterAttributes)

export default InputHidden
