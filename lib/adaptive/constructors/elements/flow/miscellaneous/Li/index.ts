import Filtered from "../../../../../constructors/abstracted/Filtered/index.ts"
import getId from "../../../../../constructors/helpers/getId/index.ts"
import filterAttribute from "../../../../../guards/filterAttribute/index.ts"
import isFlowContent from "../../../../../guards/isFlowContent/index.ts"
import isInteger from "../../../../../guards/isInteger/index.ts"
import pickGlobalAttributes from "../../../../../guards/pickGlobalAttributes/index.ts"

/**
 * Filters attributes for Li element
 * Allows global attributes and validates the value attribute
 */
export const filterAttributes = (attributes: Record<string, unknown>) => {
	const { id, value, ...otherAttributes } = attributes
	const globals = pickGlobalAttributes(otherAttributes)

	return {
		...getId(id),
		...globals,
		...filterAttribute(isInteger)("value")(value),
	}
}

/**
 * Creates a Li element configuration object
 *
 * The li element represents a list item in ordered or unordered lists.
 * It can contain flow content.
 *
 * @example
 * ```typescript
 * const li = Li({ id: "item-1", value: 3 })([
 *   P()("List item content"),
 *   Ul()([...])
 * ])
 * ```
 */
export const Li = Filtered("Li")(filterAttributes)(isFlowContent())

export default Li
