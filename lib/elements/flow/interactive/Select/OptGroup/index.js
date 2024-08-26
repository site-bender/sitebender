import Filtered from "../../../../../constructors/Filtered"
import filterAttribute from "../../../../../guards/filterAttribute"
import isBoolean from "../../../../../guards/isBoolean"
import isString from "../../../../../guards/isString"
import pickGlobalAttributes from "../../../../../guards/pickGlobalAttributes"

export const filterAttributes = attributes => {
	const { disabled, label, ...attrs } = attributes
	const globals = pickGlobalAttributes(attrs)

	return {
		...globals,
		...filterAttribute(isBoolean)("disabled")(disabled),
		...filterAttribute(isString)("label")(label),
	}
}

const OptGroup = Filtered("OptGroup")(filterAttributes)

export default OptGroup
