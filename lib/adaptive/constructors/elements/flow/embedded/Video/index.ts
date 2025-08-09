import Filtered from "../../../../../constructors/abstracted/Filtered/index.ts"
import {
	CROSS_ORIGINS,
	PRELOADS,
} from "../../../../../constructors/elements/constants/index.ts"
import getId from "../../../../../constructors/helpers/getId/index.ts"
import filterAttribute from "../../../../../guards/filterAttribute/index.ts"
import isBoolean from "../../../../../guards/isBoolean/index.ts"
import isInteger from "../../../../../guards/isInteger/index.ts"
import isMemberOf from "../../../../../guards/isMemberOf/index.ts"
import isString from "../../../../../guards/isString/index.ts"
import pickGlobalAttributes from "../../../../../guards/pickGlobalAttributes/index.ts"

/**
 * Filters attributes for Video element
 * Allows global attributes and validates video-specific attributes
 */
export const filterAttributes = (attributes: Record<string, unknown>) => {
	const {
		id,
		autoplay,
		controls,
		crossorigin,
		height,
		loop,
		muted,
		playsinline,
		poster,
		preload,
		src,
		width,
		...otherAttributes
	} = attributes
	const globals = pickGlobalAttributes(otherAttributes)

	return {
		...getId(id),
		...globals,
		...filterAttribute(isBoolean)("autoplay")(autoplay),
		...filterAttribute(isBoolean)("controls")(controls),
		...filterAttribute(isMemberOf(CROSS_ORIGINS))("crossorigin")(crossorigin),
		...filterAttribute(isInteger)("height")(height),
		...filterAttribute(isBoolean)("loop")(loop),
		...filterAttribute(isBoolean)("muted")(muted),
		...filterAttribute(isBoolean)("playsinline")(playsinline),
		...filterAttribute(isString)("poster")(poster),
		...filterAttribute(isMemberOf(PRELOADS))("preload")(preload),
		...filterAttribute(isString)("src")(src),
		...filterAttribute(isInteger)("width")(width),
	}
}

/**
 * Creates a Video element configuration object
 *
 * The video element is used to embed video content in a document.
 *
 * @example
 * ```typescript
 * const video = Video({
 *   src: "movie.mp4",
 *   controls: true,
 *   width: 640,
 *   height: 480,
 *   poster: "poster.jpg"
 * })([
 *   TextNode("Your browser does not support the video tag.")
 * ])
 * ```
 */
export const Video = (attributes: any = {}) => (children: any = []) => {
	const filteredChildren = Array.isArray(children) ? children : [children]

	return Filtered("Video")(filterAttributes)(attributes)(filteredChildren)
}

export default Video
