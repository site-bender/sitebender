import FilteredEmpty from "../../../../constructors/FilteredEmpty"
import filterAttribute from "../../../../guards/filterAttribute"
import isBoolean from "../../../../guards/isBoolean"
import isMemberOf from "../../../../guards/isMemberOf"
import isString from "../../../../guards/isString"
import pickGlobalAttributes from "../../../../guards/pickGlobalAttributes"
import {
	BLOCKINGS,
	CROSS_ORIGINS,
	DESTINATIONS,
	FETCH_PRIORITIES,
	REFERRER_POLICIES,
	RELS_FOR_LINK,
} from "../../../../rendering/constants"

export const filterAttributes = attributes => {
	const {
		as,
		blocking,
		color,
		crossOrigin,
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
		...attrs
	} = attributes || {}
	const globals = pickGlobalAttributes(attrs)

	return {
		...globals,
		...filterAttribute(isMemberOf(DESTINATIONS))("as")(as),
		...filterAttribute(isMemberOf(BLOCKINGS))("blocking")(blocking),
		...filterAttribute(isString)("color")(color),
		...filterAttribute(isMemberOf(CROSS_ORIGINS))("crossOrigin")(crossOrigin),
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

const Link = FilteredEmpty("Link")(filterAttributes)

export default Link
