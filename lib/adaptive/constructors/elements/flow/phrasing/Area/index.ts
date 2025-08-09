import FilteredEmpty from "../../../../../constructors/abstracted/FilteredEmpty/index.ts"
import {
	REFERRER_POLICIES,
	RELS_FOR_AREA,
	SHAPES,
	TARGETS,
} from "../../../../../constructors/elements/constants/index.ts"
import getId from "../../../../../constructors/helpers/getId/index.ts"
import filterAttribute from "../../../../../guards/filterAttribute/index.ts"
import isMemberOf from "../../../../../guards/isMemberOf/index.ts"
import isString from "../../../../../guards/isString/index.ts"
import pickGlobalAttributes from "../../../../../guards/pickGlobalAttributes/index.ts"

/**
 * Filters attributes for Area element
 * Allows global attributes and validates area-specific attributes
 */
export const filterAttributes = (attributes: Record<string, unknown>) => {
	const {
		id,
		alt,
		coords,
		download,
		href,
		hreflang,
		media,
		ping,
		referrerpolicy,
		rel,
		shape,
		target,
		...otherAttributes
	} = attributes
	const globals = pickGlobalAttributes(otherAttributes)

	return {
		...getId(id),
		...globals,
		...filterAttribute(isString)("alt")(alt),
		...filterAttribute(isString)("coords")(coords),
		...filterAttribute(isString)("download")(download),
		...filterAttribute(isString)("href")(href),
		...filterAttribute(isString)("hreflang")(hreflang),
		...filterAttribute(isString)("media")(media),
		...filterAttribute(isString)("ping")(ping),
		...filterAttribute(isMemberOf(REFERRER_POLICIES))("referrerpolicy")(
			referrerpolicy,
		),
		...filterAttribute(isMemberOf(RELS_FOR_AREA))("rel")(rel),
		...filterAttribute(isMemberOf(SHAPES))("shape")(shape),
		...filterAttribute(isMemberOf(TARGETS))("target")(target),
	}
}

/**
 * Creates an Area element configuration object
 *
 * The area element represents an area inside an image map,
 * or a dead area on an image map.
 *
 * @example
 * ```typescript
 * const area = Area({
 *   shape: "rect",
 *   coords: "0,0,100,100",
 *   href: "/section1",
 *   alt: "Section 1"
 * })
 * ```
 */
export const Area = FilteredEmpty("Area")(filterAttributes)

export default Area
