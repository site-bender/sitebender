import FilteredEmpty from "../../../../../constructors/abstracted/FilteredEmpty/index.ts"
import {
	CROSS_ORIGINS,
	DECODING_HINTS,
	FETCH_PRIORITIES,
	LOADINGS,
	REFERRER_POLICIES,
} from "../../../../../constructors/elements/constants/index.ts"
import getId from "../../../../../constructors/helpers/getId/index.ts"
import filterAttribute from "../../../../../guards/filterAttribute/index.ts"
import isBoolean from "../../../../../guards/isBoolean/index.ts"
import isInteger from "../../../../../guards/isInteger/index.ts"
import isMemberOf from "../../../../../guards/isMemberOf/index.ts"
import isString from "../../../../../guards/isString/index.ts"
import pickGlobalAttributes from "../../../../../guards/pickGlobalAttributes/index.ts"

/**
 * Filters attributes for Img element
 * Allows global attributes and validates img-specific attributes
 */
export const filterAttributes = (attributes: Record<string, unknown>) => {
	const {
		id,
		alt,
		crossorigin,
		decoding,
		fetchpriority,
		height,
		ismap,
		loading,
		longdesc,
		referrerpolicy,
		sizes,
		src,
		srcset,
		usemap,
		width,
		...otherAttributes
	} = attributes
	const globals = pickGlobalAttributes(otherAttributes)

	return {
		...getId(id),
		...globals,
		...filterAttribute(isString)("alt")(alt),
		...filterAttribute(isMemberOf(CROSS_ORIGINS))("crossorigin")(crossorigin),
		...filterAttribute(isMemberOf(DECODING_HINTS))("decoding")(decoding),
		...filterAttribute(isMemberOf(FETCH_PRIORITIES))("fetchpriority")(
			fetchpriority,
		),
		...filterAttribute(isInteger)("height")(height),
		...filterAttribute(isBoolean)("ismap")(ismap),
		...filterAttribute(isMemberOf(LOADINGS))("loading")(loading),
		...filterAttribute(isString)("longdesc")(longdesc),
		...filterAttribute(isMemberOf(REFERRER_POLICIES))("referrerpolicy")(
			referrerpolicy,
		),
		...filterAttribute(isString)("sizes")(sizes),
		...filterAttribute(isString)("src")(src),
		...filterAttribute(isString)("srcset")(srcset),
		...filterAttribute(isString)("usemap")(usemap),
		...filterAttribute(isInteger)("width")(width),
	}
}

/**
 * Creates an Img element configuration object
 *
 * The img element embeds an image into the document.
 *
 * @example
 * ```typescript
 * const img = Img({
 *   src: "image.jpg",
 *   alt: "Description of image",
 *   width: 300,
 *   height: 200,
 *   loading: "lazy"
 * })
 * ```
 */
export const Img = FilteredEmpty("Img")(filterAttributes)

export default Img
