import Filtered from "../../../../constructors/Filtered"
import filterAttribute from "../../../../guards/filterAttribute"
import isBoolean from "../../../../guards/isBoolean"
import isInteger from "../../../../guards/isInteger"
import isMemberOf from "../../../../guards/isMemberOf"
import pickGlobalAttributes from "../../../../guards/pickGlobalAttributes"
import { ORDERED_LISTS } from "../../../../rendering/constants"

export const filterAttributes = attributes => {
	const { reversed, start, type, ...attrs } = attributes || {}
	const globals = pickGlobalAttributes(attrs)

	return {
		...globals,
		...filterAttribute(isBoolean)("reversed")(reversed),
		...filterAttribute(isInteger)("start")(start),
		...filterAttribute(isMemberOf(ORDERED_LISTS))("type")(type),
	}
}

const Ol = Filtered("Ol")(filterAttributes)

export default Ol
