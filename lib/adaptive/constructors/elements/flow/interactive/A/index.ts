import isDefined from "../../../../../../utilities/isDefined/index.ts"
import Filtered from "../../../../../constructors/abstracted/Filtered/index.ts"
import {
	FORM_TARGETS,
	REFERRER_POLICIES,
	RELS_FOR_AREA,
} from "../../../../../constructors/elements/constants/index.ts"
import getAriaAttributes from "../../../../../constructors/helpers/getAriaAttributes/index.ts"
import getId from "../../../../../constructors/helpers/getId/index.ts"
import { ADVANCED_FILTERS } from "../../../../../guards/createAdvancedFilters/index.ts"
import filterAttribute from "../../../../../guards/filterAttribute/index.ts"
import isMemberOf from "../../../../../guards/isMemberOf/index.ts"
import isString from "../../../../../guards/isString/index.ts"
import pickGlobalAttributes from "../../../../../guards/pickGlobalAttributes/index.ts"

/**
 * Filters attributes for A element
 * Allows global attributes and validates anchor-specific attributes
 */
export const filterAttributes = (attributes: Record<string, unknown>) => {
	const {
		id,
		download,
		href,
		hrefLang,
		ping,
		referrerPolicy,
		rel,
		target,
		type,
		...otherAttributes
	} = attributes
	const globals = pickGlobalAttributes(otherAttributes)

	return {
		...getId(id),
		...globals,
		...filterAttribute(isString)("download")(download),
		...filterAttribute(isString)("href")(href),
		...filterAttribute(isString)("hrefLang")(hrefLang),
		...filterAttribute(isString)("ping")(ping),
		...filterAttribute(isMemberOf(REFERRER_POLICIES))("referrerPolicy")(
			referrerPolicy,
		),
		...filterAttribute(isMemberOf(RELS_FOR_AREA))("rel")(rel),
		...filterAttribute(isMemberOf(FORM_TARGETS))("target")(target),
		...filterAttribute(isString)("type")(type),
	}
}

/**
 * Creates an A element configuration object
 *
 * The a element represents a hyperlink or anchor.
 * It can contain flow content but not interactive content.
 *
 * @example
 * ```typescript
 * const link = A({
 *   id: "home-link",
 *   href: "/home",
 *   target: "_blank"
 * })([
 *   TextNode("Go to Home")
 * ])
 * ```
 */
export const A = (attributes: any = {}) => (children: unknown[] = []): any => {
	const {
		aria,
		calculation,
		dataset,
		display,
		format,
		scripts,
		stylesheets,
		validation,
		...attrs
	} = attributes
	const { id, ...attribs } = filterAttributes(attrs)

	// Filter children to exclude interactive elements
	const kids = Array.isArray(children)
		? children.filter(ADVANCED_FILTERS.anchorContent)
		: ADVANCED_FILTERS.anchorContent(children)
		? [children]
		: []

	return {
		attributes: {
			...getId(id),
			...getAriaAttributes(aria),
			...attribs,
		},
		children: kids,
		...(isDefined(calculation) ? { calculation } : {}),
		...(isDefined(dataset) ? { dataset } : {}),
		...(isDefined(display) ? { display } : {}),
		...(isDefined(format) ? { format } : {}),
		...(isDefined(scripts) ? { scripts } : {}),
		...(isDefined(stylesheets) ? { stylesheets } : {}),
		...(isDefined(validation) ? { validation } : {}),
		tag: "A",
	}
}

export default A
