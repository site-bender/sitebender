import Filtered from "../../../../constructors/Filtered"
import filterAttribute from "../../../../guards/filterAttribute"
import isInteger from "../../../../guards/isInteger"
import pickGlobalAttributes from "../../../../guards/pickGlobalAttributes"

export const filterAttributes = attributes => {
	const { data, form, height, name, type, width, ...attrs } = attributes || {}
	const globals = pickGlobalAttributes(attrs)

	return {
		...globals,
		...filterAttribute(isString)("data")(data),
		...filterAttribute(isString)("form")(form),
		...filterAttribute(isInteger)("height")(height),
		...filterAttribute(isString)("name")(name),
		...filterAttribute(isString)("type")(type),
		...filterAttribute(isInteger)("width")(width),
	}
}

const Object = Filtered("Object")(filterAttributes)

export default Object
