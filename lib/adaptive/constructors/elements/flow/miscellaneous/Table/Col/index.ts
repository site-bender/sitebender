import FilteredEmpty from "../../../../../../constructors/abstracted/FilteredEmpty/index.ts"
import getId from "../../../../../../constructors/helpers/getId/index.ts"
import filterAttribute from "../../../../../../guards/filterAttribute/index.ts"
import isInteger from "../../../../../../guards/isInteger/index.ts"
import pickGlobalAttributes from "../../../../../../guards/pickGlobalAttributes/index.ts"

/**
 * Filters attributes for Col element
 * Allows global attributes and validates span attribute
 */
export const filterAttributes = (attributes: Record<string, unknown>) => {
	const { id, span, ...otherAttributes } = attributes
	const globals = pickGlobalAttributes(otherAttributes)

	return {
		...getId(id),
		...globals,
		...filterAttribute(isInteger)("span")(span),
	}
}

/**
 * Creates a Col element configuration object
 *
 * The col element represents a column in a table.
 * It's a void element that doesn't contain content.
 *
 * @example
 * ```typescript
 * const col = Col({
 *   id: "column-1",
 *   span: 2
 * })
 * ```
 */
export const Col = FilteredEmpty("Col")(filterAttributes)

export default Col
