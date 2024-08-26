import Filtered from "../../../../constructors/Filtered"
import filterAttribute from "../../../../guards/filterAttribute"
import isMemberOf from "../../../../guards/isMemberOf"
import isString from "../../../../guards/isString"
import pickGlobalAttributes from "../../../../guards/pickGlobalAttributes"
import {
	FORM_TARGETS,
	REFERRER_POLICIES,
	RELS_FOR_AREA,
} from "../../../../rendering/constants"

export const filterAttributes = attributes => {
	const {
		download,
		href,
		hreflang,
		ping,
		referrerPolicy,
		rel,
		target,
		type,
		...attrs
	} = attributes
	const globals = pickGlobalAttributes(attrs)

	return {
		...globals,
		...filterAttribute(isString)("download")(download),
		...filterAttribute(isString)("href")(href),
		...filterAttribute(isString)("hreflang")(hreflang),
		...filterAttribute(isString)("ping")(ping),
		...filterAttribute(isMemberOf(REFERRER_POLICIES))("referrerPolicy")(
			referrerPolicy,
		),
		...filterAttribute(isMemberOf(RELS_FOR_AREA))("rel")(rel),
		...filterAttribute(isMemberOf(FORM_TARGETS))("target")(target),
		...filterAttribute(isString)("type")(type),
	}
}

const A = Filtered("A")(filterAttributes)

export default A
