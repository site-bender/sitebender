import Filtered from "../../../../../constructors/abstracted/Filtered/index.ts"
import {
	CROSS_ORIGINS,
	PRELOADS,
} from "../../../../../constructors/elements/constants/index.ts"
import getId from "../../../../../constructors/helpers/getId/index.ts"
import filterAttribute from "../../../../../guards/filterAttribute/index.ts"
import isBoolean from "../../../../../guards/isBoolean/index.ts"
import isMemberOf from "../../../../../guards/isMemberOf/index.ts"
import isString from "../../../../../guards/isString/index.ts"
import pickGlobalAttributes from "../../../../../guards/pickGlobalAttributes/index.ts"

/**
 * Filters attributes for Audio element
 * Allows global attributes and validates audio-specific attributes
 */
export const filterAttributes = (attributes: Record<string, unknown>) => {
	const {
		id,
		autoplay,
		controls,
		crossorigin,
		loop,
		muted,
		preload,
		src,
		...otherAttributes
	} = attributes
	const globals = pickGlobalAttributes(otherAttributes)

	return {
		...getId(id),
		...globals,
		...filterAttribute(isBoolean)("autoplay")(autoplay),
		...filterAttribute(isBoolean)("controls")(controls),
		...filterAttribute(isMemberOf(CROSS_ORIGINS))("crossorigin")(crossorigin),
		...filterAttribute(isBoolean)("loop")(loop),
		...filterAttribute(isBoolean)("muted")(muted),
		...filterAttribute(isMemberOf(PRELOADS))("preload")(preload),
		...filterAttribute(isString)("src")(src),
	}
}

/**
 * Creates an Audio element configuration object
 *
 * The audio element represents a sound or audio stream.
 *
 * @example
 * ```typescript
 * const audio = Audio({
 *   src: "audio.mp3",
 *   controls: true,
 *   preload: "metadata"
 * })([
 *   TextNode("Your browser does not support the audio element.")
 * ])
 * ```
 */
export const Audio = (attributes: any = {}) => (children: any = []) => {
	const filteredChildren = Array.isArray(children) ? children : [children]

	return Filtered("Audio")(filterAttributes)(attributes)(filteredChildren)
}

export default Audio
