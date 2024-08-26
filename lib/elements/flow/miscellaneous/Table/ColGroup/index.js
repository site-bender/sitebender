import Filtered from "../../../../../constructors/Filtered"
import filterAttribute from "../../../../../guards/filterAttribute"
import isInteger from "../../../../../guards/isInteger"
import pickGlobalAttributes from "../../../../../guards/pickGlobalAttributes"

export const filterAttributes = attributes => {
	const { span, ...attrs } = attributes
	const globals = pickGlobalAttributes(attrs)

	return {
		...globals,
		...filterAttribute(isInteger)("span")(span),
	}
}

const ColGroup = Filtered("ColGroup")(filterAttributes)

export default ColGroup
