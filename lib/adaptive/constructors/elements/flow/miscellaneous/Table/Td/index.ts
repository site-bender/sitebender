import Filtered from "../../../../../../constructors/abstracted/Filtered/index.ts"
import getId from "../../../../../../constructors/helpers/getId/index.ts"
import filterAttribute from "../../../../../../guards/filterAttribute/index.ts"
import isInteger from "../../../../../../guards/isInteger/index.ts"
import isString from "../../../../../../guards/isString/index.ts"
import pickGlobalAttributes from "../../../../../../guards/pickGlobalAttributes/index.ts"

/**
 * Filters attributes for Td element
 * Allows global attributes and validates colSpan, headers, and rowSpan
 */
export const filterAttributes = (attributes: Record<string, unknown>) => {
	const { id, colSpan, headers, rowSpan, ...otherAttributes } = attributes
	const globals = pickGlobalAttributes(otherAttributes)

	return {
		...getId(id),
		...globals,
		...filterAttribute(isInteger)("colSpan")(colSpan),
		...filterAttribute(isString)("headers")(headers),
		...filterAttribute(isInteger)("rowSpan")(rowSpan),
	}
}

/**
 * Creates a Td element configuration object
 *
 * The td element represents a data cell in a table.
 * It can contain flow content.
 *
 * @example
 * ```typescript
 * const td = Td({
 *   id: "cell-1",
 *   colSpan: 2,
 *   headers: "header1 header2"
 * })([
 *   TextNode("Cell content")
 * ])
 * ```
 */
export const Td = Filtered("Td")(filterAttributes)

export default Td
