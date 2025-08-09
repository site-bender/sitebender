import FilteredEmpty from "../../../../../constructors/abstracted/FilteredEmpty/index.ts"
import { HTTP_EQUIVS } from "../../../../../constructors/elements/constants/index.ts"
import getId from "../../../../../constructors/helpers/getId/index.ts"
import filterAttribute from "../../../../../guards/filterAttribute/index.ts"
import isMemberOf from "../../../../../guards/isMemberOf/index.ts"
import isString from "../../../../../guards/isString/index.ts"
import pickGlobalAttributes from "../../../../../guards/pickGlobalAttributes/index.ts"

/**
 * Filters attributes for Meta element
 * Allows global attributes and validates meta-specific attributes
 */
export const filterAttributes = (attributes: Record<string, unknown>) => {
	const {
		id,
		charset,
		content,
		httpEquiv,
		media,
		name,
		...otherAttributes
	} = attributes
	const globals = pickGlobalAttributes(otherAttributes)

	return {
		...getId(id),
		...globals,
		...filterAttribute(isString)("charset")(charset),
		...filterAttribute(isString)("content")(content),
		...filterAttribute(isMemberOf(HTTP_EQUIVS))("httpEquiv")(httpEquiv),
		...filterAttribute(isString)("media")(media),
		...filterAttribute(isString)("name")(name),
	}
}

/**
 * Creates a Meta element configuration object
 *
 * The meta element represents various kinds of metadata that cannot be expressed
 * using other HTML elements. It is a void element.
 *
 * @example
 * ```typescript
 * const meta = Meta({
 *   charset: "utf-8"
 * })
 * ```
 */
export const Meta = FilteredEmpty("Meta")(filterAttributes)

export default Meta
