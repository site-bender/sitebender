import Filtered from "../../../../constructors/Filtered"
import filterAttribute from "../../../../guards/filterAttribute"
import isString from "../../../../guards/isString"
import pickGlobalAttributes from "../../../../guards/pickGlobalAttributes"

export const filterAttributes = attributes => {
	const { cite, ...attrs } = attributes
	const globals = pickGlobalAttributes(attrs)

	return {
		...globals,
		...filterAttribute(isString)("cite")(cite),
	}
}

const Q = Filtered("Q")(filterAttributes)

export default Q
