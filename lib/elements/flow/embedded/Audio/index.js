import Filtered from "../../../../constructors/Filtered"
import filterAttribute from "../../../../guards/filterAttribute"
import isBoolean from "../../../../guards/isBoolean"
import isMemberOf from "../../../../guards/isMemberOf"
import isString from "../../../../guards/isString"
import pickGlobalAttributes from "../../../../guards/pickGlobalAttributes"
import { CROSS_ORIGINS, PRELOADS } from "../../../../rendering/constants"

export const filterAttributes = attributes => {
	const {
		autoplay,
		controls,
		crossOrigin,
		loop,
		muted,
		preload,
		src,
		...attrs
	} = attributes
	const globals = pickGlobalAttributes(attrs)

	return {
		...globals,
		...filterAttribute(isBoolean)("autoplay")(autoplay),
		...filterAttribute(isBoolean)("controls")(controls),
		...filterAttribute(isMemberOf(CROSS_ORIGINS))("crossOrigin")(crossOrigin),
		...filterAttribute(isBoolean)("loop")(loop),
		...filterAttribute(isBoolean)("muted")(muted),
		...filterAttribute(isMemberOf(PRELOADS))("preload")(preload),
		...filterAttribute(isString)("src")(src),
	}
}

const Audio = Filtered("Audio")(filterAttributes)

export default Audio
