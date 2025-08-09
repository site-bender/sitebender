import Filtered from "../../../../../../constructors/abstracted/Filtered/index.ts"
import { SCOPES } from "../../../../../../constructors/elements/constants/index.ts"
import getId from "../../../../../../constructors/helpers/getId/index.ts"
import filterAttribute from "../../../../../../guards/filterAttribute/index.ts"
import isBoolean from "../../../../../../guards/isBoolean/index.ts"
import isInteger from "../../../../../../guards/isInteger/index.ts"
import isMemberOf from "../../../../../../guards/isMemberOf/index.ts"
import isString from "../../../../../../guards/isString/index.ts"
import pickGlobalAttributes from "../../../../../../guards/pickGlobalAttributes/index.ts"

/**
 * Filters attributes for Th element
 * Allows global attributes and validates th-specific attributes
 */
export const filterAttributes = (attributes: Record<string, unknown>) => {
	const {
		id,
		abbr,
		colSpan,
		headers,
		rowSpan,
		scope,
		sorted,
		...otherAttributes
	} = attributes
	const globals = pickGlobalAttributes(otherAttributes)

	return {
		...getId(id),
		...globals,
		...filterAttribute(isString)("abbr")(abbr),
		...filterAttribute(isInteger)("colSpan")(colSpan),
		...filterAttribute(isString)("headers")(headers),
		...filterAttribute(isInteger)("rowSpan")(rowSpan),
		...filterAttribute(isMemberOf(SCOPES))("scope")(scope),
		...filterAttribute(isBoolean)("sorted")(sorted),
	}
}

/**
 * Creates a Th element configuration object
 *
 * The th element represents a header cell in a table.
 * It can contain flow content.
 *
 * @example
 * ```typescript
 * const th = Th({
 *   id: "header-1",
 *   scope: "col",
 *   abbr: "Product Name",
 *   sorted: true
 * })([
 *   TextNode("Product")
 * ])
 * ```
 */
export const Th = Filtered("Th")(filterAttributes)

export default Th
