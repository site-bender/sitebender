import FilteredEmpty from "../../../../constructors/FilteredEmpty"
import filterAttribute from "../../../../guards/filterAttribute"
import isBoolean from "../../../../guards/isBoolean"
import isInteger from "../../../../guards/isInteger"
import isMemberOf from "../../../../guards/isMemberOf"
import isString from "../../../../guards/isString"
import pickGlobalAttributes from "../../../../guards/pickGlobalAttributes"
import {
	ALLOWS,
	LOADINGS,
	REFERRER_POLICIES,
	SANDBOXES,
} from "../../../../rendering/constants"

export const filterAttributes = attributes => {
	const {
		allow,
		allowFullScreen,
		height,
		loading,
		name,
		referrerPolicy,
		sandbox,
		src,
		srcDoc,
		width,
		...attrs
	} = attributes || {}
	const globals = pickGlobalAttributes(attrs)

	return {
		...globals,
		...filterAttribute(isMemberOf(ALLOWS))("allow")(allow),
		...filterAttribute(isBoolean)("allowFullScreen")(allowFullScreen),
		...filterAttribute(isInteger)("height")(height),
		...filterAttribute(isMemberOf(LOADINGS))("loading")(loading),
		...filterAttribute(isString)("name")(name),
		...filterAttribute(isMemberOf(REFERRER_POLICIES))("referrerPolicy")(
			referrerPolicy,
		),
		...filterAttribute(isMemberOf(SANDBOXES))("sandbox")(sandbox),
		...filterAttribute(isString)("src")(src),
		...filterAttribute(isString)("srcDoc")(srcDoc),
		...filterAttribute(isInteger)("width")(width),
	}
}

const IFrame = FilteredEmpty("IFrame")(filterAttributes)

export default IFrame
