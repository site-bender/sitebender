import FilteredEmpty from "../../../../constructors/FilteredEmpty"
import filterAttribute from "../../../../guards/filterAttribute"
import isBoolean from "../../../../guards/isBoolean"
import isInteger from "../../../../guards/isInteger"
import isMemberOf from "../../../../guards/isMemberOf"
import isString from "../../../../guards/isString"
import pickGlobalAttributes from "../../../../guards/pickGlobalAttributes"
import {
	CROSS_ORIGINS,
	DECODING_HINTS,
	FETCH_PRIORITIES,
	LOADINGS,
	REFERRER_POLICIES,
} from "../../../../rendering/constants"

export const filterAttributes = attributes => {
	const {
		alt,
		crossOrigin,
		decoding,
		fetchPriority,
		height,
		isMap,
		loading,
		longDesc,
		referrerPolicy,
		sizes,
		src,
		srcset,
		useMap,
		width,
		...attrs
	} = attributes
	const globals = pickGlobalAttributes(attrs)

	return {
		...globals,
		...filterAttribute(isString)("alt")(alt),
		...filterAttribute(isMemberOf(CROSS_ORIGINS))("crossOrigin")(crossOrigin),
		...filterAttribute(isMemberOf(DECODING_HINTS))("decoding")(decoding),
		...filterAttribute(isMemberOf(FETCH_PRIORITIES))("fetchPriority")(
			fetchPriority,
		),
		...filterAttribute(isInteger)("height")(height),
		...filterAttribute(isBoolean)("isMap")(isMap),
		...filterAttribute(isMemberOf(LOADINGS))("loading")(loading),
		...filterAttribute(isString)("longDesc")(longDesc),
		...filterAttribute(isMemberOf(REFERRER_POLICIES))("referrerPolicy")(
			referrerPolicy,
		),
		...filterAttribute(isString)("sizes")(sizes),
		...filterAttribute(isString)("src")(src),
		...filterAttribute(isString)("srcset")(srcset),
		...filterAttribute(isString)("useMap")(useMap),
		...filterAttribute(isInteger)("width")(width),
	}
}

const Img = FilteredEmpty("Img")(filterAttributes)

export default Img
