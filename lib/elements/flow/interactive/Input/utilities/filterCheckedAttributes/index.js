import filterAttribute from "../../../../../../guards/filterAttribute"
import isBoolean from "../../../../../../guards/isBoolean"
import isString from "../../../../../../guards/isString"
import pickGlobalAttributes from "../../../../../../guards/pickGlobalAttributes"

const filterCheckedAttributes = attributes => {
	const { checked, form, name, required, value, ...attrs } = attributes || {}
	const globals = pickGlobalAttributes(attrs)

	return {
		...globals,
		...filterAttribute(isBoolean)("checked")(checked),
		...filterAttribute(isString)("form")(form),
		...filterAttribute(isString)("name")(name),
		...filterAttribute(isBoolean)("required")(required),
		...filterAttribute(isString)("value")(value),
	}
}

export default filterCheckedAttributes
