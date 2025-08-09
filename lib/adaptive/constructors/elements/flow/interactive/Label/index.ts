import isDefined from "../../../../../../utilities/isDefined/index.ts"
import FilteredAllowText from "../../../../../constructors/abstracted/FilteredAllowText/index.ts"
import TextNode from "../../../../../constructors/elements/TextNode/index.ts"
import getAriaAttributes from "../../../../../constructors/helpers/getAriaAttributes/index.ts"
import getId from "../../../../../constructors/helpers/getId/index.ts"
import { ADVANCED_FILTERS } from "../../../../../guards/createAdvancedFilters/index.ts"
import filterAttribute from "../../../../../guards/filterAttribute/index.ts"
import isString from "../../../../../guards/isString/index.ts"
import pickGlobalAttributes from "../../../../../guards/pickGlobalAttributes/index.ts"

/**
 * Filters attributes for Label element
 * Allows global attributes and validates label-specific attributes
 */
export const filterAttributes = (attributes: Record<string, unknown>) => {
	const { id, for: forAttr, form, ...otherAttributes } = attributes
	const globals = pickGlobalAttributes(otherAttributes)

	return {
		...getId(id),
		...globals,
		...filterAttribute(isString)("for")(forAttr),
		...filterAttribute(isString)("form")(form),
	}
}

/**
 * Creates a Label element configuration object
 *
 * The label element represents a caption for a form control.
 * It can contain phrasing content and text, but not interactive elements or nested labels.
 *
 * @example
 * ```typescript
 * const label = Label({
 *   id: "name-label",
 *   for: "name-input"
 * })([
 *   TextNode("Full Name:")
 * ])
 * ```
 */
export const Label =
	(attributes: any = {}) => (children: unknown = []): any => {
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

		// Convert string children to TextNode and filter children
		const kids = isString(children)
			? [TextNode(children)]
			: Array.isArray(children)
			? children.filter(ADVANCED_FILTERS.labelContent)
			: ADVANCED_FILTERS.labelContent(children)
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
			tag: "Label",
		}
	}

export default Label
