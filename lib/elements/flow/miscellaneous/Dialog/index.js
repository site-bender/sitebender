import Filtered from "../../../../constructors/Filtered"
import filterAttribute from "../../../../guards/filterAttribute"
import isBoolean from "../../../../guards/isBoolean"
import pickGlobalAttributes from "../../../../guards/pickGlobalAttributes"

export const filterAttributes = attributes => {
	const { open, ...attrs } = attributes
	const globals = pickGlobalAttributes(attrs)

	return {
		...globals,
		...filterAttribute(isBoolean)("open")(open),
	}
}

const Dialog = Filtered("Dialog")(filterAttributes)

export default Dialog
