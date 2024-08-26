import Filtered from "../../../../constructors/Filtered"
import filterAttribute from "../../../../guards/filterAttribute"
import pickGlobalAttributes from "../../../../guards/pickGlobalAttributes"
import isNumber from "../../../../utilities/isNumber"

export const filterAttributes = attributes => {
	const { max, value, ...attrs } = attributes
	const globals = pickGlobalAttributes(attrs)

	return {
		...globals,
		...filterAttribute(isNumber)("max")(max),
		...filterAttribute(isNumber)("value")(value),
	}
}

const Progress = Filtered("Progress")(filterAttributes)

export default Progress
