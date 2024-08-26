import Filtered from "../../../constructors/Filtered"
import filterAttribute from "../../../guards/filterAttribute"
import isBoolean from "../../../guards/isBoolean"
import isMemberOf from "../../../guards/isMemberOf"
import isString from "../../../guards/isString"
import pickGlobalAttributes from "../../../guards/pickGlobalAttributes"
import { BLOCKINGS } from "../../../rendering/constants"

export const filterAttributes = attributes => {
	const { blocking, media, scoped, title, ...attrs } = attributes
	const globals = pickGlobalAttributes(attrs)

	return {
		...globals,
		...filterAttribute(isMemberOf(BLOCKINGS))("blocking")(blocking),
		...filterAttribute(isString)("media")(media),
		...filterAttribute(isBoolean)("scoped")(scoped),
		...filterAttribute(isString)("title")(title),
	}
}

const Style = Filtered("Style")(filterAttributes)

export default Style
