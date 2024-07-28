import Filtered from "../../../../constructors/Filtered"
import filterAttribute from "../../../../guards/filterAttribute"
import isString from "../../../../guards/isString"
import pickGlobalAttributes from "../../../../guards/pickGlobalAttributes"

export const filterAttributes = attributes => {
	const { for: forAttr, form, name, ...attrs } = attributes || {}
	const globals = pickGlobalAttributes(attrs)

	return {
		...globals,
		...filterAttribute(isString)("for")(forAttr),
		...filterAttribute(isString)("form")(form),
		...filterAttribute(isString)("name")(name),
	}
}

const Output = Filtered("Output")(filterAttributes)

export default Output
