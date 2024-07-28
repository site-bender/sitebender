import Filtered from "../../../../constructors/Filtered"
import filterAttribute from "../../../../guards/filterAttribute"
import isString from "../../../../guards/isString"
import pickGlobalAttributes from "../../../../guards/pickGlobalAttributes"

export const filterAttributes = attributes => {
	const { cite, datetime, ...attrs } = attributes || {}
	const globals = pickGlobalAttributes(attrs)

	return {
		...globals,
		...filterAttribute(isString)("cite")(cite),
		...filterAttribute(isString)("datetime")(datetime),
	}
}

const Del = Filtered("Del")(filterAttributes)

export default Del
