import filterAttribute from "../../../../../guards/filterAttribute"
import isBoolean from "../../../../../guards/isBoolean"
import isString from "../../../../../guards/isString"
import pickGlobalAttributes from "../../../../../guards/pickGlobalAttributes"
import Input from ".."

export const filterAttributes = attributes => {
	const { accept, form, list, multiple, name, required, value, ...attrs } =
		attributes
	const globals = pickGlobalAttributes(attrs)

	return {
		...globals,
		...filterAttribute(isString)("accept")(accept),
		...filterAttribute(isString)("form")(form),
		...filterAttribute(isString)("list")(list),
		...filterAttribute(isBoolean)("multiple")(multiple),
		...filterAttribute(isString)("name")(name),
		...filterAttribute(isBoolean)("required")(required),
		...filterAttribute(isString)("value")(value),
	}
}

const InputFile = Input("File")(filterAttributes)

export default InputFile
