import Filtered from "../../../../constructors/Filtered"
import filterAttribute from "../../../../guards/filterAttribute"
import isBoolean from "../../../../guards/isBoolean"
import isInteger from "../../../../guards/isInteger"
import isMemberOf from "../../../../guards/isMemberOf"
import isString from "../../../../guards/isString"
import pickGlobalAttributes from "../../../../guards/pickGlobalAttributes"
import { CROSS_ORIGINS, PRELOADS } from "../../../../rendering/constants"

export const filterAttributes = attributes => {
	const {
		autoplay,
		controls,
		crossOrigin,
		height,
		loop,
		muted,
		playsInline,
		poster,
		preload,
		src,
		width,
		...attrs
	} = attributes || {}
	const globals = pickGlobalAttributes(attrs)

	return {
		...globals,
		...filterAttribute(isBoolean)("autoplay")(autoplay),
		...filterAttribute(isBoolean)("controls")(controls),
		...filterAttribute(isMemberOf(CROSS_ORIGINS))("crossOrigin")(crossOrigin),
		...filterAttribute(isInteger)("height")(height),
		...filterAttribute(isBoolean)("loop")(loop),
		...filterAttribute(isBoolean)("muted")(muted),
		...filterAttribute(isBoolean)("playsInline")(playsInline),
		...filterAttribute(isString)("poster")(poster),
		...filterAttribute(isMemberOf(PRELOADS))("preload")(preload),
		...filterAttribute(isString)("src")(src),
		...filterAttribute(isInteger)("width")(width),
	}
}
const Video = Filtered("Video")(filterAttributes)

export default Video
