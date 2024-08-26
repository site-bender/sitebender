import Filtered from "../../constructors/Filtered"
import filterAttribute from "../../guards/filterAttribute"
import isString from "../../guards/isString"
import pickGlobalAttributes from "../../guards/pickGlobalAttributes"

export const filterAttributes = attributes => {
	const { manifest, xmlns, ...attrs } = attributes
	const globals = pickGlobalAttributes(attrs)

	return {
		...globals,
		...filterAttribute(isString)("manifest")(manifest),
		...filterAttribute(isString)("xmlns")(xmlns),
	}
}

const Html = Filtered("Html")(filterAttributes)

export default Html
