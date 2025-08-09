import FilteredEmpty from "../../../../constructors/abstracted/FilteredEmpty/index.ts"
import { TARGETS } from "../../../../constructors/elements/constants/index.ts"
import getId from "../../../../constructors/helpers/getId/index.ts"
import filterAttribute from "../../../../guards/filterAttribute/index.ts"
import isMemberOf from "../../../../guards/isMemberOf/index.ts"
import isString from "../../../../guards/isString/index.ts"
import pickGlobalAttributes from "../../../../guards/pickGlobalAttributes/index.ts"

/**
 * Filters attributes for Base element
 * Allows global attributes and validates href and target attributes
 */
export const filterAttributes = (attributes: Record<string, unknown>) => {
	const { id, href, target, ...otherAttributes } = attributes
	const globals = pickGlobalAttributes(otherAttributes)

	return {
		...getId(id),
		...globals,
		...filterAttribute(isString)("href")(href),
		...filterAttribute(isMemberOf(TARGETS))("target")(target),
	}
}

/**
 * Creates a Base element configuration object
 *
 * The base element allows authors to specify the document base URL
 * for the purposes of resolving relative URLs.
 * It is a void element.
 *
 * @example
 * ```typescript
 * const base = Base({
 *   href: "/api/",
 *   target: "_blank"
 * })
 * ```
 */
export const Base = FilteredEmpty("Base")(filterAttributes)

export default Base
