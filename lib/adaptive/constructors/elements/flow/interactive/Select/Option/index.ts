import isDefined from "../../../../../../../utilities/isDefined/index.ts"
import TextNode from "../../../../../../constructors/elements/TextNode/index.ts"
import getId from "../../../../../../constructors/helpers/getId/index.ts"
import filterAttribute from "../../../../../../guards/filterAttribute/index.ts"
import isBoolean from "../../../../../../guards/isBoolean/index.ts"
import isString from "../../../../../../guards/isString/index.ts"
import pickGlobalAttributes from "../../../../../../guards/pickGlobalAttributes/index.ts"

/**
 * Filters attributes for Option element
 * Allows global attributes and validates disabled, label, selected, and value attributes
 */
export const filterAttributes = (attributes: Record<string, unknown>) => {
	const { disabled, label, selected, value, ...attrs } = attributes
	const globals = pickGlobalAttributes(attrs)

	return {
		...globals,
		...filterAttribute(isBoolean)("disabled")(disabled),
		...filterAttribute(isString)("label")(label),
		...filterAttribute(isBoolean)("selected")(selected),
		...filterAttribute(isString)("value")(value),
	}
}

/**
 * Creates an Option element configuration object
 *
 * The option element represents an option in a select element
 * or as part of a list of suggestions in a datalist element.
 *
 * @param attributes - Element attributes
 * @param label - Text content for the option
 * @returns Element configuration object
 *
 * @example
 * ```typescript
 * const option = Option({
 *   value: "red",
 *   selected: true
 * })("Red")
 * ```
 */
const Option =
	(attributes: Record<string, unknown> = {}) => (label?: string) => {
		const { dataset, display, id, ...attrs } = attributes
		const { ...attribs } = filterAttributes(attrs)

		// Convert string label to TextNode children
		const kids = isString(label) ? [TextNode(label)] : undefined

		return {
			attributes: {
				...getId(id),
				...attribs,
			},
			children: kids,
			...(isDefined(dataset) ? { dataset } : {}),
			...(isDefined(display) ? { display } : {}),
			tag: "option",
		}
	}

export default Option
