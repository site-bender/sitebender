import FilteredEmpty from "../../../../../constructors/abstracted/FilteredEmpty/index.ts"
import {
	BLOCKINGS,
	CROSS_ORIGINS,
	DESTINATIONS,
	FETCH_PRIORITIES,
	REFERRER_POLICIES,
	RELS_FOR_LINK,
} from "../../../../../constructors/elements/constants/index.ts"
import getId from "../../../../../constructors/helpers/getId/index.ts"
import filterAttribute from "../../../../../guards/filterAttribute/index.ts"
import isBoolean from "../../../../../guards/isBoolean/index.ts"
import isMemberOf from "../../../../../guards/isMemberOf/index.ts"
import isString from "../../../../../guards/isString/index.ts"
import pickGlobalAttributes from "../../../../../guards/pickGlobalAttributes/index.ts"

/**
 * Filters attributes for Link element
 * Allows global attributes and validates link-specific attributes
 */
export const filterAttributes = (attributes: Record<string, unknown>) => {
	const {
		id,
		as,
		blocking,
		color,
		crossorigin,
		disabled,
		fetchPriority,
		href,
		hreflang,
		imageSizes,
		imageSrcset,
		integrity,
		media,
		referrerPolicy,
		rel,
		sizes,
		type,
		...otherAttributes
	} = attributes
	const globals = pickGlobalAttributes(otherAttributes)

	return {
		...getId(id),
		...globals,
		...filterAttribute(isMemberOf(DESTINATIONS))("as")(as),
		...filterAttribute(isMemberOf(BLOCKINGS))("blocking")(blocking),
		...filterAttribute(isString)("color")(color),
		...filterAttribute(isMemberOf(CROSS_ORIGINS))("crossorigin")(crossorigin),
		...filterAttribute(isBoolean)("disabled")(disabled),
		...filterAttribute(isMemberOf(FETCH_PRIORITIES))("fetchPriority")(
			fetchPriority,
		),
		...filterAttribute(isString)("href")(href),
		...filterAttribute(isString)("hreflang")(hreflang),
		...filterAttribute(isString)("imageSizes")(imageSizes),
		...filterAttribute(isString)("imageSrcset")(imageSrcset),
		...filterAttribute(isString)("integrity")(integrity),
		...filterAttribute(isString)("media")(media),
		...filterAttribute(isMemberOf(REFERRER_POLICIES))("referrerPolicy")(
			referrerPolicy,
		),
		...filterAttribute(isMemberOf(RELS_FOR_LINK))("rel")(rel),
		...filterAttribute(isString)("sizes")(sizes),
		...filterAttribute(isString)("type")(type),
	}
}

/**
 * Creates a Link element configuration object
 *
 * The link element allows authors to link their document to other resources.
 * It is a void element.
 *
 * @example
 * ```typescript
 * const link = Link({
 *   rel: "stylesheet",
 *   href: "styles.css"
 * })
 * ```
 */
export const Link = FilteredEmpty("Link")(filterAttributes)

export default Link
