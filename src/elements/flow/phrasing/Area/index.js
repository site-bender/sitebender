import FilteredEmpty from "../../../../constructors/FilteredEmpty"
import filterAttribute from "../../../../guards/filterAttribute"
import isMemberOf from "../../../../guards/isMemberOf"
import isString from "../../../../guards/isString"
import pickGlobalAttributes from "../../../../guards/pickGlobalAttributes"
import {
	REFERRER_POLICIES,
	RELS_FOR_AREA,
	SHAPES,
} from "../../../../rendering/constants"

export const filterAttributes = attributes => {
	const {
		alt,
		coords,
		download,
		href,
		hrefLang,
		media,
		ping,
		referrerPolicy,
		rel,
		shape,
		target,
		type,
		...attrs
	} = attributes || {}
	const globals = pickGlobalAttributes(attrs)

	return {
		...globals,
		...filterAttribute(isString)("alt")(alt),
		...filterAttribute(isString)("coords")(coords),
		...filterAttribute(isString)("download")(download),
		...filterAttribute(isString)("href")(href),
		...filterAttribute(isString)("hrefLang")(hrefLang),
		...filterAttribute(isString)("media")(media),
		...filterAttribute(isString)("ping")(ping),
		...filterAttribute(isMemberOf(REFERRER_POLICIES))("referrerPolicy")(
			referrerPolicy,
		),
		...filterAttribute(isMemberOf(RELS_FOR_AREA))("rel")(rel),
		...filterAttribute(isMemberOf(SHAPES))("shape")(shape),
		...filterAttribute(isString)("target")(target),
		...filterAttribute(isString)("type")(type),
	}
}

const Area = FilteredEmpty("Area")(filterAttributes)

export default Area
