import isDefined from "../../../../../../../utilities/isDefined/index.ts"
import getId from "../../../../../../constructors/helpers/getId/index.ts"
import filterAttribute from "../../../../../../guards/filterAttribute/index.ts"
import isBoolean from "../../../../../../guards/isBoolean/index.ts"
import isString from "../../../../../../guards/isString/index.ts"
import pickGlobalAttributes from "../../../../../../guards/pickGlobalAttributes/index.ts"

/**
 * Filters attributes for OptGroup element
 * Allows global attributes and validates disabled and label attributes
 */
export const filterAttributes = (attributes: Record<string, unknown>) => {
	const { disabled, label, ...attrs } = attributes
	const globals = pickGlobalAttributes(attrs)

	return {
		...globals,
		...filterAttribute(isBoolean)("disabled")(disabled),
		...filterAttribute(isString)("label")(label),
	}
}

/**
 * Creates an OptGroup element configuration object
 *
 * The optgroup element represents a group of option elements
 * with a common label.
 *
 * @param attributes - Element attributes
 * @param children - Child elements (typically Option elements)
 * @returns Element configuration object
 *
 * @example
 * ```typescript
 * const optgroup = OptGroup({
 *   label: "Colors",
 *   disabled: false
 * })([
 *   Option({ value: "red" })("Red"),
 *   Option({ value: "blue" })("Blue")
 * ])
 * ```
 */
const OptGroup =
	(attributes: Record<string, unknown> = {}) => (children: unknown[] = []) => {
		const { dataset, display, id, ...attrs } = attributes
		const { ...attribs } = filterAttributes(attrs)

		return {
			attributes: {
				...getId(id),
				...attribs,
			},
			children,
			...(isDefined(dataset) ? { dataset } : {}),
			...(isDefined(display) ? { display } : {}),
			tag: "optgroup",
		}
	}

export default OptGroup
